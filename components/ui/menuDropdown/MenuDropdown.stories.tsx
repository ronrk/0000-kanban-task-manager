import { ComponentMeta, ComponentStory } from '@storybook/react';
import MenuDropdown, { IMenuDropdown } from './MenuDropdown';
import { mockMenuDropdownProps } from './MenuDropdown.mocks';

export default {
  title: 'ui/MenuDropdown',
  component: MenuDropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MenuDropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MenuDropdown> = (args) => (
  <MenuDropdown {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockMenuDropdownProps.base,
} as IMenuDropdown;
