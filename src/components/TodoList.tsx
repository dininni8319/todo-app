import { ITask, IEvent } from '../utils'
import TodoItem from './TodoItem';

interface IProps {
  taskList: ITask[];
  handleDelete: (
    event: IEvent,
    id: string
  ) => void;
  handleCompeteTodo: (
    event: IEvent
  , id: string) => void;
}

const TodoList = ({ 
  taskList, 
  handleDelete,
  handleCompeteTodo,
}:IProps) => {
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