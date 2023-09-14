import { MouseEvent } from "react";

interface IForm {
  handleTask: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  setTask: (value: string) => void;
  task: string;
}

const Form = ({handleTask, setTask, task}: IForm) => {
  return (
    <form className="col-12 col-md-6 bg-light-blue d-flex justify-content-center p-2">
      <div className="form-group">
        <label htmlFor="task" className='pb-2 fs-6 fw-bold'>Enter Todo Name:</label><br/>
        <div className="d-flex">
          <input 
              type="text" 
              name="task" 
              id="task"
              className='me-2 rounded ps-2 px-5 py-2' 
              onChange={(e) => setTask(e.target.value)}
              value={task}
          />
          <button onClick={(e) => handleTask(e)} className='btn btn-primary'>Add Todo</button>
        </div>
      </div>
    </form>
  )
}

export default Form