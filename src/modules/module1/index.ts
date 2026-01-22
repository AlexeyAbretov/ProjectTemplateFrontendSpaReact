import { Module1Slice } from "./store";

export { Module1 } from "./module1";

export const reducer = {
  name: 'Module1',
  value: Module1Slice.reducer
}
