import { useState, useEffect, MouseEvent } from 'react'
import {v4 as uuidv4} from 'uuid';
import './App.css'
import TodoList from './components/TodoList'
import Form from './components/Form'

export interface ITask { 
  id: string; 
  task: string;
  completed: boolean;
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
      const newTask = { id: uuidv4(), task: task, completed: false }; // Set the task property to the current value of task state
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

  const handleCompeteTodo = (
    event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
    , id: string
  ) => {
    event.preventDefault()
    const pars = localStorage.getItem('tasks') || String([])
    const tasks:ITask[] | [] = JSON.parse(pars)
    const findTaskAndComplete = tasks.map(task => {
      if (task.id === id ) {
        task.completed = !task.completed
      }
      return task
    })
    if (findTaskAndComplete) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
      setTaskList(findTaskAndComplete)
    }
  }

  
  return (
    <div className='class-custom d-flex flex-column justify-content-center'>
      <div className='row'>
        <div className="col-md-12 d-flex justify-content-center">
            <Form 
              handleTask={handleTask}
              task={task}
              setTask={setTask}
            />
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center">
          <div className="col-12 col-md-6 d-flex justify-content-center p-4 bg-light-blue">
              <TodoList 
                taskList={taskList} 
                handleDelete={handleDelete}
                handleCompeteTodo={handleCompeteTodo}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
