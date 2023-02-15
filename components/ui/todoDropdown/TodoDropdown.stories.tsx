import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoDropdown, { ITodoDropdown } from './TodoDropdown';
import { mockTodoDropdownProps } from './TodoDropdown.mocks';

export default {
  title: 'ui/TodoDropdown',
  component: TodoDropdown,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TodoDropdown>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoDropdown> = (args) => (
  <TodoDropdown {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTodoDropdownProps.base,
} as ITodoDropdown;
