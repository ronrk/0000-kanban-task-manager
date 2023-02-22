import CreateNewBoard from '@/components/forms/createNewBoard/CreateNewBoard';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import { openModal, selectUser, useAppDispatch } from '@/store';
import { useSelector } from 'react-redux';
import Wrapper from './EmptyBoards.styled';

export interface IEmptyBoards {
  sampleTextProps?: string;
}

const EmptyBoards: React.FC<IEmptyBoards> = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <Wrapper className="flex-col">
      <h1 className="text-primary fs-700 uppercase">
        {user?.username} you have no boards
      </h1>
      <PrimaryButton
        className="fs-600"
        color={'primary'}
        onClick={() => dispatch(openModal(<CreateNewBoard />))}
      >
        <>Click to add new Board</>
      </PrimaryButton>
    </Wrapper>
  );
};

export default EmptyBoards;
