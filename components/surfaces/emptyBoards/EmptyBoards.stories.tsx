import { ComponentMeta, ComponentStory } from '@storybook/react';
import EmptyBoards, { IEmptyBoards } from './EmptyBoards';
import { mockEmptyBoardsProps } from './EmptyBoards.mocks';

export default {
  title: 'surfaces/EmptyBoards',
  component: EmptyBoards,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof EmptyBoards>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EmptyBoards> = (args) => (
  <EmptyBoards {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockEmptyBoardsProps.base,
} as IEmptyBoards;
