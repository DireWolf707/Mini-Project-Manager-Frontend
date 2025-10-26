import { Button } from "@/components/ui/button"
import { api } from "@/lib/apiClient"
import { TrashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router"

const Projects = () => {
  const { user } = useOutletContext()
  const [projects, setProjects] = useState([])

  const getProjects = () =>
    api
      .get("/api/projects", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then(({ data }) => setProjects(data))
      .catch(console.log)

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <div className="grid grid-cols-4 mx-auto gap-4 p-4 m-4 w-full">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col border-2 rounded-2xl p-4 gap-2"
        >
          <div className="flex items-center justify-center border-b-2 border-red-400 gap-2">
            <Link to={`/projects/${project.id}`} className="text-center">
              {project.title}
            </Link>

            <Button
              size="icon"
              variant="ghost"
              onClick={() =>
                api
                  .delete(`/api/projects/${project.id}`, {
                    headers: {
                      Authorization: `Bearer ${user.accessToken}`,
                    },
                  })
                  .then(() => getProjects())
                  .catch(console.log)
              }
            >
              <TrashIcon />
            </Button>
          </div>

          <p>{project.description}</p>
          <span className="text-xs text-right">
            Created On: {new Date(project.creationDate).toDateString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Projects
