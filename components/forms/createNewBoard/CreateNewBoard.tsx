import Wrapper from './CreateNewBoard.styled';

export interface ICreateNewBoard {
  sampleTextProps?: string;
}

const CreateNewBoard: React.FC<ICreateNewBoard> = ({ sampleTextProps }) => {
  return <Wrapper>{sampleTextProps}</Wrapper>;
};

export default CreateNewBoard;
