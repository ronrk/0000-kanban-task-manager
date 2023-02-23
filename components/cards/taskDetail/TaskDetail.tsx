import CreateNewTask from '@/components/forms/createNewTask/CreateNewTask';
import DeleteBoard from '@/components/forms/deleteBoard/DeleteBoard';
import CheckboxInput from '@/components/ui/checkboxInput/CheckboxInput';
import MenuDropdown from '@/components/ui/menuDropdown/MenuDropdown';
import TodoDropdown from '@/components/ui/todoDropdown/TodoDropdown';
import { openModal, selectBoardValue, useAppDispatch } from '@/store';
import { ColType, IColumn, ISubtask, ITask } from '@/types';
import mongoose from 'mongoose';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from '../../forms/FormWrapper.styled';

interface IProps {
  task: ITask;
  colId: mongoose.Types.ObjectId;
}

const TaskDetail: FC<IProps> = ({ task, colId }) => {
  const dispatch = useAppDispatch();
  const { currentBoard } = useSelector(selectBoardValue);
  const { columns } = currentBoard!;
  let currentColumn = columns.find((col) => col._id === colId);
  const [dropdownValue, setDropdownValue] = useState(currentColumn);
  const [subtasks, setSubtasks] = useState(task.subtasks);

  let dropdownOptions: ColType[] = columns.map((col) => col.status);

  const onDropdownChange = (value: IColumn) => {
    setDropdownValue(value);
    const newTask: ITask = { ...task };
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

  if (!currentBoard || !currentColumn || !dropdownValue) {
    return <></>;
  }

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
          Subtasks ({0} of {3 + 0})
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
