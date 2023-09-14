import { MouseEvent } from 'react';
import { ITask } from '../App'
import TodoItem from './TodoItem';

interface Props {
 taskList: ITask[];
 handleDelete: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => void
}

const TodoList = ({ taskList, handleDelete }:Props) => {
  return (
    <div className='col-11 col-md-6 mt-5'>
      <TodoItem 
        taskList={taskList}
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default TodoList;