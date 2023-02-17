import CreateNewBoard from '@/components/forms/createNewBoard/CreateNewBoard';
import { IconBoard } from '@/components/ui/icons';
import {
  changeActiveBoard,
  openModal,
  selectBoardValue,
  useAppDispatch,
} from '@/store';
import { IBoard } from '@/types';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Wrapper from './BoardDrawerList.styled';

export interface IBoardDrawerList {
  sampleTextProps?: string;
}

const BoardDrawerList: React.FC<IBoardDrawerList> = () => {
  const dispatch = useAppDispatch();
  const { data: boards, status } = useSelector(selectBoardValue);
  const { activeBoard } = useSelector(selectBoardValue);

  return (
    <Wrapper>
      <h3 className="fs-400 uppercase text-light">
        All Boards{boards.length === 0 ? null : `(${boards.length})`}
      </h3>
      <ul className="board-list">
        {boards.map((board: IBoard) => (
          <button
            key={board._id.toString()}
            className={activeBoard?._id === board._id ? 'active' : ''}
            onClick={() => dispatch(changeActiveBoard(board))}
          >
            <li className="text-primary fs-500 fw-m capitalize flex">
              <IconBoard />
              {board.name}
            </li>
          </button>
        ))}
        <li className="create-new-link">
          <button
            className="text-primary fs-400 fw-b flex"
            onClick={() => {
              dispatch(openModal(<CreateNewBoard />));
            }}
          >
            <HiOutlinePlus /> Create New Board
          </button>
        </li>
      </ul>
    </Wrapper>
  );
};

export default BoardDrawerList;
