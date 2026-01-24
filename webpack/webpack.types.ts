export type ENV = {
  NODE_ENV?: 'none' | 'development' | 'production';
} & Record<string, string>;
