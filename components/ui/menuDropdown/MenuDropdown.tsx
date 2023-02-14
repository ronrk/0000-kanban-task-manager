import { useEffect, useRef, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import Wrapper from './MenuDropdown.styled';

export interface IMenuDropdown {
  // eslint-disable-next-line no-unused-vars
  onChange: (type: string) => void;
  value: string | null;
  options: string[];
  type: string;
}

const MenuDropdown: React.FC<IMenuDropdown> = ({
  onChange,
  value,
  options,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);
  const activeBoard = true;

  useEffect(() => {
    function handler(event: any) {
      if (!divEl.current) {
        return;
      }
      if (event.target === null) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    onChange(option);
  };

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
        {option} {type}
      </div>
    );
  });

  return (
    <Wrapper ref={divEl} className="menu fs-300">
      <button
        className="flex bg-box text-light btn--menu"
        onClick={handleClick}
        disabled={activeBoard ? false : true}
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
