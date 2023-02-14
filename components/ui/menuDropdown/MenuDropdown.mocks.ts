import { IMenuDropdown } from './MenuDropdown';

const base: IMenuDropdown = {
  onChange: (type: string) => {},
  value: '',
  options: [],
  type: '',
};

export const mockMenuDropdownProps = {
  base,
};
