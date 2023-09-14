import { ITask } from '../App'
import trashSVG from '../assets/trash-svg.svg'
import { MouseEvent } from 'react';

interface Props {
 taskList: ITask[];
 handleDelete: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => void
}

const TodoItem = ({taskList ,handleDelete}:Props) =>{
  const textCapitalize = (item: ITask) => {
    return `${item.task[0].toLocaleUpperCase()}${item.task.slice(1)}`
  }

  return (
    <>
      {taskList?.map((item: ITask) => {
        return (
          <div className="card mt-2" key={item.id}>
            <div className="card-body d-flex justify-content-between">
              <h5>{textCapitalize(item)}</h5>
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