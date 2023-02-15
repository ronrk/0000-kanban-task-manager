import { ComponentMeta, ComponentStory } from '@storybook/react';
import { mockPrimaryInputProps } from './PrimaryInput.mocks';
import PrimaryInput, { IPrimaryInput } from './PrimaryInput.styled';

export default {
  title: 'ui/PrimaryInput',
  component: PrimaryInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof PrimaryInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PrimaryInput> = (args) => (
  <PrimaryInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockPrimaryInputProps.base,
} as IPrimaryInput;
