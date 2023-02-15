import mongoose from 'mongoose';

export const getTemplateColumn = async (boardId: mongoose.Types.ObjectId) => {
  try {
    const res = await fetch('http://localhost:3000/api/columns?template=true');
    const data = await res.json();

    return { ...data.newColumn, board: boardId };
  } catch (error) {
    console.log(error);
  }
};
