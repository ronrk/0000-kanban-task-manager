import { ComponentMeta, ComponentStory } from '@storybook/react';
import ShowDrawerButton, { IShowDrawerButton } from './ShowDrawerButton';
import { mockShowDrawerButtonProps } from './ShowDrawerButton.mocks';

export default {
  title: 'ui/ShowDrawerButton',
  component: ShowDrawerButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ShowDrawerButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ShowDrawerButton> = (args) => (
  <ShowDrawerButton {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockShowDrawerButtonProps.base,
} as IShowDrawerButton;
