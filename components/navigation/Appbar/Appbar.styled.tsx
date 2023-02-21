import styled from 'styled-components';

const StyledAppbar = styled.header`
  grid-area: appbar;
  position: relative;
  --gap: 1rem;
  height: 10vh;
  align-items: center;

  & h2 {
    text-transform: capitalize;
  }

  & .image-wrapper {
    padding: 1em 2em;
    position: relative;
    min-width: var(--drawer-width);
    border-right: 2px solid hsl(var(--clr-line));
    border-bottom: 2px solid transparent;
    padding-left: 1em;
    height: 100%;
    transition: all 0.2s;
    & img {
      padding: 1.5rem;
    }
    &.drawer-hidden {
      border-color: hsl(var(--clr-line));
    }
  }

  & .appBar {
    padding-inline: 2em;
    border-bottom: 2px solid hsl(var(--clr-line));
    flex: 1;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  & .actions {
    align-items: center;
    margin-left: 0.5em;
    --gap: 1rem;
  }
  & .logout--icon {
    display: none;
  }

  @media screen and (max-width: 870px) {
    & .actions {
      --gap: 0.3rem;
    }
    & .create-btn-text {
      display: none;
    }
    & .logout--btn {
      background-color: transparent;
    }
    & .logout--btn_text {
      display: none;
    }

    & .logout--icon {
      display: block;
      font-size: 25px;
      color: hsl(var(--clr-red));
    }
  }
  @media screen and (max-width: 750px) {
    & .actions {
      justify-content: center;
      --gap: 0;

      & .create-task-btn {
        background-color: transparent;
        color: hsl(var(--clr-primary-light));
        font-size: 1rem;
        padding: 0;
        &:hover {
          color: hsl(var(--clr-primary));
        }
      }
    }
  }
`;

export default StyledAppbar;
