import ModalContainer from '@/components/cards/modalContainer/ModalContainer';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import TaskManagerContainer from '@/components/surfaces/taskManagerContainer/TaskManagerContainer';
import { connectMongo, User } from '@/database';
import {
  selectBoardValue,
  selectClientValue,
  setActiveUser,
  useAppDispatch,
} from '@/store';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextPageWithLayout } from './page';

interface IProps {
  user: any;
}

const Home: NextPageWithLayout<IProps> = ({ user }) => {
  const {
    isModalOpen,
    modalChildren,
    user: activeUser,
  } = useSelector(selectClientValue);
  const { activeBoard } = useSelector(selectBoardValue);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveUser(user));
  }, [dispatch, user]);

  if (!activeUser) {
    return <div>NO ACTIVE USER</div>;
  }
  if (!activeBoard) {
    return <>NO ACTIVE BOARD</>;
  }

  return (
    <PrimaryLayout>
      {isModalOpen && <ModalContainer>{modalChildren}</ModalContainer>}
      <section>
        <TaskManagerContainer />
      </section>
    </PrimaryLayout>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let props: IProps = { user: null };
  let uid = '63ef6eabacbe17dbd582395d';

  try {
    await connectMongo().catch((e) => {
      console.log('Error connection to database');
      return {
        props,
      };
    });

    const user = await User.findById(uid);

    if (!user) {
      console.log(`No user with id: ${uid}`);
      return {
        props,
      };
    }

    props.user = JSON.parse(JSON.stringify(user));

    return {
      props,
    };
  } catch (error) {
    console.log({ error });
    return {
      props,
    };
  }
};
