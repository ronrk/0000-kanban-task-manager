// import { useGetAllTasksByColumnIdQuery } from '@/store';
import { IColumn, ITask } from '@/types';
import SingleTaskBox from '../singleTaskBox/SingleTaskBox';
import Wrapper from './BoardColumn.styled';

export interface IBoardColumn {
  column: IColumn;
}

const BoardColumn: React.FC<IBoardColumn> = ({ column }) => {
  /*   if (data) {
    return (
      <Wrapper className={`column ${column.name.toLowerCase()}`}>
        <h3 className="col-title text-light fs-400">{column.name}</h3>
       <div className="tasks flex-col">{column.name} column is Empty</div>
      </Wrapper>
    );
  } 
  */

  return (
    <Wrapper className={`column ${column.status.toLowerCase()}`}>
      <h3 className="col-title text-light fs-400 uppercase">
        {column.status}
        <span className="fs-300">{column.tasks.length}</span>
      </h3>
      <div className="tasks flex-col">
        {column.tasks.map((task: ITask) => (
          <SingleTaskBox key={task._id.toString()} task={task} />
        ))}
      </div>
    </Wrapper>
  );
};

export default BoardColumn;
