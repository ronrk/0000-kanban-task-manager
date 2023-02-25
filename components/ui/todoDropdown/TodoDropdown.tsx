import useDropdownHook from '@/hooks/useDropdownHook';
import { ColType, IColumn, TCol } from '@/types';
import mongoose from 'mongoose';

import { GoChevronDown } from 'react-icons/go';
import Wrapper from './TodoDropdown.styled';

export interface ITodoDropdown {
  // eslint-disable-next-line no-unused-vars
  onChange(type: any): void;
  value: ColType;
  options?: ColType[];
  colId?: mongoose.Types.ObjectId;
  columns?: IColumn[];
  col?: IColumn;
  disabled?: boolean;
}
const defaultOptions: TCol = [ColType.TODO, ColType.DOING, ColType.DONE];

const TodoDropdown: React.FC<ITodoDropdown> = ({
  onChange,
  value,
  columns,
  col,
  disabled,
}) => {
  const { handleOptionClick, handleClick, isOpen, divElRef } =
    useDropdownHook(onChange);

  let renderedOptions;

  if (columns && col) {
    renderedOptions = columns.map((column): React.ReactNode => {
      return (
        <div
          className={
            col._id === column._id
              ? 'dropdown-option fs-300 text-dark active'
              : 'dropdown-option fs-300 text-dark'
          }
          onClick={() => handleOptionClick(column)}
          key={column._id.toString()}
        >
          {column.status}
        </div>
      );
    });
  } else {
    renderedOptions = defaultOptions.map((option: ColType): React.ReactNode => {
      return (
        <div
          className={
            value === option
              ? 'dropdown-option fs-300 text-dark active'
              : 'dropdown-option fs-300 text-dark'
          }
          onClick={() => {
            disabled ? null : handleOptionClick(option);
          }}
          key={option}
        >
          {option}
        </div>
      );
    });
  }

  return (
    <Wrapper ref={divElRef} className="columns-type fs-300">
      <div
        className="dropdown-bar flex bg-box text-light"
        onClick={handleClick}
      >
        {!value ? '' : value}

        <GoChevronDown className="icon text-primary-light" />
      </div>
      {isOpen && (
        <div className="dropdown-options bg-box">{renderedOptions}</div>
      )}
    </Wrapper>
  );
};

export default TodoDropdown;
