import { IconRemove } from '@/components/ui/icons';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import PrimaryInput from '@/components/ui/primaryInput/PrimaryInput.styled';
import TodoDropdown from '@/components/ui/todoDropdown/TodoDropdown';
import useInput from '@/hooks/useInput';
import { getTemplateColumn } from '@/lib/queryColumn/queryColumn';
import { closeModal, useAppDispatch, useCreateNewBoardMutation } from '@/store';
import { ColType, IBoard, IColumn } from '@/types';
import { FormEvent, useState } from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import Wrapper from '../FormWrapper.styled';

export interface ICreateNewBoard extends React.ComponentPropsWithoutRef<'div'> {
  templateBoard: IBoard;
  templateColumns: IColumn[];
}

const CreateNewBoard: React.FC<ICreateNewBoard> = ({
  templateBoard,
  templateColumns,
}) => {
  const [board, setBoard] = useState<IBoard>(templateBoard);
  const [columnsChoosen, setColumnsChoosen] =
    useState<IColumn[]>(templateColumns);

  const [addBoard] = useCreateNewBoardMutation();

  const addNewColumn = () => {
    getTemplateColumn(board!._id)
      .then((data: IColumn) => {
        setBoard((prev) => {
          if (!prev) {
            return prev;
          }
          return { ...prev, columns: [...board!.columns, data] };
        });
        setColumnsChoosen((prev) => [...prev, data]);
      })
      .catch((e) => console.log({ e, message: 'Error fetching data' }));
  };

  const dispatch = useAppDispatch();

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
        return { ...column, name: colType };
      }
      return column;
    });

    setColumnsChoosen(updatedColumns);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBoard({ ...board, name: enteredName }).then(() =>
      dispatch(closeModal())
    );
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
                value={col.name}
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
