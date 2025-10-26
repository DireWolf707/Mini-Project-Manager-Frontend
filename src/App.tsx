import axios from "axios"
import { useEffect, useState } from "react"
import type { Task } from "../types/task"

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    axios
      .get<Task[]>("http://localhost:5228/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((error) => console.error("Error fetching tasks:", error))
  }, [])

  return (
    <div>
      {tasks.map((task) => (
        <div>
          <span>{task.id}</span>
          <span>{task.description}</span>
          <span>{task.isCompleted}</span>
        </div>
      ))}
    </div>
  )
}

export default App
