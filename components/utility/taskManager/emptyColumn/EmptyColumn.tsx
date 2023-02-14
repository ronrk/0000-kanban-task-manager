import { useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import Wrapper from './EmptyColumn.styled';

export interface IEmptyColumn {}

const EmptyColumn: React.FC<IEmptyColumn> = () => {
  const [onEdit, setOnEdit] = useState(false);
  return (
    <Wrapper className="column empty flex text-light fs-600">
      <button
        disabled={onEdit}
        className="new-col-btn flex text-light fs-600 bg-linear"
      >
        <HiOutlinePlus />
        New Column
      </button>
      {onEdit && (
        <div className="empty-column-actions">
          <button className="todo">
            <span className="col-title text-dark fs-500 fw-m">TODO</span>
          </button>
          <button className="doing">
            <span className="col-title text-dark fs-500 fw-m">DOING</span>
          </button>
          <button className="done">
            <span className="col-title text-dark fs-500 fw-m">DONE</span>
          </button>
          <button className="cancel-btn text-red fs-400 fw-l">Cancel</button>
        </div>
      )}
    </Wrapper>
  );
};

export default EmptyColumn;
