import { ChangeEvent, MouseEvent } from 'react';
import { ITask } from '../App'
import TodoItem from './TodoItem';

interface Props {
  taskList: ITask[];
  handleDelete: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => void;
  handleCompeteTodo: (
    event: MouseEvent<HTMLInputElement>
  , id: string) => void;
}

const TodoList = ({ 
  taskList, 
  handleDelete,
  handleCompeteTodo,
}:Props) => {
  return (
    <div className='col-11 col-md-6 mt-5'>
      <TodoItem 
        taskList={taskList}
        handleDelete={handleDelete} 
        handleCompeteTodo={handleCompeteTodo}

      />
    </div>
  )
}

export default TodoList;