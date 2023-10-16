import { MouseEvent } from "react"

export interface IEvent extends MouseEvent<HTMLButtonElement,globalThis.MouseEvent> {}

export interface ITask { 
  id: string
  task: string
  completed: boolean
}

export const textCapitalize = (item: ITask) => {
  return `${item.task[0].toLocaleUpperCase()}${item.task.slice(1)}`
}

export function filterTasks(tasks: ITask[], id: string) {
  return tasks.filter((item) => item.id !== id)
}