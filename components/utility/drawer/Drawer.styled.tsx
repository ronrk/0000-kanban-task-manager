import styled from 'styled-components';

const StyledDrawer = styled.nav`
  grid-area: sidebar;
  top: 100%;
  left: 0;
  width: var(--drawer-width);

  max-height: 100%;
  align-items: flex-start;
  border-right: 2px solid hsl(var(--clr-line));

  transition: width 0.4s;

  & .theme-toggle {
    width: 100%;
    --gap: 1em;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
    padding: 0.5em 1em;
    border-radius: 6px;
    & label {
      cursor: pointer;
    }
    & input {
      cursor: pointer;
      position: relative;
      appearance: none;
      background-color: hsl(var(--clr-primary));

      width: 2.5rem;
      height: 1.5rem;
      border-radius: 100px;
      &::before {
        position: absolute;
        content: '';
        background: hsl(var(--clr-box-bg));

        width: 50%;
        height: 85%;
        right: 1px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 100px;
        transition: all 0.2s;
      }
      &:checked {
        &::before {
          transform: translate(-92.6%, -50%);
        }
      }
    }
    &:hover,
    &:focus {
      & input::before {
        background: hsla(var(--clr-app-bg), 0.4);
      }
    }
  }

  & .btn--hide {
    --gap: 0.5em;
    align-items: center;
    padding: 1em 1em 2em;
    transition: all 0.2s;

    & .icon {
      font-size: 1.5rem;
    }
    &:hover,
    &:focus {
      color: hsl(var(--clr-primary));
    }
  }
  &.hide {
    width: 0;
    overflow: hidden;
  }
  @media screen and (max-width: 650px) {
    display: none;
  }
`;

export default StyledDrawer;
