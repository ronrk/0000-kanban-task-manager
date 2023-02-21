import styled from 'styled-components';

interface ILayoutProps {
  withAppBar?: boolean;
}

const StyledPrimaryLayout = styled.div<ILayoutProps>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  &.sign-in__page {
    text-align: center;
    & main {
      display: flex;
      flex-direction: column;
    }
    & section {
      flex-grow: 1;

      & h2 {
        margin-block: 2rem;
      }
    }

    & .image__wrapper {
      margin: 3rem;
      max-width: 250px;
      aspect-ratio: 3.5;
    }
    & form {
      text-align: left;
      max-width: 80%;
      margin-inline: auto;
      flex-grow: 1;

      & input {
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        &::placeholder {
        }
        &:focus {
          &::placeholder {
            color: hsl(var(--clr-primary-light));
          }
        }
      }
      & .form-control {
        padding-block: 0.5rem;
        margin-bottom: 1rem;
        &:last-of-type {
          margin-bottom: 2rem;
        }
      }
    }
    & .btns__container {
      align-self: center;
      text-align: center;
      margin-block: auto 10rem;

      & .submit--btn {
        width: 80%;
        max-width: 350px;
        margin-inline: auto;
      }
    }
    & .switchType {
      padding-inline: 4rem;
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
  }

  & .app {
    /* display: grid; */
    /* padding: 1em; */
    padding-left: var(--drawer-width);
    flex: 1;
    transition: all 0.3s;
    min-height: 90vh;
    max-height: 100%;
    &.full-w {
      /* padding-left: 1em; */
      padding: 0;
    }
  }
  & .col-title {
    display: flex;
    gap: 0.4em;
    align-items: center;
    margin-bottom: 1em;
    &::before {
      content: '';
      position: relative;
      display: block;
      height: 0.7em;
      width: 0.7em;
      border-radius: 50%;
    }
  }
  & .todo {
    & .col-title {
      &::before {
        background-color: #49c4e5;
      }
    }
  }
  & .doing {
    & .col-title {
      &::before {
        background-color: #8471f2;
      }
    }
  }
  & .done {
    & .col-title {
      &::before {
        background-color: #67e2ae;
      }
    }
  }
`;

export default StyledPrimaryLayout;
