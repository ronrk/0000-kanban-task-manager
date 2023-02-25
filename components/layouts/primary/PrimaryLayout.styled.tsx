import styled from 'styled-components';

interface ILayoutProps {
  withAppBar?: boolean;
}

const StyledPrimaryLayout = styled.div<ILayoutProps>`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: min-content 1fr;
  grid-template-areas:
    'appbar appbar'
    'sidebar app';

  &.loading {
    & main {
      display: flex;
      justify-content: center;
    }
  }

  &.sign-in__page {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    & main {
      display: grid;
      justify-content: center;
      grid-template-rows: min-content 1fr;
      & .image__wrapper {
        margin: 2rem;
        max-width: 250px;
        min-width: 200px;
        display: inline-block;
        aspect-ratio: 4;
        /* aspect-ratio: 1; */
      }
    }

    & .loading {
      align-items: center;
      justify-content: center;
      flex-grow: 0.5;
      width: 100%;
    }
  }

  & .app {
    grid-area: app;
    overflow-x: scroll;
    overflow-y: scroll;
    position: relative;
    align-self: stretch;
    flex-grow: 1;

    /* position: relative; */
    /*     max-height: 100%;
    overflow-y: scroll; */
    /* display: grid; */
    /* padding: 1em; */
    /* padding-left: var(--drawer-width); */
    /* flex: 1; */
    /* transition: all 0.3s; */
    /* min-height: 90vh; */
    /* max-height: 100%; */
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
