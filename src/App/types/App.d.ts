declare interface AppRouteHeaderDisplay {
  label: string;
  /** Ascending sort (lower first). Default 0. */
  order?: number;
}

/** Route object for `export const routes` in pages; extends react-router `RouteObject`. */
declare type AppPageRoute = Omit<RouteObject, 'children'> & {
  header?: AppRouteHeaderDisplay;
  children?: AppPageRoute[];
};

/** Resolved header navigation entry (from routes with `header`). */
declare interface AppHeaderNavLink {
  to: string;
  label: string;
  order: number;
}
