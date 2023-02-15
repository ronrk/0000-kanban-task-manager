import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';

import { closeModal, selectClientValue, useAppDispatch } from '@/store';
import { StatusType } from '@/types';

import { useSelector } from 'react-redux';
import Wrapper from './ModalContainer.styled';

export interface IModalContainer extends React.ComponentPropsWithoutRef<'div'> {
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
}

const ModalContainer: React.FC<IModalContainer> = ({
  children,
  isLoading,
  isError,
  error,
}) => {
  const dispatch = useAppDispatch();
  const { status } = useSelector(selectClientValue);
  return (
    <Wrapper>
      <div className="bg" onClick={() => dispatch(closeModal())}></div>
      {status === StatusType.PENDING ? <LoadingSpinner /> : children}
    </Wrapper>
  );
};

export default ModalContainer;
