import EmptyColumn from '@/components/utility/taskManager/emptyColumn/EmptyColumn';
import Wrapper from './TaskManagerContainer.styled';

export interface ITaskManagerContainer {}

const TaskManagerContainer: React.FC<ITaskManagerContainer> = () => {
  return (
    <Wrapper>
      <EmptyColumn />
    </Wrapper>
  );
};

export default TaskManagerContainer;
