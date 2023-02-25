// import { useGetAllTasksByColumnIdQuery } from '@/store';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import { useGetTasksByColIdQuery } from '@/store';
import { IColumn, ITask } from '@/types';
import SingleTaskBox from '../singleTaskBox/SingleTaskBox';
import Wrapper from './BoardColumn.styled';

export interface IBoardColumn {
  column: IColumn;
}

const BoardColumn: React.FC<IBoardColumn> = ({ column }) => {
  const { data, isLoading } = useGetTasksByColIdQuery(column._id.toString());

  if (isLoading) {
    return (
      <Wrapper className="column">
        <div className="loading">
          <LoadingSpinner color="primary" />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper className={`column ${column.status.toLowerCase()} flex-col`}>
      <h3 className="col-title text-light fs-400 uppercase">
        {column.status}
        <span className="fs-300">{data.tasks.length}</span>
      </h3>
      <div className="tasks flex-col">
        {data.tasks.length > 0 &&
          data.tasks.map((task: ITask) => (
            <SingleTaskBox key={task._id.toString()} task={task} col={column} />
          ))}
      </div>
    </Wrapper>
  );
};

export default BoardColumn;
