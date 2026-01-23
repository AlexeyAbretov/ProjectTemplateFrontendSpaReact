/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';

export type AppDispatch = any;
export const useAppDispatch = () => useDispatch<AppDispatch>();
