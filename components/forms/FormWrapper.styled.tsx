import styled from 'styled-components';

const ModalWrapper = styled.div`
  overflow-y: scroll;
  bottom: 20%;

  position: absolute;
  width: 90vw;
  max-width: 600px;
  min-height: 50vh;
  max-height: 90vh;
  margin-inline: auto;
  padding: 2em 2em;
  border-radius: 6px;
  --gap: 0.5em;

  &.loading {
    display: grid;
  }

  & .submit-btn {
  }

  & .columns {
    --gap: 0.3em;
    margin-bottom: 3em;
    flex-grow: 1;

    & button {
      margin-top: 0.3em;
    }
    & .subtask {
      margin-bottom: 1em;
      & input {
        flex: 1;
        padding: 0.3em;
      }

      & .icon {
        font-size: 1.5rem;
        transition: all 0.2s;
      }

      & button:hover {
        & .icon {
          color: hsl(var(--clr-dark));
        }
      }
    }
  }

  & form {
    --gap: 0em;
    flex-grow: 1;

    & .dropdown {
      flex: 1;
      margin-bottom: 4em;
    }
  }

  & textarea {
    background: transparent;
    font-family: inherit;
    padding: 1em 0.7em;
  }

  & .subtasks {
    --gap: 0.3em;
    & button {
      margin-top: 0.3em;
    }
    & .subtask {
      margin-bottom: 1em;
      & input {
        flex: 1;
        padding: 0.3em;
      }

      & .icon {
        font-size: 1.5rem;
        transition: all 0.2s;
      }

      & button:hover {
        & .icon {
          color: hsl(var(--clr-dark));
        }
      }
    }
  }

  & .form-control {
    --gap: 0.3em;
    margin-block: 0.5em;
    & input {
      border: 1px solid hsl(var(--clr-text-dark));
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
  }
  & input {
    cursor: pointer;
  }

  &.delete-box {
    display: grid;
    gap: 1em;
    top: 30%;
    & .actions {
      margin-top: 2em;
      justify-content: center;
      & button {
        width: 30%;
      }
    }
  }
`;

export default ModalWrapper;
