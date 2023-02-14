import { BiHide } from 'react-icons/bi';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import BoardDrawerList from './boardDrawerList/BoardDrawerList';
import Wrapper from './Drawer.styled';

export interface IDrawer {}

const Drawer: React.FC<IDrawer> = () => {
  const darkTheme = true;
  const showDrawer = true;
  return (
    <Wrapper
      className={showDrawer ? 'show bg-box flex-col' : 'hide bg-box flex-col'}
    >
      <BoardDrawerList />
      <div className="theme-toggle flex bg-app text-light">
        <label>
          <BsMoonStarsFill />
        </label>

        <input
          type="radio"
          name="theme"
          checked={!darkTheme}
          onChange={() => {}}
        />
        <label>
          <BsFillSunFill />
        </label>
      </div>
      <button className="btn--hide flex fs-400 text-light">
        <BiHide className="icon" />
        Hide Sidebar
      </button>
    </Wrapper>
  );
};

export default Drawer;
