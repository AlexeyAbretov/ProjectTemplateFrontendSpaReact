import React, { JSX } from 'react';

import { ClearErrorButton } from './FullNameModule.FullNameClearErrorButton.styled';

interface FullNameClearErrorButtonProps {
  visible: boolean;
  onClear: () => void;
}

export const FullNameClearErrorButton: React.FC<FullNameClearErrorButtonProps> = ({
  visible,
  onClear,
}): JSX.Element | null =>
  visible ? <ClearErrorButton onClick={onClear}>Очистить ошибку</ClearErrorButton> : null;
