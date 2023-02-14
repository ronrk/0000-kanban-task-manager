import {
  selectClientValue,
  toggleDrawer,
  toggleTheme,
  useAppDispatch,
} from '@/store';
import { BiHide } from 'react-icons/bi';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import BoardDrawerList from './boardDrawerList/BoardDrawerList';
import Wrapper from './Drawer.styled';

export interface IDrawer {}

const Drawer: React.FC<IDrawer> = () => {
  const { isDrawerOpen, darkTheme } = useSelector(selectClientValue);
  const dispatch = useAppDispatch();

  return (
    <Wrapper
      className={isDrawerOpen ? 'show bg-box flex-col' : 'hide bg-box flex-col'}
    >
      <BoardDrawerList />
      <div className="theme-toggle flex bg-app text-light">
        <label htmlFor="theme" onClick={() => dispatch(toggleTheme())}>
          <BsMoonStarsFill />
        </label>

        <input
          type="checkbox"
          name="theme"
          checked={darkTheme}
          onChange={() => dispatch(toggleTheme())}
        />
        <label htmlFor="name" onClick={() => dispatch(toggleTheme())}>
          <BsFillSunFill />
        </label>
      </div>
      <button
        className="btn--hide flex fs-400 text-light"
        onClick={() => dispatch(toggleDrawer())}
      >
        <BiHide className="icon" />
        Hide Sidebar
      </button>
    </Wrapper>
  );
};

export default Drawer;
