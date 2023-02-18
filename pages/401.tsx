import { NextPageWithLayout } from './page';

interface IProps {}

const Server401: NextPageWithLayout<IProps> = () => {
  return (
    <div>
      <h1>Error Unauthorized</h1>
      <h2>SERVER 401 PAGE</h2>
    </div>
  );
};

export default Server401;
