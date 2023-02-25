import styled from 'styled-components';

const ModalWrapper = styled.div`
  overflow-y: scroll;
  /* top: 10%; */
  /* bottom: 50%; */
  position: absolute;
  width: 90vw;
  max-width: 600px;
  max-height: 80vh;
  margin-inline: auto;
  padding: 2em 2em;
  border-radius: 6px;
  --gap: 0.5em;
  & h3 {
    text-align: center;
  }

  & .loading {
    display: grid;
    place-items: center;
    flex-grow: 1;
    min-height: 35vh;
  }

  & .submit-btn {
    align-self: center;
    padding-inline: 3rem;
  }

  & .columns {
    --gap: 0.3em;
    margin-bottom: 3em;
    flex-grow: 1;
    min-height: 30vh;
    max-height: 30vh;
    overflow-y: scroll;
    & .dropdown {
      flex: 1;
      margin-bottom: 4em;
    }
    & .columns__wrapper {
      --gap: 1rem;
      flex-wrap: wrap;
    }
    & .form-control {
      align-items: center;
      width: 30%;
    }

    & button {
      margin-top: 0.3em;
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s;
      &:hover {
        color: hsla(var(--clr-primary-light));
      }
    }
  }
  & .subtask {
    margin-bottom: 1em;
    max-width: 350px;
    --gap: 2rem;
    & input {
      flex: 1;
      padding: 0.3em;
    }

    & .icon {
      font-size: 2.5rem;
      transition: all 0.2s;
    }

    & button:hover {
      & .icon {
        color: hsl(var(--clr-dark));
      }
    }
  }
  & form {
    --gap: 0em;
    flex-grow: 1;
  }

  & textarea {
    background: transparent;
    font-family: inherit;
    padding: 1em 0.7em;
    border: 1px solid hsla(var(--clr-text-dark), 0.3);
    border-radius: 6px;
    &:hover {
      border: 1px solid hsla(var(--clr-primary-light), 1);
      outline: none;
    }
    &:focus {
      border: 1px solid hsla(var(--clr-primary), 1);
      outline: none;
    }
  }

  & .subtasks {
    max-height: 150px;
    overflow-y: scroll;

    & button {
      margin-top: 0.3em;
    }
    & .subtask {
      margin-bottom: 1em;
      align-items: center;
      --gap: 0.5rem;
      & .icon {
        /* font-size: 1.5rem; */
        transition: all 0.2s;
      }
      &.checked {
        & input[type='text'] {
          text-decoration: line-through;
        }
      }

      & button:hover {
        & .icon {
          color: hsl(var(--clr-dark));
        }
      }
    }
  }
  & .actions {
    --gap: 1rem;
    margin-bottom: 4em;
    align-items: center;
    & .dropdown {
      flex: 0.3;
      align-items: flex-start;
    }
    & .icon-btn {
      align-self: flex-end;
    }
  }

  & .form-control {
    --gap: 0.3em;
    margin-block: 0.5em;
    & input {
      padding: 1em 0.7em;
    }
    & .form-error {
      opacity: 0;
      color: red;

      &.show {
        opacity: 1;
      }
    }
  }
  & .btns-container {
    --gap: 0.5em;
  }
  &.task-detail {
    min-height: 50vh;
    text-transform: capitalize;
    & header {
      justify-content: space-between;
      align-items: center;
      & .icon {
        font-size: 1.5rem;
      }
    }
    & .form-control {
      padding-inline: 1em;
      display: flex;
      align-items: center;
      gap: 1em;
      transition: all 0.6s;
      border-radius: 5px;
      cursor: pointer;
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
    }
    & label {
      display: block;
      padding-block: 1em;
    }
    & .dropdown {
      padding-bottom: 7em;
    }
    & .checkbox-wrapper {
      max-height: 300px;
      overflow-y: scroll;
    }
  }
  & input {
    cursor: pointer;
  }

  &.delete-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    & .actions {
      width: 100%;
      display: flex;
      flex-grow: 1;
      margin-top: 2em;
      justify-content: space-evenly;
      align-items: center;
      & button {
        width: 40%;
      }
    }
  }
`;

export default ModalWrapper;
