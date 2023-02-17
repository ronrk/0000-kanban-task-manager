// import AuthButton from '../../buttons/auth/AuthButton';
import MenuDropdown from '@/components/ui/menuDropdown/MenuDropdown';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import ShowDrawerButton from '@/components/ui/showDrawerButton/ShowDrawerButton';
import Drawer from '@/components/utility/drawer/Drawer';
import { selectBoardValue, selectClientValue } from '@/store';
import Image from 'next/image';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Wrapper from './Appbar.styled';

export interface IAppbar extends React.ComponentPropsWithoutRef<'header'> {}

const Appbar: React.FC<IAppbar> = () => {
  const { user, isDrawerOpen, darkTheme } = useSelector(selectClientValue);

  const { activeBoard } = useSelector(selectBoardValue);

  return (
    <Wrapper className="flex bg-box">
      <Drawer />
      <div
        className={
          isDrawerOpen ? 'image-wrapper' : 'image-wrapper drawer-hidden'
        }
      >
        <Image
          src={darkTheme ? '/assets/logo-light.svg' : '/assets/logo-dark.svg'}
          alt={''}
          fill
        />
      </div>
      <div className="appBar flex">
        <h2 className="fs-600 line-h-500 text-dark">Welcome {user.username}</h2>
        <div className="actions flex">
          <PrimaryButton
            color="primary"
            className="create-task-btn flex text-dark"
            disabled={
              !activeBoard || activeBoard.columns.length === 0 ? true : false
            }
          >
            <HiOutlinePlus />
            <span className="create-btn-text">Add New Task</span>
          </PrimaryButton>
          <MenuDropdown
            value={null}
            options={['edit', 'delete']}
            onChange={() => {}}
          />
        </div>
      </div>
      {!isDrawerOpen && <ShowDrawerButton />}
    </Wrapper>
  );
};

export default Appbar;
