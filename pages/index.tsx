import ModalContainer from '@/components/cards/modalContainer/ModalContainer';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import EmptyBoards from '@/components/surfaces/emptyBoards/EmptyBoards';
import TaskManagerContainer from '@/components/surfaces/taskManagerContainer/TaskManagerContainer';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import {
  selectClientValue,
  useGetBoardsByUIDQuery,
  useGetUserByUIDQuery,
} from '@/store';
import { StatusType } from '@/types';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { NextPageWithLayout } from './page';

interface IProps {
  uid: string;
  status: StatusType;
  error: null | { messsage: string; error?: any };
}

const Home: NextPageWithLayout<IProps> = ({ uid }) => {
  const {
    isModalOpen,
    modalChildren,
    user: activeUser,
  } = useSelector(selectClientValue);
  const { isLoading, isError, error } = useGetUserByUIDQuery(uid);
  useGetBoardsByUIDQuery(uid);
  const router = useRouter();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    console.log({ error });
    router.push('/401');
  }

  if (!activeUser) {
    return <div>No ACTIOVE USER</div>;
  }

  return (
    <PrimaryLayout>
      {isModalOpen && <ModalContainer>{modalChildren}</ModalContainer>}
      <section>
        {activeUser.boards.length > 0 ? (
          <TaskManagerContainer />
        ) : (
          <EmptyBoards />
        )}
      </section>
    </PrimaryLayout>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let props: IProps = { uid: '', status: StatusType.IDLE, error: null };
  let uid = '63f0bd7db61e16a73559c7de';

  try {
    if (uid === '') {
      props.error = {
        messsage: `No user with id: ${uid}`,
        error: `No user with id: ${uid}`,
      };
      props.status = StatusType.ERROR;
      return {
        props,
        redirect: {
          destination: '/login',
          permanent: true,
        },
      };
    }

    props.uid = uid;
    props.status = StatusType.FULLFILED;
    return {
      props,
    };
  } catch (error) {
    console.log({ status: 'Error Block' });
    console.log({ error });
    props.error = {
      messsage: `Error connecting to DB`,
      error,
    };
    props.status = StatusType.ERROR;
    return {
      props,
      redirect: {
        destination: '/server500',
        permanent: true,
      },
    };
  }
};
