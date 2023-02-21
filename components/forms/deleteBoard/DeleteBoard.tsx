import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import {
  closeModal,
  selectBoardValue,
  useAppDispatch,
  useDeleteBoardByIdMutation,
} from '@/store';
import { ITask } from '@/types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../FormWrapper.styled';

interface IProps {
  type: 'task' | 'board';
  task?: ITask;
}

const DeleteBoard: FC<IProps> = ({ type, task }) => {
  const { currentBoard } = useSelector(selectBoardValue);
  const dispatch = useAppDispatch();
  const [deleteBoard, { isLoading }] = useDeleteBoardByIdMutation();
  if (isLoading) {
    return (
      <Wrapper className="delete-box bg-box">
        <LoadingSpinner />
      </Wrapper>
    );
  }
  return (
    <Wrapper className="delete-box bg-box">
      <h2 className="text-red fs-600 fw-b">Delete this {type}?</h2>
      <p className="text-light fs-500">
        {type === 'board'
          ? `Are you sure you want to delete the '${currentBoard?.name}' board? This
        action will remove all columns and tasks and cannot be reversed.`
          : `Are you sure you want to delete the '${task?.title}' task and its subtasks? This action cannot be reversed.`}
      </p>
      <div className="actions flex">
        <PrimaryButton
          color="red"
          className="fs-400"
          onClick={() =>
            type === 'board' &&
            deleteBoard(currentBoard?._id!).then(() => dispatch(closeModal()))
          }
        >
          Delete
        </PrimaryButton>
        <PrimaryButton
          color="white"
          className="fs-400"
          onClick={() => dispatch(closeModal())}
        >
          Cancel
        </PrimaryButton>
      </div>
    </Wrapper>
  );
};

export default DeleteBoard;
