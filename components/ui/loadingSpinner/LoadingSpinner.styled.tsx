import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  &.spinner-container {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    justify-self: center;

    & div {
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: hsl(var(--clr-primary-light));
      animation: lds-grid 1.2s linear infinite;

      &:nth-child(1) {
        top: 8px;
        left: 8px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        top: 8px;
        left: 32px;
        animation-delay: -0.4s;
      }
      &:nth-child(3) {
        top: 8px;
        left: 56px;
        animation-delay: -0.8s;
      }
      &:nth-child(4) {
        top: 32px;
        left: 8px;
        animation-delay: -0.4s;
      }
      &:nth-child(5) {
        top: 32px;
        left: 32px;
        animation-delay: -0.8s;
      }
      &:nth-child(6) {
        top: 32px;
        left: 56px;
        animation-delay: -1.2s;
      }
      &:nth-child(7) {
        top: 56px;
        left: 8px;
        animation-delay: -0.8s;
      }
      &:nth-child(8) {
        top: 56px;
        left: 32px;
        animation-delay: -1.2s;
      }
      &:nth-child(9) {
        top: 56px;
        left: 56px;
        animation-delay: -1.6s;
      }
    }
  }
  @keyframes lds-grid {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export default StyledLoadingSpinner;
