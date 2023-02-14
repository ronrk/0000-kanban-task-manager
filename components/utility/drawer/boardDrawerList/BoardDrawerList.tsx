import { IconBoard } from '@/components/ui/icons';
import { HiOutlinePlus } from 'react-icons/hi';
import Wrapper from './BoardDrawerList.styled';

export interface IBoardDrawerList {
  sampleTextProps?: string;
}

const BoardDrawerList: React.FC<IBoardDrawerList> = () => {
  const boards: string[] = [];
  return (
    <Wrapper>
      <h3 className="fs-400 uppercase text-light">
        All Boards{boards.length === 0 ? null : `(${boards.length})`}
      </h3>
      <ul className="board-list">
        {boards.map((board, i) => (
          <button key={i}>
            <li className="text-primary fs-500 fw-m capitalize flex">
              <IconBoard />
              {board}
            </li>
          </button>
        ))}
        <li className="create-new-link">
          <button className="text-primary fs-400 fw-b">
            <HiOutlinePlus /> Create New Board
          </button>
        </li>
      </ul>
    </Wrapper>
  );
};

export default BoardDrawerList;
