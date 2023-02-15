import useDropdownHook from '@/hooks/useDropdownHook';
import { ColType, TCol } from '@/types';

import { GoChevronDown } from 'react-icons/go';
import Wrapper from './TodoDropdown.styled';

export interface ITodoDropdown {
  // eslint-disable-next-line no-unused-vars
  onChange(type: ColType): void;
  value: ColType;
}
const options: TCol = [ColType.TODO, ColType.DOING, ColType.DONE];

const TodoDropdown: React.FC<ITodoDropdown> = ({ onChange, value }) => {
  const { handleOptionClick, handleClick, isOpen, divElRef } =
    useDropdownHook(onChange);
  const renderedOptions = options.map((option: ColType): React.ReactNode => {
    return (
      <div
        className={
          value === option
            ? 'dropdown-option fs-300 text-dark active'
            : 'dropdown-option fs-300 text-dark'
        }
        onClick={() => handleOptionClick(option)}
        key={option}
      >
        {option}
      </div>
    );
  });

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
