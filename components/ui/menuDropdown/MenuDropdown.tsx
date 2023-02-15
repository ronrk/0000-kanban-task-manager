import useDropdownHook from '@/hooks/useDropdownHook';
import { HiDotsVertical } from 'react-icons/hi';
import Wrapper from './MenuDropdown.styled';

export interface IMenuDropdown {
  // eslint-disable-next-line no-unused-vars
  onChange(type: string): void;
  value: string | null;
  options: string[];
}

const MenuDropdown: React.FC<IMenuDropdown> = ({
  onChange,
  value,
  options,
}) => {
  const activeBoard = true;
  const { handleOptionClick, handleClick, isOpen, divElRef } =
    useDropdownHook(onChange);
  const renderedOptions = options.map((option: string, id): React.ReactNode => {
    return (
      <div
        className={
          value === option
            ? `dropdown-option fs-300 active ${
                option === 'delete' ? 'text-red' : 'text-dark'
              }`
            : `dropdown-option fs-300 ${
                option === 'delete' ? 'text-red' : 'text-dark'
              }`
        }
        onClick={() => handleOptionClick(option)}
        key={id}
      >
        {option}
      </div>
    );
  });

  return (
    <Wrapper ref={divElRef} className="menu fs-300">
      <button
        className="flex bg-box text-light btn--menu"
        onClick={handleClick}
        disabled={activeBoard ? false : true}
        type="button"
      >
        <HiDotsVertical className="icon" />
      </button>
      {isOpen && (
        <div className="dropdown-options bg-box">{renderedOptions}</div>
      )}
    </Wrapper>
  );
};

export default MenuDropdown;
