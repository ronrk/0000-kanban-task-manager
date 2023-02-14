import styled from 'styled-components';

const StyledAppbar = styled.header`
  position: relative;
  --gap: 0;
  height: 10vh;
  /* align-items: center; */

  & h2 {
    text-transform: capitalize;
  }

  & .image-wrapper {
    padding: 1em 2em;
    position: relative;
    width: var(--drawer-width);
    border-right: 2px solid hsl(var(--clr-line));
    border-bottom: 2px solid transparent;
    padding-left: 1em;
    height: 100%;
    transition: all 0.2s;
    & img {
      object-fit: contain;
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

    & .actions {
      align-items: center;
      margin-left: 1em;
    }
  }

  @media screen and (max-width: 870px) {
    & .create-btn-text {
      display: none;
    }
  }
  @media screen and (max-width: 750px) {
    & .actions {
      /* flex-direction: column; */
      justify-content: center;
      /* align-items: flex-start; */

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
