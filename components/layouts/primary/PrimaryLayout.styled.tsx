import styled from 'styled-components';

const StyledPrimaryLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & .app {
    display: grid;
    /* padding: 1em; */
    padding-left: var(--drawer-width);
    flex: 1;
    transition: all 0.3s;
    min-height: 90vh;
    max-height: 100%;
    &.full-w {
      padding-left: 1em;
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
