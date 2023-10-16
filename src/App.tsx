import { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'
import TodoList from './components/TodoList'
import Form from './components/Form'
import { filterTasks, ITask, IEvent } from './utils'


const App = () => {
  const [task, setTask] = useState<string>('')
  const [taskList, setTaskList] = useState<ITask[]>([])

  const handleTask = (event: IEvent) => {
    if (task.length >= 2) {
      event.preventDefault()
      const newTask = { id: uuidv4(), task: task, completed: false } // Set the task property to the current value of task state
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


  const handleDelete = (event: IEvent, id: string) => {
      event.preventDefault()
      const pars = localStorage.getItem('tasks') || String([])
      const tasks:ITask[] | [] = JSON.parse(pars)

      localStorage.setItem('tasks', JSON.stringify(filterTasks(tasks, id)))
      const filteredTask = filterTasks(taskList, id)
      setTaskList(filteredTask)
  }


  const handleCompeteTodo = (
    //eslint-disable-line
    //@ts-ignore
    event: IEvent, 
    id: string
  ) => {
    // event.preventDefault()
    const storedTasks: ITask[]= JSON.parse(localStorage.getItem('tasks') || '[]')
    
    const updatedTasks = storedTasks.map((task: ITask) => {
      if (task.id === id) {
        task.completed = !task.completed
      }
      return task
    });
    
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    setTaskList(updatedTasks)
  };
 
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
