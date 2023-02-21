import Appbar from '@/components/navigation/Appbar/Appbar';
import { selectClientValue } from '@/store';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Wrapper from './PrimaryLayout.styled';

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  title?: string;
  withAppBar?: boolean;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  withAppBar,
  children,
  title = 'Task Manager',
  ...divProps
}) => {
  const { darkTheme, isDrawerOpen } = useSelector(selectClientValue);

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
      <Wrapper
        {...divProps}
        className={
          darkTheme ? `${divProps.className} dark` : `${divProps.className}`
        }
        withAppBar
      >
        {withAppBar && <Appbar />}
        <main
          className={
            isDrawerOpen && withAppBar ? 'app bg-app' : 'app bg-app full-w'
          }
        >
          {children}
        </main>
        {/* <div className="m-auto" /> */}
      </Wrapper>
    </>
  );
};

export default PrimaryLayout;
