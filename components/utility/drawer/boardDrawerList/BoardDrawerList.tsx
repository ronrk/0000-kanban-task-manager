import CreateNewBoard from '@/components/forms/createNewBoard/CreateNewBoard';
import { IconBoard } from '@/components/ui/icons';
import {
  openModal,
  useAppDispatch,
  useGetAllBoardsQuery,
  useGetTemplateBoardQuery,
} from '@/store';
import { IBoard } from '@/types';
import { HiOutlinePlus } from 'react-icons/hi';
import Wrapper from './BoardDrawerList.styled';

export interface IBoardDrawerList {
  sampleTextProps?: string;
}

const BoardDrawerList: React.FC<IBoardDrawerList> = () => {
  const dispatch = useAppDispatch();
  const boards: string[] = [];
  const { data, isLoading } = useGetAllBoardsQuery('');

  const { data: templateBoard, isSuccess } =
    useGetTemplateBoardQuery('?template=true');

  return (
    <Wrapper>
      <h3 className="fs-400 uppercase text-light">
        All Boards{boards.length === 0 ? null : `(${boards.length})`}
      </h3>
      {!isLoading && (
        <ul className="board-list">
          {data.map((board: IBoard) => (
            <button key={board._id.toString()}>
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
                // dispatch(getTemplateBoard()).catch((e) => console.log(e));
                if (isSuccess) {
                  dispatch(
                    openModal(
                      <CreateNewBoard
                        templateBoard={templateBoard}
                        templateColumns={templateBoard?.columns}
                      />
                    )
                  );
                }
              }}
            >
              <HiOutlinePlus /> Create New Board
            </button>
          </li>
        </ul>
      )}
    </Wrapper>
  );
};

export default BoardDrawerList;
