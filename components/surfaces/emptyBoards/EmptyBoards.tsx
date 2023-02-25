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
      <h3 className="text-primary fs-600 uppercase">
        {user?.username} you have no boards
      </h3>
      <PrimaryButton
        className="fs-500"
        color={'primary-light'}
        onClick={() => dispatch(openModal(<CreateNewBoard />))}
        textLabel="Create New Board"
      />
    </Wrapper>
  );
};

export default EmptyBoards;
