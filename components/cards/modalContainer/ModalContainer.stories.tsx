import { ComponentMeta, ComponentStory } from '@storybook/react';
import ModalContainer, { IModalContainer } from './ModalContainer';
import { mockModalContainerProps } from './ModalContainer.mocks';

export default {
  title: 'cards/ModalContainer',
  component: ModalContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ModalContainer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalContainer> = (args) => (
  <ModalContainer {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockModalContainerProps.base,
} as IModalContainer;
