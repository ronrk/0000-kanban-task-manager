import { ComponentMeta, ComponentStory } from '@storybook/react';
import BoardDrawerList, { IBoardDrawerList } from './BoardDrawerList';
import { mockBoardDrawerListProps } from './BoardDrawerList.mocks';

export default {
  title: 'templates/BoardDrawerList',
  component: BoardDrawerList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BoardDrawerList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BoardDrawerList> = (args) => (
  <BoardDrawerList {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockBoardDrawerListProps.base,
} as IBoardDrawerList;
