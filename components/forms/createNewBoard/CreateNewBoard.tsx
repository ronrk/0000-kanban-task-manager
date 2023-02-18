import { IconRemove } from '@/components/ui/icons';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import PrimaryInput from '@/components/ui/primaryInput/PrimaryInput.styled';
import TodoDropdown from '@/components/ui/todoDropdown/TodoDropdown';
import useInput from '@/hooks/useInput';

import {
  closeModal,
  selectClientValue,
  useAppDispatch,
  useCreateNewBoardMutation,
  useGetTemplateBoardQuery,
} from '@/store';
import { ColType, IBoard, IColumn } from '@/types';
import mongoose from 'mongoose';
import { FormEvent, useEffect, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import Wrapper from '../FormWrapper.styled';

export interface ICreateNewBoard extends React.ComponentPropsWithoutRef<'div'> {
  board?: IBoard;
}

const CreateNewBoard: React.FC<ICreateNewBoard> = ({ board }) => {
  const [formBoard, setFormBoard] = useState<IBoard | null>(board || null);
  const [columnsChoosen, setColumnsChoosen] = useState<IColumn[]>(
    board?.columns || []
  );
  const { user } = useSelector(selectClientValue);

  const [addBoard] = useCreateNewBoardMutation();
  const dispatch = useAppDispatch();

  const { data, isSuccess } = useGetTemplateBoardQuery('');

  useEffect(() => {
    if (!formBoard && isSuccess) {
      setFormBoard(data);
      setColumnsChoosen(data?.columns);
    }
  }, [data, isSuccess, formBoard]);

  const addNewColumn = async () => {
    fetch(`/api/boards?template=true`)
      .then((res) => res.json())
      .then((data: { initialColumn: IColumn }) => {
        const newColumnId = new mongoose.Types.ObjectId();
        setColumnsChoosen((prev) => [
          ...prev,
          { ...data.initialColumn, _id: newColumnId },
        ]);
        setFormBoard((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            columns: [
              ...prev.columns,
              { ...data.initialColumn, _id: newColumnId },
            ],
          };
        });
      })
      .catch((error) =>
        console.log({ message: 'Error create new column', error })
      );
  };

  const {
    value: enteredName,
    handleChange: handleNameChange,
    isError: isNameError,
    onFocus: handleNameFocus,
    onBlur: handleNameBlur,
  } = useInput((value) => value.length > 0);

  const handleColChange = (col: any, colType: ColType) => {
    const updatedColumns = columnsChoosen.map((column) => {
      if (column._id === col._id) {
        return { ...column, status: colType };
      }
      return column;
    });
    setColumnsChoosen(updatedColumns);
    setFormBoard((prev) => {
      if (!prev) return prev;
      return { ...prev, columns: updatedColumns };
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addBoard({
      uid: user?._id,
      board: { ...formBoard, name: enteredName },
    })
      .then(() => dispatch(closeModal()))
      .catch((error) => {
        console.log({ error, message: 'Error Creating New Board' });
      });
  };

  let content = (
    <form onSubmit={submitHandler} className="flex-col">
      <div className="form-control flex-col">
        <label htmlFor="name" className="text-light fs-300">
          Name
        </label>
        <PrimaryInput
          fullWidth
          type="text"
          placeholder="e.g Web Design"
          className="text-dark fs-400"
          value={enteredName}
          onChange={(e) => handleNameChange(e.target.value)}
          onBlur={handleNameBlur}
          onFocus={handleNameFocus}
          required
        />
        <p className={isNameError ? 'form-error show fs-400' : 'form-error'}>
          Name cannot be empty.
        </p>
      </div>
      <div className="columns flex-col">
        <label className="fw-m fs-300 text-light">Board Columns:</label>
        {columnsChoosen.map((col, idx) => {
          return (
            <div className="form-control flex" key={idx}>
              <TodoDropdown
                onChange={(colType) => handleColChange(col, colType)}
                value={col.status}
              />

              <IconRemove
                onClick={() =>
                  setColumnsChoosen((prev) =>
                    prev.filter((column, colIdx) => idx !== colIdx)
                  )
                }
                type="button"
              ></IconRemove>
            </div>
          );
        })}
        <PrimaryButton
          color="primary-light"
          type="button"
          fullWidth
          onClick={addNewColumn}
        >
          <HiOutlinePlus /> Add New Column
        </PrimaryButton>
      </div>

      <PrimaryButton
        color="primary"
        type="submit"
        fullWidth
        className="submit-btn"
      >
        Create New Board
      </PrimaryButton>
    </form>
  );
  return (
    <Wrapper className="bg-app create-board flex-col">
      <h3 className="text-dark fs-500">Add new Board</h3>
      {content}
    </Wrapper>
  );
};

export default CreateNewBoard;
