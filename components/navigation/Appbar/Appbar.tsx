// import AuthButton from '../../buttons/auth/AuthButton';
import CreateNewBoard from '@/components/forms/createNewBoard/CreateNewBoard';
import CreateNewTask from '@/components/forms/createNewTask/CreateNewTask';
import DeleteBoard from '@/components/forms/deleteBoard/DeleteBoard';
import IconButton from '@/components/ui/iconButton/IconButton.styled';
import MenuDropdown from '@/components/ui/menuDropdown/MenuDropdown';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import ShowDrawerButton from '@/components/ui/showDrawerButton/ShowDrawerButton';
import {
  logout,
  openModal,
  selectBoardValue,
  selectClientValue,
  selectUser,
  useAppDispatch,
} from '@/store';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
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
        <div className="flex">
          <h2 className="fs-600 line-h-500 text-dark">
            {!currentBoard ? `Welcome ${user?.username}` : currentBoard.name}
          </h2>
          <IconButton
            color="red"
            className="fs-200 logout--btn"
            onClick={() => {
              dispatch(logout());
              signOut();
            }}
            icon="logout"
            textLabel="Logout"
          />
        </div>

        <div className="actions flex">
          <PrimaryButton
            color="primary"
            className="create-task-btn flex text-dark"
            disabled={
              !currentBoard || currentBoard.columns.length === 0 ? true : false
            }
            onClick={() => dispatch(openModal(<CreateNewTask />))}
            textLabel={
              <>
                <HiOutlinePlus fontSize={'17px'} className={`icon text-dark`} />
                Add New Task
              </>
            }
          />

          <MenuDropdown
            disabled={currentBoard ? false : true}
            value={null}
            options={['edit', 'delete']}
            cb={(type) => {
              if (type === 'edit') {
                console.log('edit');
                dispatch(openModal(<CreateNewBoard board={currentBoard} />));
              }
              if (type === 'delete') {
                dispatch(openModal(<DeleteBoard type={'board'} />));
              }
            }}
          />
        </div>
      </div>
      {!isDrawerOpen && <ShowDrawerButton />}
    </Wrapper>
  );
};

export default Appbar;
