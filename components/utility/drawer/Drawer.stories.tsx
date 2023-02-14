import { ComponentMeta, ComponentStory } from '@storybook/react';
import Drawer, { IDrawer } from './Drawer';
import { mockDrawerProps } from './Drawer.mocks';

export default {
  title: 'utility/Drawer',
  component: Drawer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Drawer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockDrawerProps.base,
} as IDrawer;
