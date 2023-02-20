// import AuthButton from '../../buttons/auth/AuthButton';
import MenuDropdown from '@/components/ui/menuDropdown/MenuDropdown';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import ShowDrawerButton from '@/components/ui/showDrawerButton/ShowDrawerButton';
import Drawer from '@/components/utility/drawer/Drawer';
import {
  logout,
  selectBoardValue,
  selectClientValue,
  selectUser,
  useAppDispatch,
} from '@/store';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { CiLogout } from 'react-icons/ci';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Wrapper from './Appbar.styled';

export interface IAppbar extends React.ComponentPropsWithoutRef<'header'> {}

const Appbar: React.FC<IAppbar> = () => {
  const { isDrawerOpen, darkTheme } = useSelector(selectClientValue);
  const { user } = useSelector(selectUser);
  const { currentBoard } = useSelector(selectBoardValue);
  const dispatch = useAppDispatch();

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
        <h2 className="fs-600 line-h-500 text-dark">
          Welcome {user?.username}
        </h2>

        <div className="actions flex">
          <PrimaryButton
            color="primary"
            className="create-task-btn flex text-dark"
            disabled={
              !currentBoard || currentBoard.columns.length === 0 ? true : false
            }
          >
            <HiOutlinePlus />
            <span className="create-btn-text">Add New Task</span>
          </PrimaryButton>
          <PrimaryButton
            color="red"
            className="fs-100 logout--btn"
            onClick={() => {
              dispatch(logout());
              signOut();
            }}
          >
            <span className="text-dark  logout--btn_text">Logout</span>
            <span className="logout--icon">
              <CiLogout />
            </span>
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
