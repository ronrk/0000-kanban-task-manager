import { ColorsType } from '@/types';
import Wrapper from './LoadingSpinner.styled';

export interface ILoadingSpinner {
  color: ColorsType;
}

const numberOfCircles = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const LoadingSpinner: React.FC<ILoadingSpinner> = ({ color = 'primary' }) => {
  const background = `bg-${color}`;

  return (
    <Wrapper className="spinner-container">
      {numberOfCircles.map((div) => (
        <div key={div} className={background}></div>
      ))}
    </Wrapper>
  );
};

export default LoadingSpinner;
