import styled from 'styled-components';

const StyledSignIn = styled.section`
  height: 80%;
  align-items: center;
  & h2 {
    margin-block: 0.5rem 0.5em;
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
    & button {
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
