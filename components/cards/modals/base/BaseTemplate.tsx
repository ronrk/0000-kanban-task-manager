import Wrapper from './BaseTemplate.styled';

export interface IBaseTemplate {
  sampleTextProps?: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sampleTextProps }) => {
  return <Wrapper>{sampleTextProps}</Wrapper>;
};

export default BaseTemplate;
