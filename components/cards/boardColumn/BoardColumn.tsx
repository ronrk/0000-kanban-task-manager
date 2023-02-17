// import { useGetAllTasksByColumnIdQuery } from '@/store';
import { IColumn } from '@/types';
import Wrapper from './BoardColumn.styled';

export interface IBoardColumn {
  column: IColumn;
}

const BoardColumn: React.FC<IBoardColumn> = ({ column }) => {
  /*   const { data, isError, error, isSuccess, isLoading } =
    useGetAllTasksByColumnIdQuery(column._id); */

  // console.log({ data, isError, error, isSuccess, isLoading });

  /*   if (isLoading) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  } */

  /*   if (isError) {
    return (
      <Wrapper className={`column ${column.name.toLowerCase()}`}>
        <h3 className="col-title text-light fs-400">
          {column.name}
          <span className="fs-300">Fetching Error</span>
        </h3>
      </Wrapper>
    );
  } */

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
    <Wrapper className={'column ${column.name.toLowerCase()}'}>
      {/* <h3 className="col-title text-light fs-400"> */}
      {/* {column.name} */}
      {/* <span className="fs-300"> */}
      {/* {isSuccess && data.tasks.length > 0 && `(${data.tasks.length})`} */}
      {/* </span> */}
      {/* </h3> */}
      {/* <div className="tasks flex-col"> */}
      {/* {data.task.map((task: ITask) => ( */}
      {/* <SingleTaskBox key={task._id.toString()} task={task} /> */}
      {/* ))} */}
      {/* </div> */}
    </Wrapper>
  );
};

export default BoardColumn;
