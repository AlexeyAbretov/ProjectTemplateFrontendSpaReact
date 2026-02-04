import { useEffect } from 'react';
import { eventBus } from '@shared';

import { Button } from '@components';
import { useAppDispatch } from '@useAppDispatch';

import { loadItems } from './store';

export const Module2: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadItems());
  }, []);

  return (
    <>
      <div>Module 2</div>
      <Button
        title="Go to module2-children2"
        onClick={() => {
          eventBus.emit('OpenModule2Children2');
        }}></Button>
    </>
  );
};
