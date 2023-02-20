/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

const useDropdownHook = (onChange?: (arg: any) => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(event: any) {
      if (!ref.current) {
        return;
      }
      if (event.target === null) {
        return;
      }
      if (!ref.current.contains(event.target)) {
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

  const handleOptionClick = (option: any) => {
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };
  return { divElRef: ref, handleOptionClick, handleClick, isOpen };
};

export default useDropdownHook;
