/* eslint-disable no-unused-vars */
import { ITodoDropdown } from './TodoDropdown';

const base: ITodoDropdown = {
  onChange: (type: string) => {},
  value: '',
  options: [],
};

export const mockTodoDropdownProps = {
  base,
};
