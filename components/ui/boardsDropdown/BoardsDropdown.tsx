import CreateNewBoard from '@/components/forms/createNewBoard/CreateNewBoard';
import useDropdownHook from '@/hooks/useDropdownHook';
import { openModal, useAppDispatch } from '@/store';
import { ColType, IBoard, TCol } from '@/types';
import mongoose from 'mongoose';

import { GoChevronDown } from 'react-icons/go';
import IconButton from '../iconButton/IconButton.styled';
import Wrapper from './BoardsDropdown.styled';

export interface IBoardsDropdown {
  // eslint-disable-next-line no-unused-vars
  onChange(type: any): void;
  value: string;
  options?: string[];
  boardId?: mongoose.Types.ObjectId;
  boards?: IBoard[];
  board?: IBoard;
  disabled?: boolean;
}
const defaultOptions: TCol = [ColType.TODO, ColType.DOING, ColType.DONE];

const BoardsDropdown: React.FC<IBoardsDropdown> = ({
  onChange,
  value,
  boards,
  board,
  disabled,
}) => {
  const { handleOptionClick, handleClick, isOpen, divElRef } =
    useDropdownHook(onChange);

  let renderedOptions;
  const dispatch = useAppDispatch();

  if (boards && board) {
    renderedOptions = boards.map((brd): React.ReactNode => {
      return (
        <div
          className={
            board._id === brd._id
              ? 'dropdown-option fs-500 text-dark active'
              : 'dropdown-option fs-500 text-dark'
          }
          onClick={() => handleOptionClick(brd)}
          key={brd._id.toString()}
        >
          {brd.name}
        </div>
      );
    });
  } else {
    renderedOptions = defaultOptions.map((option: ColType): React.ReactNode => {
      return (
        <div
          className={
            value === option
              ? 'dropdown-option fs-500 text-dark active'
              : 'dropdown-option fs-500 text-dark'
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
    <Wrapper ref={divElRef} className="columns-type fs-600 dropdown">
      <div
        className="dropdown-bar flex bg-box text-light"
        onClick={handleClick}
      >
        {!value ? '' : value}

        <GoChevronDown className="icon text-primary-light" />
      </div>
      {isOpen && (
        <div className="dropdown-options bg-box">
          {renderedOptions}
          <IconButton
            color={'primary'}
            icon={'add'}
            textLabel="Creat new Board"
            onClick={() => {
              dispatch(openModal(<CreateNewBoard />));
            }}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default BoardsDropdown;
