import CreateNewTask from '@/components/forms/createNewTask/CreateNewTask';
import DeleteBoard from '@/components/forms/deleteBoard/DeleteBoard';
import CheckboxInput from '@/components/ui/checkboxInput/CheckboxInput';
import MenuDropdown from '@/components/ui/menuDropdown/MenuDropdown';
import TodoDropdown from '@/components/ui/todoDropdown/TodoDropdown';
import {
  openModal,
  selectBoardValue,
  selectTaskValue,
  useAppDispatch,
  useChangeSubtaskStatusMutation,
  useChangeTaskColumnMutation,
} from '@/store';
import { IColumn, ISubtask, ITask } from '@/types';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../../forms/FormWrapper.styled';

export interface ITaskDetail {
  task: ITask;
}

const TaskDetail: FC<ITaskDetail> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { currentBoard } = useSelector(selectBoardValue);
  const { columns } = currentBoard!;
  const { currentColumn } = useSelector(selectTaskValue);
  const [dropdownValue, setDropdownValue] = useState(currentColumn);
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [changeTaskColumn] = useChangeTaskColumnMutation();
  const [changeSubtaskStatus] = useChangeSubtaskStatusMutation();

  const onDropdownChange = (value: IColumn) => {
    setDropdownValue(value);
    const newTask: ITask = { ...task };

    changeTaskColumn({
      taskId: task._id,
      colId: currentColumn?._id,
      newColId: value._id,
    })
      .unwrap()
      .then((data) => {
        console.log({ data });
      })
      .catch((error) => {
        console.log({ error });
      });
    // dispatch(editTask(newTask));
  };
  const onMenuClick = (option: string) => {
    if (option === 'delete') {
      dispatch(openModal(<DeleteBoard type={'task'} task={task} />));
      return;
    }
    if (option === 'edit') {
      dispatch(openModal(<CreateNewTask task={task} />));
    }
  };

  const handleSubtaskChange = async (sub: ISubtask) => {
    await changeSubtaskStatus({
      colId: dropdownValue?._id,
      taskId: task._id,
      subtaskId: sub._id,
    })
      .unwrap()
      .catch((error) => {
        console.log({ error });
      });

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

  if (!currentBoard || !currentColumn || !dropdownValue) {
    return <></>;
  }

  let { pendingSubtasks, completedSubtasks } = subtasks.reduce(
    (acc, sub) => {
      if (sub.isCompleted) {
        acc.completedSubtasks += 1;
      } else {
        acc.pendingSubtasks += 1;
      }
      return acc;
    },
    { pendingSubtasks: 0, completedSubtasks: 0 }
  );

  return (
    <Wrapper className="task-detail bg-box flex-col">
      <header className="flex">
        <h3 className="fs-600 fw-m text-dark">{task.title}</h3>
        <MenuDropdown
          cb={onMenuClick}
          value={null}
          options={['edit', 'delete']}
        />
      </header>
      <p className="fs-500 text-light">{task.description}</p>
      <div className="checkbox-wrapper">
        <label htmlFor="" className="text-light fs-400">
          Subtasks ({completedSubtasks} of {pendingSubtasks + completedSubtasks}
          )
        </label>
        {subtasks.map((sub) => {
          return (
            <CheckboxInput
              isChecked={sub.isCompleted}
              key={sub._id.toString()}
              inputId={sub._id.toString()}
              inputLabel={sub.title}
              onChangeCb={() => {
                handleSubtaskChange(sub);
              }}
            />
          );
        })}
      </div>
      <div className="dropdown">
        <label htmlFor="" className="text-light">
          Current Status
        </label>
        <TodoDropdown
          onChange={(col) => onDropdownChange(col)}
          value={dropdownValue?.status}
          columns={columns}
          col={dropdownValue}
        />
      </div>
    </Wrapper>
  );
};

export default TaskDetail;
