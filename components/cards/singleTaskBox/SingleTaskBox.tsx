import { openModal, setCurrentColumn, useAppDispatch } from '@/store';
import { IColumn, ITask } from '@/types';
import TaskDetail from '../taskDetail/TaskDetail';
import Wrapper from './SingleTaskBox.styled';

export interface ISingleTaskBox {
  task: ITask;
  col: IColumn;
}

const SingleTaskBox: React.FC<ISingleTaskBox> = ({ task, col }) => {
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
      className="bg-app flex-col"
      onClick={() => {
        dispatch(setCurrentColumn(col));
        dispatch(openModal(<TaskDetail task={task} />));
      }}
    >
      <h3 className="text-dark fs-500">{task.title}</h3>
      <p className="text-light fs-400 fw-b">
        {completedSubtasks} of {completedSubtasks + pendingSubtasks} substasks
      </p>
    </Wrapper>
  );
};

export default SingleTaskBox;
