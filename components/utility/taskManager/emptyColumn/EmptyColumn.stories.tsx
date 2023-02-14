import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmptyColumn, { IEmptyColumn } from './EmptyColumn';
import { mockEmptyColumnProps } from './EmptyColumn.mocks';

export default {
  title: 'utilty/taskManager/EmptyColumn',
  component: EmptyColumn,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EmptyColumn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EmptyColumn> = (args) => (
  <EmptyColumn {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockEmptyColumnProps.base,
} as IEmptyColumn;
