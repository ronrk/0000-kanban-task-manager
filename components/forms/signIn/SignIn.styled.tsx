import styled from 'styled-components';

const StyledSignIn = styled.section`
  height: 80%;
  align-items: center;
  justify-content: center;
  & h2 {
    text-align: center;
  }
  & form {
    text-align: left;
    max-width: 80%;
    --gap: 2rem;
    & input {
      margin-top: 0.5em;
      &::placeholder {
      }
      &:focus {
        &::placeholder {
          color: hsl(var(--clr-primary-light));
        }
      }
    }
  }
  & .btns__container {
    & .submit--btn {
      width: 80%;
      max-width: 350px;
    }
  }
  & .switchType {
    width: 100%;
    text-align: center;
    & button {
      text-align: center;
      width: 100%;
      &:disabled {
        background-color: black;
      }
      & span {
        transition: all 0.2s;
      }
      &:hover {
        & span {
          color: hsl(var(--clr-primary));
        }
      }
    }
  }
`;

export default StyledSignIn;
