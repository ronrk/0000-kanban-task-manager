import { ComponentMeta, ComponentStory } from '@storybook/react';
import CreateNewTask, { ICreateNewTask } from './CreateNewTask';
import { mockCreateNewTaskProps } from './CreateNewTask.mocks';

export default {
  title: 'templates/CreateNewTask',
  component: CreateNewTask,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CreateNewTask>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CreateNewTask> = (args) => (
  <CreateNewTask {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCreateNewTaskProps.base,
} as ICreateNewTask;
