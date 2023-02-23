import { ComponentMeta, ComponentStory } from '@storybook/react';
import TaskDetail, { ITaskDetail } from './TaskDetail';
import { mockTaskDetailProps } from './TaskDetail.mocks';

export default {
  title: 'templates/TaskDetail',
  component: TaskDetail,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TaskDetail>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TaskDetail> = (args) => (
  <TaskDetail {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTaskDetailProps.base,
} as ITaskDetail;
