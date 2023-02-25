import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import TaskManagerContainer from '@/components/surfaces/taskManagerContainer/TaskManagerContainer';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import { checkClientSessionAuthentication } from '@/database';
import {
  selectBoardValue,
  setAuthenticatedUser,
  useAppDispatch,
  useGetBoardsByUIDQuery,
} from '@/store';
import { IUser, StatusType } from '@/types';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authOptions } from './api/auth/index';
import { NextPageWithLayout } from './page';

interface IProps {
  user: IUser | null;
}

const Home: NextPageWithLayout<IProps> = ({ user }) => {
  const { status: authStatus } = useSession();
  const { status: boardStatus } = useSelector(selectBoardValue);
  const dispatch = useAppDispatch();
  const { isLoading: loadingBoards, isError } = useGetBoardsByUIDQuery(
    user?._id
  );

  let isLoading = authStatus === 'loading' || loadingBoards;
  let errorState =
    isError ||
    boardStatus === StatusType.ERROR ||
    !user ||
    authStatus === 'unauthenticated';

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      return;
    }
    if (authStatus === 'authenticated') {
      dispatch(setAuthenticatedUser(user));
    }
  }, [authStatus, user, dispatch]);

  if (isLoading) {
    return (
      <PrimaryLayout className={isLoading ? 'loading' : ''}>
        <LoadingSpinner color="primary" />;
      </PrimaryLayout>
    );
  }
  if (errorState) {
    return (
      <PrimaryLayout className="error_page">
        <h2 className="text-dark fs-700">There was error with your request</h2>
        <Link href={'/'} className="text-primary fs-600">
          Back to home page
        </Link>
      </PrimaryLayout>
    );
  }

  return (
    <PrimaryLayout withAppBar>
      <TaskManagerContainer />
    </PrimaryLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let props: IProps = {
    user: null,
  };
  console.log('SERVER SIDE RENDER');

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
    return {
      props,
    };
  } catch (error) {
    console.log({ error });
    console.log('INDEX PAGE SERVER REDNDER ERROR');

    return {
      props,
      redirect: {
        destination: '/server500',
        permanent: true,
      },
    };
  }
};
