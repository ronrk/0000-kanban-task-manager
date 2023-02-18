import { NextPageWithLayout } from './page';

interface IProps {}

const Server500: NextPageWithLayout<IProps> = () => {
  return (
    <div>
      <h1>Error connect to DB</h1>
      <h2>SERVER 500 PAGE</h2>
    </div>
  );
};

export default Server500;
