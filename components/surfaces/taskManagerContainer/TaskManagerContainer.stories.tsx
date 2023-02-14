import { ComponentMeta, ComponentStory } from '@storybook/react';
import TaskManagerContainer, {
  ITaskManagerContainer,
} from './TaskManagerContainer';
import { mockTaskManagerContainerProps } from './TaskManagerContainer.mocks';

export default {
  title: 'surfaces/TaskManagerContainer',
  component: TaskManagerContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TaskManagerContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskManagerContainer> = (args) => (
  <TaskManagerContainer {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTaskManagerContainerProps.base,
} as ITaskManagerContainer;
