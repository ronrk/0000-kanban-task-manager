import { IconRemove } from '@/components/ui/icons';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import PrimaryInput from '@/components/ui/primaryInput/PrimaryInput.styled';
import TodoDropdown from '@/components/ui/todoDropdown/TodoDropdown';
import { selectBoardValue, useCreateNewTaskMutation } from '@/store';
import { IColumn, ISubtask, ITask } from '@/types';
import mongoose from 'mongoose';
import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../FormWrapper.styled';

interface IProps {
  task?: ITask;
}

const initialSubtask = {
  title: '',
  isCompleted: false,
  _id: new mongoose.Types.ObjectId(),
};

const CreateNewTask: FC<IProps> = ({ task }) => {
  // const dispatch = useAppDispatch();
  const { currentBoard, boards } = useSelector(selectBoardValue);
  const { columns } = currentBoard!;
  const [subtasks, setSubtasks] = useState<ISubtask[]>(
    task ? task.subtasks : [initialSubtask]
  );
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dropdownValue, setDropdownValue] = useState(columns[0]);
  const [addNewTask] = useCreateNewTaskMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = {
      title,
      description,
      colStatus: dropdownValue.status,
      subtasks,
    };
    await addNewTask({
      boardId: currentBoard?._id,
      colId: dropdownValue._id,
      task,
    })
      .unwrap()
      .then((data) => {
        console.log({ data });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const onDropdownChange = (value: IColumn) => {
    setDropdownValue(value);
  };

  return (
    <Wrapper className="bg-app create-task">
      <h3 className="text-dark fs-600">
        {task ? `Edit ${task.title}` : 'Add New Task'}
      </h3>
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="form-control flex-col">
          <label htmlFor="title" className="text-light fs-500 fw-m">
            Title:
          </label>

          <PrimaryInput
            fullWidth
            type="text"
            placeholder="e.g Web Design"
            className="text-dark fs-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // onBlur={handleNameBlur}
            // onFocus={handleNameFocus}
            required
          />
        </div>
        <div className="form-control flex-col">
          <label htmlFor="title" className="text-light fs-500 fw-m">
            Description:
          </label>
          <textarea
            className="text-dark fs-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little"
          ></textarea>
        </div>
        <div className="subtasks form-control flex-col">
          <label htmlFor="title" className="text-light fs-500 fw-m">
            Subtasks:
          </label>
          {subtasks.map((sub, id) => {
            return (
              <div key={sub._id.toString()} className="subtask flex">
                <PrimaryInput
                  fullWidth
                  type="text"
                  placeholder="e.g Web Design"
                  className="text-dark fs-400"
                  value={sub.title}
                  onChange={(e) =>
                    setSubtasks((prev) => {
                      return prev.map((val) =>
                        val._id === sub._id
                          ? { ...val, title: e.target.value }
                          : val
                      );
                    })
                  }
                  // onBlur={handleNameBlur}
                  // onFocus={handleNameFocus}
                  required
                />
                <IconRemove
                  onClick={() => {
                    // dispatch(deleteSubtask(sub.id));
                  }}
                  type="button"
                ></IconRemove>
              </div>
            );
          })}

          <PrimaryButton
            type="button"
            fullWidth
            color="primary-light"
            onClick={() => {
              setSubtasks((prev) => [
                ...prev,
                { ...initialSubtask, _id: new mongoose.Types.ObjectId() },
              ]);
            }}
            className="fs-400"
          >
            Add New Subtask
          </PrimaryButton>
        </div>
        <div className="dropdown form-control flex-col">
          <label htmlFor="" className="fs-500 text-light">
            Column:
          </label>
          <TodoDropdown
            onChange={(col) => onDropdownChange(col)}
            value={dropdownValue.status}
            columns={columns}
            col={dropdownValue}
          />
        </div>

        <PrimaryButton
          fullWidth
          color="primary"
          type="submit"
          className="submit-btn fs-400"
        >
          {task ? 'Save Changes' : 'Create Task'}
        </PrimaryButton>
      </form>
    </Wrapper>
  );
};

export default CreateNewTask;
