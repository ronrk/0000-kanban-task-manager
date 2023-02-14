import styled from "styled-components";
import { MdCancel } from "react-icons/md";
import { FC } from "react";

export const IconBoard = () => {
  return (
    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
        fill="#828FA3"
      />
    </svg>
  );
};

const StyledRemoveButton = styled.button`
  font-size: 1.5em;
  color: hsl(var(--clr-text-light));
  transition: color 0.2s;

  &:hover {
    color: hsl(var(--clr-red));
  }
`;

interface IRemoveProps {
  children?: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

export const IconRemove: FC<IRemoveProps> = ({ children, onClick, type }) => {
  return (
    <StyledRemoveButton onClick={onClick} type={type}>
      {children}
      <MdCancel />
    </StyledRemoveButton>
  );
};

export const IconChecked: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      width="10"
      height="8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="#FFF"
        strokeWidth="2"
        fill="none"
        d="m1.276 3.066 2.756 2.756 5-5"
      />
    </svg>
  );
};
