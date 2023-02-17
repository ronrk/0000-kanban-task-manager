import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import EmptyColumn from '@/components/utility/taskManager/emptyColumn/EmptyColumn';
import {
  selectBoardValue,
  selectTaskValue,
  useGetBoardByIdQuery,
} from '@/store';
import { StatusType } from '@/types';
import { useSelector } from 'react-redux';
import Wrapper from './TaskManagerContainer.styled';

export interface ITaskManagerContainer {}

const TaskManagerContainer: React.FC<ITaskManagerContainer> = () => {
  const { activeBoard } = useSelector(selectBoardValue);
  const { status: isBoardLoading } = useSelector(selectBoardValue);
  const { status: isTaskLoading } = useSelector(selectTaskValue);
  const { data, isLoading, isSuccess, error, isError } = useGetBoardByIdQuery(
    activeBoard?._id
  );
  console.log({ data });
  if (
    isBoardLoading === StatusType.PENDING ||
    isTaskLoading === StatusType.PENDING
  ) {
    return (
      <Wrapper className="flex">
        <LoadingSpinner />
      </Wrapper>
    );
  }

  if (
    isBoardLoading === StatusType.ERROR ||
    isTaskLoading === StatusType.ERROR
  ) {
    return (
      <Wrapper>
        <h2>ERRROR</h2>
      </Wrapper>
    );
  }

  /*   let boardColumnsDisplay = activeBoard?.columns.map((col) => {
    return <BoardColumn key={col._id.toString()} column={col} />;
  }); */

  return (
    <Wrapper className="flex">
      {!activeBoard && <div>Empty Board</div>}
      {/* {activeBoard && boardColumnsDisplay} */}
      <EmptyColumn />
    </Wrapper>
  );
};

export default TaskManagerContainer;
