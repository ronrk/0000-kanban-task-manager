import BoardColumn from '@/components/cards/boardColumn/BoardColumn';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import EmptyColumn from '@/components/utility/taskManager/emptyColumn/EmptyColumn';
import { selectBoardValue, useGetBoardByIdQuery } from '@/store';
import { StatusType } from '@/types';
import { useSelector } from 'react-redux';
import Wrapper from './TaskManagerContainer.styled';

export interface ITaskManagerContainer {}

const TaskManagerContainer: React.FC<ITaskManagerContainer> = () => {
  const { currentBoard, status } = useSelector(selectBoardValue);
  const { data, isLoading, isSuccess, error, isError } = useGetBoardByIdQuery(
    currentBoard?._id
  );

  if (isLoading || status === StatusType.PENDING) {
    return (
      <Wrapper className="flex">
        <LoadingSpinner />
      </Wrapper>
    );
  }

  if (isError || !currentBoard || status === StatusType.ERROR) {
    console.log({ error });
    return (
      <Wrapper>
        <h2>ERRROR</h2>
        <div>Empty Board</div>
      </Wrapper>
    );
  }

  console.log({ currentBoard });
  let boardColumnsDisplay = currentBoard.columns.map((col) => {
    return <BoardColumn key={col._id.toString()} column={col} />;
  });

  return (
    <Wrapper className="flex">
      {boardColumnsDisplay}
      <EmptyColumn />
    </Wrapper>
  );
};

export default TaskManagerContainer;
