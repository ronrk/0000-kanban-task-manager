/* eslint-disable no-unused-vars */
import { ColType } from '@/types';
import { ITodoDropdown } from './TodoDropdown';

const base: ITodoDropdown = {
  onChange: (type: ColType) => {},
  value: ColType.TODO,
};

export const mockTodoDropdownProps = {
  base,
};
