import DemoUserModal from '@/components/cards/demoUserModal/DemoUserModal';
import IconButton from '@/components/ui/iconButton/IconButton.styled';
import { IconRemove } from '@/components/ui/icons';
import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import PrimaryInput from '@/components/ui/primaryInput/PrimaryInput.styled';
import TodoDropdown from '@/components/ui/todoDropdown/TodoDropdown';
import useInput from '@/hooks/useInput';

import {
  closeModal,
  openModal,
  selectBoardValue,
  selectUser,
  useAddColumnByIdMutation,
  useAppDispatch,
  useCreateNewBoardMutation,
  useDeleteColumnByColIdMutation,
  useEditBoardByIdMutation,
  useEditColumnMutation,
  useGetTemplateBoardQuery,
} from '@/store';
import { ColType, IBoard, IColumn, StatusType } from '@/types';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../FormWrapper.styled';

export interface ICreateNewBoard extends React.ComponentPropsWithoutRef<'div'> {
  board?: IBoard | null;
}

const CreateNewBoard: React.FC<ICreateNewBoard> = ({ board }) => {
  const [formBoard, setFormBoard] = useState<IBoard | null>(board || null);
  const [columnsChoosen, setColumnsChoosen] = useState<IColumn[]>(
    board?.columns || []
  );
  const { user, demoUser } = useSelector(selectUser);
  const { status } = useSelector(selectBoardValue);
  const [addBoard] = useCreateNewBoardMutation();
  const [editBoard] = useEditBoardByIdMutation();
  const [editColumn] = useEditColumnMutation();
  const [addnewColumnToBoard] = useAddColumnByIdMutation();
  const [deleteColumn] = useDeleteColumnByColIdMutation();
  const dispatch = useAppDispatch();
  const { data, isSuccess } = useGetTemplateBoardQuery('');
  let isEdit = board ? true : false;

  useEffect(() => {
    if (!formBoard && isSuccess) {
      setFormBoard(data);
      setColumnsChoosen(data?.columns);
    }
  }, [data, isSuccess, formBoard]);

  const {
    value: enteredName,
    handleChange: handleNameChange,
    isError: isNameError,
    onFocus: handleNameFocus,
    onBlur: handleNameBlur,
  } = useInput((value) => value.length > 0, isEdit ? board?.name : '');

  const addNewColumn = async () => {
    if (isEdit) {
      const templateCol = await fetch('/api/boards?template=true')
        .then((res) => res.json())
        .then((data) => data.initialColumn);
      if (!templateCol) {
        return;
      }
      addnewColumnToBoard({
        boardId: board!._id,
        newCol: templateCol,
      })
        .unwrap()
        .then((data) => {
          setColumnsChoosen((prev) => [...prev, data.newColumn]);
          setFormBoard((prev) => {
            if (!prev) return prev;
            return { ...data.board, name: enteredName };
          });
        })
        .catch((error) => {
          console.log(error);
        });

      return;
    }
    fetch(`/api/boards?template=true`)
      .then((res) => res.json())
      .then((data: { initialColumn: IColumn }) => {
        setColumnsChoosen((prev) => [...prev, { ...data.initialColumn }]);

        setFormBoard((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            columns: [...prev.columns, { ...data.initialColumn }],
          };
        });
      })
      .catch((error) =>
        console.log({ message: 'Error create new column', error })
      );
  };

  const handleRemoveColumns = async (col: IColumn) => {
    if (isEdit && !demoUser) {
      console.log(col._id, col);
      deleteColumn({
        colId: col._id,
        boardId: board!._id,
      })
        .unwrap()
        .then(() => {
          console.log('REMOVED');
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const updatedColumns = columnsChoosen.filter(
      (column) => col._id.toString() !== column._id.toString()
    );

    setColumnsChoosen(updatedColumns);
    setFormBoard((prev) => {
      if (!prev) return prev;
      return { ...prev, columns: updatedColumns };
    });
  };

  const handleColChange = (col: any, colType: ColType) => {
    if (isEdit && !demoUser) {
      editColumn({
        boardId: board!._id,
        columnId: col._id,
        col: { status: colType },
      })
        .unwrap()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

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
    if (isEdit && !demoUser) {
      editBoard({
        boardId: formBoard?._id,
        board: { ...formBoard, name: enteredName },
      })
        .then(() => dispatch(closeModal()))
        .catch((error) => {
          console.log({ error });
        });
      return;
    } else {
      /*       if (demoUser) {
        dispatch(closeModal());
        dispatch(openModal(<DemoUserModal />));
        return;
      } */
      addBoard({
        uid: user?._id,
        board: { ...formBoard, name: enteredName },
      })
        .unwrap()
        .then(() => dispatch(closeModal()))
        .catch((error) => {
          console.log({ error, message: 'Error Creating New Board' });
        });
    }
  };

  let formElement = (
    <form onSubmit={submitHandler} className="flex-col">
      <div className="form-control flex-col">
        <label htmlFor="name" className="text-light fs-500">
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
        <label className="fw-m fs-500 text-light">Board Columns:</label>
        <div className="columns__wrapper flex">
          {columnsChoosen.map((col) => {
            return (
              <div className="form-control flex" key={col._id.toString()}>
                <TodoDropdown
                  onChange={(colType) => handleColChange(col, colType)}
                  value={col.status}
                />

                <IconRemove
                  onClick={() => handleRemoveColumns(col)}
                  type="button"
                ></IconRemove>
              </div>
            );
          })}
        </div>
        <IconButton
          onClick={addNewColumn}
          type="button"
          textLabel="Add New Column"
          color="primary"
          icon="add"
        />
      </div>

      <PrimaryButton
        color="primary"
        type="submit"
        className="submit-btn"
        textLabel={isEdit ? `Edit '${board?.name}'` : 'Create New Board'}
      />
    </form>
  );
  return (
    <Wrapper
      className={`bg-app create-board flex-col ${
        status === StatusType.PENDING && !isEdit ? 'isLoading' : ''
      }`}
    >
      <h3 className="text-dark fs-600">
        {isEdit ? board?.name : 'Create New Board'}
      </h3>
      {status === StatusType.PENDING && !isEdit ? (
        <div className="loading">
          <LoadingSpinner color="primary" />
        </div>
      ) : (
        formElement
      )}
    </Wrapper>
  );
};

export default CreateNewBoard;
