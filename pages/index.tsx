import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import TaskManagerContainer from '@/components/surfaces/taskManagerContainer/TaskManagerContainer';
import { GetServerSideProps } from 'next';
import { NextPageWithLayout } from './page';

interface IProps {}

const Home: NextPageWithLayout<IProps> = () => {
  return (
    <PrimaryLayout>
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
