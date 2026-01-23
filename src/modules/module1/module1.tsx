import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@components';
import { getModule2Step } from '@modules/module2';
import { useAppDispatch } from '@useAppDispatch';

import { loadItems } from './store';

export const Module1: React.FC = () => {
  const dispatch = useAppDispatch();
  const step = useSelector(getModule2Step);

  useEffect(() => {
    dispatch(loadItems(step));
  }, [step]);

  return (
    <div>
      Module 1
      <Button />
    </div>
  );
};
