import styled from 'styled-components';

const ModalWrapper = styled.div`
  overflow-y: scroll;
  top: 20%;
  /* bottom: 50%; */
  position: absolute;
  width: 90vw;
  max-width: 600px;
  /* min-height: 50vh; */
  max-height: 90vh;
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
  }

  & .submit-btn {
    align-self: center;
    padding-inline: 3rem;
  }

  & .columns {
    --gap: 0.3em;
    margin-bottom: 3em;
    flex-grow: 1;
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
