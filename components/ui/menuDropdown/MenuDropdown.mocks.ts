import { IMenuDropdown } from './MenuDropdown';

const base: IMenuDropdown = {
  onChange: (type: string) => {},
  value: '',
  options: [],
};

export const mockMenuDropdownProps = {
  base,
};
