import { eventBus } from '../eventBus';

describe('eventBus', () => {
  it('delivers detail to subscriber', () => {
    const handler = jest.fn();
    const unsubscribe = eventBus.on('TestEvent', handler);

    eventBus.emit('TestEvent', { n: 1 });

    expect(handler).toHaveBeenCalledWith({ n: 1 });
    unsubscribe();
  });

  it('unsubscribe stops delivery', () => {
    const handler = jest.fn();
    const unsubscribe = eventBus.on('Other', handler);
    unsubscribe();

    eventBus.emit('Other', 2);
    expect(handler).not.toHaveBeenCalled();
  });
});
