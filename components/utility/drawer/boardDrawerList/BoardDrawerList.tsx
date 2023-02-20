import CreateNewBoard from '@/components/forms/createNewBoard/CreateNewBoard';
import { IconBoard } from '@/components/ui/icons';
import {
  changeActiveBoard,
  openModal,
  selectBoardValue,
  useAppDispatch,
} from '@/store';
import { IBoard, StatusType } from '@/types';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Wrapper from './BoardDrawerList.styled';

export interface IBoardDrawerList {
  sampleTextProps?: string;
}

const BoardDrawerList: React.FC<IBoardDrawerList> = () => {
  const dispatch = useAppDispatch();
  const { currentBoard, boards, status } = useSelector(selectBoardValue);

  let content: string | React.ReactNode;

  if (status === StatusType.PENDING) {
    content = '';
  } else if (status === StatusType.FULLFILED) {
    content = boards.map((board: IBoard) => (
      <button
        key={board._id.toString()}
        className={currentBoard?._id === board._id ? 'active' : ''}
        onClick={() => dispatch(changeActiveBoard(board._id))}
      >
        <li className="text-primary fs-500 fw-m capitalize flex">
          <IconBoard />
          {board.name}
        </li>
      </button>
    ));
  }

  return (
    <Wrapper>
      <h3 className="fs-400 uppercase text-light">
        All Boards{boards.length === 0 ? null : `(${boards.length})`}
      </h3>
      <ul className="board-list">
        {content}
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
