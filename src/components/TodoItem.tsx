import { ITask } from '../App'
import trashSVG from '../assets/trash-svg.svg'
import { MouseEvent } from 'react';

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

const TodoItem = ({
  taskList ,
  handleDelete, 
  handleCompeteTodo,
}:Props) => {

  const textCapitalize = (item: ITask) => {
    return `${item.task[0].toLocaleUpperCase()}${item.task.slice(1)}`
  }

  return (
    <>
      {taskList?.map((item: ITask) => {
        return (
          <div 
            className={`card mt-2 ${item.completed? "bg-success" : "bg-warning"}`} 
            key={item.id}
          >
            <div className="card-body d-flex justify-content-between align-items-end">
              <div className="d-flex align-items-center">
                <input 
                  type="checkbox" 
                  name="completed"
                  id="completed" 
                  checked={item.completed}
                  onClick={(e) => handleCompeteTodo(e, item.id)}
                />
                <h5 className='ms-2 mb-0'>{textCapitalize(item)}</h5>
              </div>
              <button
                onClick={(e) => handleDelete(e, item.id)}
                className='btn-custom'
              >
                <img 
                  src={trashSVG} 
                  alt="trash icon" 
                  width={25} 
                  height={25} 
                />
              </button>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TodoItem