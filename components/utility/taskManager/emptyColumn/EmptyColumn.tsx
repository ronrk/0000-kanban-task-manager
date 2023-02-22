import { selectBoardValue, useAddColumnByIdMutation } from '@/store';
import { ColType } from '@/types';
import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Wrapper from './EmptyColumn.styled';

export interface IEmptyColumn {}

const columnsList: ColType[] = [ColType.TODO, ColType.DOING, ColType.DONE];

const EmptyColumn: React.FC<IEmptyColumn> = () => {
  const [onEdit, setOnEdit] = useState(false);
  const { currentBoard } = useSelector(selectBoardValue);
  const [addColumn] = useAddColumnByIdMutation();

  const onAddColumn = async (colType: ColType) => {
    const newCol = { status: colType, tasks: [] };

    addColumn({ boardId: currentBoard?._id, newCol })
      .unwrap()
      .then(() => setOnEdit(false))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper className="column empty flex-col text-light fs-600">
      <button
        disabled={onEdit}
        className="new-col-btn flex text-light fs-600 bg-linear"
        onClick={() => setOnEdit(true)}
      >
        <HiOutlinePlus />
        New Column
      </button>
      {onEdit && (
        <div className="empty-column-actions flex-col">
          <h3 className="fs-600 text-primary-light">Add Column:</h3>
          {columnsList.map((col) => (
            <button className="todo" key={col} onClick={() => onAddColumn(col)}>
              <span className="col-title text-dark fs-500 fw-m">{col}</span>
            </button>
          ))}

          <button
            className="cancel-btn text-red fs-400 fw-l"
            onClick={() => setOnEdit(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default EmptyColumn;
