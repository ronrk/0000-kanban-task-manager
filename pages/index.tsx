import ModalContainer from '@/components/cards/modalContainer/ModalContainer';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import EmptyBoards from '@/components/surfaces/emptyBoards/EmptyBoards';
import TaskManagerContainer from '@/components/surfaces/taskManagerContainer/TaskManagerContainer';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import { Board, checkClientSessionAuthentication } from '@/database';
import { selectClientValue, useAppDispatch } from '@/store';
import { IBoard, IUser } from '@/types';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { authOptions } from './api/auth/index';
import { NextPageWithLayout } from './page';

interface IProps {
  user: IUser | null;
  boards: IBoard[];
}

const Home: NextPageWithLayout<IProps> = ({ user, boards }) => {
  const { status, data } = useSession();
  const { isModalOpen, modalChildren } = useSelector(selectClientValue);
  const dispatch = useAppDispatch();
  console.log({ status });

  /*   useEffect(() => {
    console.log('HOME PAGE USE EFFECT');
    if (status === 'unauthenticated') Router.replace('/auth/signin');
    if (status === 'authenticated') {
      dispatch(setAuthenticatedUser(user));
    }
  }, [status, user, dispatch]); */

  console.log({ user });

  if (status === 'loading') {
    return (
      <PrimaryLayout>
        <LoadingSpinner />;
      </PrimaryLayout>
    );
  }
  if (status === 'authenticated' && user) {
    return (
      <PrimaryLayout>
        {isModalOpen && <ModalContainer>{modalChildren}</ModalContainer>}
        <section>
          {user.boards.length > 0 ? <TaskManagerContainer /> : <EmptyBoards />}
        </section>
      </PrimaryLayout>
    );
  }
  return (
    <PrimaryLayout>
      <LoadingSpinner />;
    </PrimaryLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let props: IProps = {
    user: null,
    boards: [],
  };

  try {
    const user: false | IUser = await checkClientSessionAuthentication(
      context,
      authOptions,
      getServerSession
    );

    if (!user) {
      return {
        redirect: {
          permanent: true,
          destination: '/auth/signin',
        },
      };
    }
    props.user = user;
    const boards: IBoard[] = await Board.find({ user: user._id });
    props.boards = JSON.parse(JSON.stringify(boards));
    return {
      props,
    };
  } catch (error) {
    console.log({ error });
    return {
      props,
      redirect: {
        destination: '/server500',
        permanent: true,
      },
    };
  }
};
