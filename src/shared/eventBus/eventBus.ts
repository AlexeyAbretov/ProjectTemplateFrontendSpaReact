type EventHandler = (detail: unknown) => void;

const EVENT_PREFIX = 'app:';

class EventBus {
  emit(type: string, detail?: unknown): void {
    if (typeof window === 'undefined') {
      return;
    }

    const event = new CustomEvent(`${EVENT_PREFIX}${type}`, { detail });
    window.dispatchEvent(event);
  }

  on(type: string, handler: EventHandler): () => void {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const eventType = `${EVENT_PREFIX}${type}`;
    const wrappedHandler = (event: Event): void => {
      handler((event as CustomEvent).detail);
    };

    window.addEventListener(eventType, wrappedHandler as EventListener);

    return () => {
      window.removeEventListener(eventType, wrappedHandler as EventListener);
    };
  }
}

export const eventBus = new EventBus();
