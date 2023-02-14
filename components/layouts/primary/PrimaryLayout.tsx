import Appbar from '@/components/navigation/Appbar/Appbar';
import Head from 'next/head';
import Wrapper from './PrimaryLayout.styled';

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  title = 'Task Manager',
  ...divProps
}) => {
  const showDrawer = true;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Apllication to control and manage your tasks"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Wrapper {...divProps}>
        <Appbar />
        <main className={showDrawer ? 'app bg-app' : 'app bg-app full-w'}>
          {children}
        </main>
        {/* <div className="m-auto" /> */}
      </Wrapper>
    </>
  );
};

export default PrimaryLayout;
