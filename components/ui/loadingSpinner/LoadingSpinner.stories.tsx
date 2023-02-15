import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoadingSpinner, { ILoadingSpinner } from './LoadingSpinner';
import { mockLoadingSpinnerProps } from './LoadingSpinner.mocks';

export default {
  title: 'ui/LoadingSpinner',
  component: LoadingSpinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof LoadingSpinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoadingSpinner> = (args) => (
  <LoadingSpinner {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockLoadingSpinnerProps.base,
} as ILoadingSpinner;
