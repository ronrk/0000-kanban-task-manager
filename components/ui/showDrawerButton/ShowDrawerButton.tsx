import { toggleDrawer, useAppDispatch } from '@/store';
import { BiShowAlt } from 'react-icons/bi';
import Wrapper from './ShowDrawerButton.styled';

export interface IShowDrawerButton {}

const ShowDrawerButton: React.FC<IShowDrawerButton> = () => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper
      className="bg-primary text-dark fs-600"
      onClick={() => dispatch(toggleDrawer())}
    >
      <BiShowAlt className="icon  text-dark" />
    </Wrapper>
  );
};

export default ShowDrawerButton;
