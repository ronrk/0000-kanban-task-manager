import { BiShowAlt } from 'react-icons/bi';
import Wrapper from './ShowDrawerButton.styled';

export interface IShowDrawerButton {}

const ShowDrawerButton: React.FC<IShowDrawerButton> = () => {
  return (
    <Wrapper className="bg-primary text-dark fs-600">
      <BiShowAlt className="icon  text-dark" />
    </Wrapper>
  );
};

export default ShowDrawerButton;
