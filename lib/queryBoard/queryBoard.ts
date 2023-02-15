import { IBoard } from '@/types';

export const getTemplateBoard = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/boards?template=true');

    const data = await res.json();

    return {
      ...data.initialBoard,
      columns: [{ ...data.initialColumn, board: data.initialBoard._id }],
    };
  } catch (error) {
    if (error instanceof Error) return error;
  }
};

export const createNewBoard = async (newBoard: IBoard) => {
  try {
    const res = await fetch('http://localhost:3000/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoard),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBoards = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/boards');
    const data = await res.json();
    return data;
  } catch (error) {
    throw { error };
  }
};
