import { Module2Slice } from './store';

export { Module2 } from './module2';

export const reducer = {
  name: 'Module2',
  value: Module2Slice.reducer,
};

export { getModule2Step, getModule2State } from './selectors';
