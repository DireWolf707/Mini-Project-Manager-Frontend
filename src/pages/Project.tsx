import CreateTaskForm from "@/components/form/CreateTaskForm"
import { Checkbox } from "@/components/ui/checkbox"
import { api } from "@/lib/apiClient"
import { useEffect, useState } from "react"
import { Link, useOutletContext, useParams } from "react-router"

const Project = () => {
  const { id } = useParams()
  const { user } = useOutletContext()
  const [project, setProject] = useState(null)

  const getProject = () =>
    api
      .get(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then(({ data }) => setProject(data))
      .catch(console.log)

  useEffect(() => {
    getProject()
  }, [])

  return (
    <div>
      {project && (
        <CreateTaskForm getProject={getProject} projectId={project.id} />
      )}

      <div className="grid grid-cols-4 mx-auto gap-4 p-4 m-4 w-full">
        {project &&
          project.tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col border-2 rounded-2xl p-4 gap-2"
            >
              <div className="border-b-2 border-red-400 flex items-center justify-center gap-2">
                {task.title}

                <Checkbox
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 hover:cursor-pointer"
                  checked={task.isCompleted}
                  onClick={() => {
                    api
                      .put(
                        `/api/tasks/${task.id}`,
                        {
                          ...task,
                          isCompleted: !task.isCompleted,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${user.accessToken}`,
                          },
                        }
                      )
                      .then(() => getProject())
                      .catch(console.log)
                  }}
                />
              </div>

              {task.dueDate && (
                <span className="text-xs text-right">
                  Due On: {new Date(task.dueDate).toDateString()}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Project
