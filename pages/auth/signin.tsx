import SignIn from '@/components/forms/signIn/SignIn';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { checkClientSessionAuthentication } from '@/database';
import { selectClientValue } from '@/store';
import { IUser } from '@/types';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { authOptions } from '../api/auth';
import { NextPageWithLayout } from '../page';

interface IProps {}

const Login: NextPageWithLayout<IProps> = () => {
  const { darkTheme } = useSelector(selectClientValue);

  return (
    <PrimaryLayout className="sign-in__page">
      <div className="image__wrapper">
        <Image
          src={darkTheme ? '/assets/logo-light.svg' : '/assets/logo-dark.svg'}
          alt={''}
          fill
        />
      </div>
      <SignIn />
    </PrimaryLayout>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const user: false | IUser = await checkClientSessionAuthentication(
      context,
      authOptions,
      getServerSession
    );
    if (user) {
      return {
        props: {},
        redirect: {
          permanent: true,
          destination: '/',
        },
      };
    }
    return { props: {} };
  } catch (error) {
    console.log({ error });
    return {
      props: {},
      redirect: {
        destination: '/server500',
        permanent: true,
      },
    };
  }
};
