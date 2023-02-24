import CheckboxInput from '@/components/ui/checkboxInput/CheckboxInput';
import IconButton from '@/components/ui/iconButton/IconButton.styled';
import { IconRemove } from '@/components/ui/icons';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import PrimaryInput from '@/components/ui/primaryInput/PrimaryInput.styled';
import TodoDropdown from '@/components/ui/todoDropdown/TodoDropdown';
import {
  closeModal,
  selectBoardValue,
  selectTaskValue,
  useAppDispatch,
  useCreateNewTaskMutation,
  useEditTaskMutation,
  useRemoveSubtaskMutation,
} from '@/store';
import { IColumn, ISubtask, ITask } from '@/types';
import mongoose from 'mongoose';
import { FC, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../FormWrapper.styled';

export interface ICreateNewTask {
  task?: ITask;
}

const initialSubtask = {
  title: '',
  isCompleted: false,
  _id: new mongoose.Types.ObjectId(),
};

const CreateNewTask: FC<ICreateNewTask> = ({ task }) => {
  const { currentBoard } = useSelector(selectBoardValue);
  const { currentColumn } = useSelector(selectTaskValue);
  const [loading, setLoading] = useState(false);
  const { columns } = currentBoard!;
  const [subtasks, setSubtasks] = useState<ISubtask[]>(
    task ? task.subtasks : [initialSubtask]
  );
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [dropdownValue, setDropdownValue] = useState(
    task ? currentColumn : columns[0]
  );
  const [addNewTask] = useCreateNewTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [deleteSubtask] = useRemoveSubtaskMutation();
  const dispatch = useAppDispatch();
  const originalColumn = (() => currentColumn)();

  const handleSubtaskChange = (sub: ISubtask) => {
    setSubtasks((prev) => {
      return prev.map((subtask) => {
        if (subtask._id === sub._id) {
          return { ...sub, isCompleted: !sub.isCompleted };
        } else {
          return subtask;
        }
      });
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (task) {
      await editTask({
        colId: dropdownValue?._id,
        task: {
          title,
          description,
          colStatus: dropdownValue?.status,
          _id: task._id,
        },
        subtasks,
        originalColumn,
      })
        .unwrap()
        .then(() => {
          setLoading(false);
          dispatch(closeModal());
        })
        .catch((error) => {
          setLoading(false);
          console.log({ error });
        });
      return;
    }

    if (!task) {
      const formTask = {
        title,
        description,
        colStatus: dropdownValue?.status,
        subtasks: subtasks.map((sub) => ({
          title: sub.title,
          isCompleted: sub.isCompleted,
        })),
      };

      await addNewTask({
        colId: dropdownValue?._id,
        task: formTask,
      })
        .unwrap()
        .then(() => {
          dispatch(closeModal());
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log({ error });
        });
    }
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
          <label htmlFor="title" className="text-light fs-400 fw-m">
            Description:
          </label>
          <textarea
            className="text-dark fs-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little"
          ></textarea>
        </div>
        <label htmlFor="title" className="text-light fs-400 fw-m">
          Subtasks:
        </label>
        <div className="subtasks form-control flex-col">
          {subtasks.map((sub) => {
            return (
              <div
                key={sub._id.toString()}
                className={`subtask flex ${sub.isCompleted ? 'checked' : ''}`}
              >
                <PrimaryInput
                  fullWidth
                  type="text"
                  placeholder="e.g Web Design - Subtask"
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
                <CheckboxInput
                  isChecked={sub.isCompleted}
                  inputId={sub.title}
                  onChangeCb={() => handleSubtaskChange(sub)}
                />
                <IconRemove
                  onClick={() => {
                    if (task) {
                      deleteSubtask({
                        colId: currentColumn?._id,
                        taskId: task._id,
                        subId: sub._id,
                      })
                        .unwrap()
                        .then((data) => {
                          console.log({ data });
                        })
                        .catch((error) => {
                          console.log({ error });
                        });
                    }
                    setSubtasks((prev) =>
                      prev.filter((val) => val._id !== sub._id)
                    );
                  }}
                  type="button"
                ></IconRemove>
              </div>
            );
          })}
        </div>
        <div className="actions flex">
          <div className="dropdown form-control flex-col">
            <label htmlFor="" className="fs-500 text-light">
              Column:
            </label>
            <TodoDropdown
              onChange={(col) => onDropdownChange(col)}
              value={dropdownValue!.status}
              columns={columns}
              col={dropdownValue!}
            />
          </div>
          <IconButton
            className="icon-btn"
            type="button"
            onClick={() => {
              setSubtasks((prev) => [
                ...prev,
                { ...initialSubtask, _id: new mongoose.Types.ObjectId() },
              ]);
            }}
            textLabel="Add New Subtask"
            color="primary"
            icon="add"
          />
        </div>
        <PrimaryButton
          color="primary"
          type="submit"
          className="submit-btn fs-400"
          disabled={loading}
          textLabel={task ? 'Save Changes' : 'Create Task'}
        />
      </form>
    </Wrapper>
  );
};

export default CreateNewTask;
