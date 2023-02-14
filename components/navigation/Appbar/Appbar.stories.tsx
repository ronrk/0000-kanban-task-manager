import { ComponentMeta, ComponentStory } from '@storybook/react';
import Appbar, { IAppbar } from './Appbar';
import { mockAppbarProps } from './Appbar.mocks';

export default {
  title: 'navigation/Appbar',
  component: Appbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Appbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Appbar> = (args) => <Appbar {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockAppbarProps.base,
} as IAppbar;
