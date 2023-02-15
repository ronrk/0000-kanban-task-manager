import { IBoard, IColumn } from '@/types';

export const formatBoards = (data: {
  initialBoard: IBoard;
  initialColumn: IColumn;
}): IBoard => {
  return {
    ...data.initialBoard,
    columns: [{ ...data.initialColumn, board: data.initialBoard._id }],
  };
};
