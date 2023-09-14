import { useState, useEffect, MouseEvent } from 'react'
import {v4 as uuidv4} from 'uuid';
import './App.css'
import TodoList from './components/TodoList'
import Form from './components/Form'

export interface ITask { 
  id: string; 
  task: string 
}

function filterTasks(tasks: ITask[], id: string) {
  return tasks.filter((item) => item.id !== id)
}

const App = () => {

  const [task, setTask] = useState<string>('');
  const [taskList, setTaskList] = useState<ITask[]>([]);

  const handleTask = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (task.length >= 2) {
      event.preventDefault()
      const newTask = { id: uuidv4(), task: task }; // Set the task property to the current value of task state
      const tasks = (taskList: ITask[]) => [newTask, ...taskList]

      localStorage.setItem('tasks',JSON.stringify(tasks(taskList)))
      setTaskList((prev) => (tasks(prev)));
      setTask('');
      return 
    }
    return alert("The task must at least two characters long")
  }

  useEffect(() => {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      setTaskList(JSON.parse(tasks))
    }
  }, [])


  const handleDelete = 
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: string) => {
      event.preventDefault()
      const pars = localStorage.getItem('tasks') || String([])
      const tasks:ITask[] | [] = JSON.parse(pars)
      
      localStorage.setItem('tasks', JSON.stringify(filterTasks(tasks, id)))
      const filteredTask = filterTasks(taskList, id)
      setTaskList(filteredTask)
  }

  // To be implemented
  const handleEditText = (e, id: string) => {
    e.preventDefault()
    const editedTask = taskList.map((item) => {
      if (item.id === id) {
        return { ...item, task: task }
      }
      return item
    })
    setTaskList(editedTask)
  } 
  
  return (
    <div className='class-custom'>
      <div className='row'>
        <div className="col-md-12 d-flex justify-content-center mt-5">
            <Form 
              handleTask={handleTask}
              task={task}
              setTask={setTask}
            />
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center">
          <div className="col-12 col-md-6 d-flex justify-content-center p-2 bg-light-blue">
              <TodoList 
                taskList={taskList} 
                handleDelete={handleDelete}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
