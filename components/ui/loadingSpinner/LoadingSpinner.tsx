import Wrapper from './LoadingSpinner.styled';

export interface ILoadingSpinner {}

const LoadingSpinner: React.FC<ILoadingSpinner> = () => {
  return (
    <Wrapper className="spinner-container">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Wrapper>
  );
};

export default LoadingSpinner;
