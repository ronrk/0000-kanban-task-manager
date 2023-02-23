import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckboxInput, { ICheckboxInput } from './CheckboxInput';
import { mockCheckboxInputProps } from './CheckboxInput.mocks';

export default {
  title: 'ui/CheckboxInput',
  component: CheckboxInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CheckboxInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CheckboxInput> = (args) => (
  <CheckboxInput {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockCheckboxInputProps.base,
} as ICheckboxInput;
