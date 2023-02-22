import BoardColumn from '@/components/cards/boardColumn/BoardColumn';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import EmptyColumn from '@/components/utility/taskManager/emptyColumn/EmptyColumn';
import { selectBoardValue } from '@/store';
import { StatusType } from '@/types';
import { useSelector } from 'react-redux';
import EmptyBoards from '../emptyBoards/EmptyBoards';
import Wrapper from './TaskManagerContainer.styled';

export interface ITaskManagerContainer {}

const TaskManagerContainer: React.FC<ITaskManagerContainer> = () => {
  const { boards, currentBoard, status } = useSelector(selectBoardValue);

  let errorState = status === StatusType.ERROR || !currentBoard;

  /*   if (StatusType.PENDING === status) {
    return (
      
    );
  } */
  if (boards.length <= 0) {
    return (
      <Wrapper className="flex empty">
        <EmptyBoards />
      </Wrapper>
    );
  }

  if (errorState) {
    return (
      <Wrapper>
        <h2>ERRROR</h2>
        <h4>Task Container</h4>
      </Wrapper>
    );
  }

  let boardColumnsDisplay = currentBoard?.columns.map((col) => {
    return <BoardColumn key={col._id.toString()} column={col} />;
  });

  return (
    <Wrapper className={`flex ${StatusType.PENDING ? 'loading' : ''}`}>
      {StatusType.PENDING === status ? <LoadingSpinner /> : boardColumnsDisplay}

      <EmptyColumn />
    </Wrapper>
  );
};

export default TaskManagerContainer;
