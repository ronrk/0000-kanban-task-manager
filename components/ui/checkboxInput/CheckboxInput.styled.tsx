import styled from 'styled-components';

const StyledCheckboxInput = styled.div`
  & .check-btn {
    width: 1.5em;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    & .icon {
      opacity: 0;
      transform: scale(1.5);
      transition: all 0.2s;
    }
  }
  & input {
    appearance: none;
    display: none;
  }

  & label {
    width: 100%;
    transition: all 0.2s;

    cursor: pointer;
  }

  &.checked {
    & .check-btn {
      background-color: hsl(var(--clr-primary));

      & .icon {
        opacity: 1;
      }
    }
    & label {
      text-decoration: line-through;
      opacity: 0.5;
    }
  }
`;

export default StyledCheckboxInput;
