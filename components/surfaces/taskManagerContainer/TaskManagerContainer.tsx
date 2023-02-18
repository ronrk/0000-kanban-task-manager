import BoardColumn from '@/components/cards/boardColumn/BoardColumn';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import EmptyColumn from '@/components/utility/taskManager/emptyColumn/EmptyColumn';
import { selectBoardValue } from '@/store';
import { StatusType } from '@/types';
import { useSelector } from 'react-redux';
import Wrapper from './TaskManagerContainer.styled';

export interface ITaskManagerContainer {}

const TaskManagerContainer: React.FC<ITaskManagerContainer> = () => {
  const { activeBoard, status } = useSelector(selectBoardValue);
  /* const { data, isLoading, isSuccess, error, isError } = useGetBoardByIdQuery(
    activeBoard?._id
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      console.log('USE EFFECT IS SUCCESS');
      dispatch(changeActiveBoard(data.data));
    }
  });

  if (isLoading || status === StatusType.PENDING) {
    return (
      <Wrapper className="flex">
        <LoadingSpinner />
      </Wrapper>
    );
  }

  if (isError || !activeBoard) {
    console.log({ error });
    return (
      <Wrapper>
        <h2>ERRROR</h2>
        <div>Empty Board</div>
      </Wrapper>
    );
  } */
  if (status === StatusType.PENDING) {
    return <LoadingSpinner />;
  }
  if (status === StatusType.ERROR) {
    return <div>ERROR</div>;
  }

  console.log({ activeBoard });
  let boardColumnsDisplay = activeBoard?.columns.map((col) => {
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
