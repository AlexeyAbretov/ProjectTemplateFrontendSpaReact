import { useEffect } from 'react';

import { useAppDispatch } from '@useAppDispatch';

import { loadItems } from './store';

export const Module2: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  return <div>Module 2</div>;
};
