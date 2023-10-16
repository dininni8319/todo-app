import { ITask, IEvent } from '../utils'
import trashSVG from '../assets/trash-svg.svg'
import { textCapitalize } from '../utils';

interface IProps {
  taskList: ITask[];
  handleDelete: (
    event: IEvent,
    id: string
  ) => void
  handleCompeteTodo: (
    event: IEvent
  , id: string) => void;
}

const TodoItem = ({
  taskList ,
  handleDelete, 
  handleCompeteTodo,
}:IProps) => {

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
                  //@ts-ignore
                  onClick={(e) => handleCompeteTodo(e, item.id)}
                />
                <h5 className='ms-2 mb-0'>{textCapitalize(item)}</h5>
              </div>
              <button
              //@ts-ignore
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