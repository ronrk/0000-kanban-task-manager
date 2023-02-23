import { openModal, useAppDispatch } from '@/store';
import { ITask } from '@/types';
import mongoose from 'mongoose';
import TaskDetail from '../taskDetail/TaskDetail';
import Wrapper from './SingleTaskBox.styled';

export interface ISingleTaskBox {
  task: ITask;
  colId: mongoose.Types.ObjectId;
}

const SingleTaskBox: React.FC<ISingleTaskBox> = ({ task, colId }) => {
  const dispatch = useAppDispatch();
  let { pendingSubtasks, completedSubtasks } = task.subtasks.reduce(
    (acc, sub) => {
      if (sub.isCompleted) {
        acc.completedSubtasks += 1;
      } else {
        acc.pendingSubtasks += 1;
      }
      return acc;
    },
    { pendingSubtasks: 0, completedSubtasks: 0 }
  );
  return (
    <Wrapper
      onClick={() =>
        dispatch(openModal(<TaskDetail task={task} colId={colId} />))
      }
    >
      <h3 className="text-dark fs-500">{task.title}</h3>
      <p className="text-light fs-400 fw-b">
        {pendingSubtasks} of {completedSubtasks + pendingSubtasks} substasks
      </p>
    </Wrapper>
  );
};

export default SingleTaskBox;
