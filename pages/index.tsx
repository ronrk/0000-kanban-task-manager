import ModalContainer from '@/components/cards/modalContainer/ModalContainer';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import TaskManagerContainer from '@/components/surfaces/taskManagerContainer/TaskManagerContainer';
import { selectClientValue } from '@/store';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';
import { NextPageWithLayout } from './page';

interface IProps {}

const Home: NextPageWithLayout<IProps> = () => {
  const { isModalOpen, modalChildren } = useSelector(selectClientValue);
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
  let props: IProps = {};
  try {
    // const { data } = await axios('http://localhost:3000/api/user');
    // props = { ...data, error: null };

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
