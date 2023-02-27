import styled from 'styled-components';

const StyledAppbar = styled.header`
  grid-area: appbar;
  position: relative;
  --gap: 0;
  min-height: 10vh;
  align-items: center;

  & .image-wrapper {
    padding: 1em 2em;
    position: relative;
    min-width: var(--drawer-width);
    border-right: 2px solid hsl(var(--clr-line));
    border-bottom: 2px solid transparent;
    padding-left: 1em;
    height: 100%;
    aspect-ratio: 2;
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
    & .appbar__heading {
      &.hide {
        display: none;
      }
      display: block;
      text-transform: capitalize;
      margin-right: 1rem;
    }
    & .dropdown__wrapper {
      display: none;
    }
  }
  & .actions {
    align-items: center;
    margin-left: 0.5em;
    --gap: 1rem;
  }

  @media screen and (max-width: 710px) {
    & .appBar {
      padding-inline: 0.5rem;
    }
    & .actions {
      --gap: 0.3rem;
      & .create-task-btn {
        & .text {
          display: none;
        }
      }
    }
    & .logout--btn {
      margin-left: 0.5rem;
      & .text {
        display: none;
      }
    }
  }
  @media screen and (max-width: 750px) {
    & .actions {
      justify-content: center;
      --gap: 0;

      & .create-task-btn {
        /*         background-color: transparent;
        color: hsl(var(--clr-primary-light));
        font-size: 1rem;
        padding: 0;
        &:hover {
          color: hsl(var(--clr-primary));
        } */
      }
    }
  }
  @media screen and (max-width: 650px) {
    & .appBar {
      & .appbar__heading {
        display: none;
      }
      & .dropdown__wrapper {
        display: block;
        min-width: 100px;
        & .dropdown {
          width: 100%;
        }
      }
      & .menu {
        display: block;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export default StyledAppbar;
