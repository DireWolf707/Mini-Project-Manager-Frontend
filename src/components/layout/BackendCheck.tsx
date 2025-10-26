import { api } from "@/lib/apiClient"
import { useEffect, useState } from "react"
import { Outlet } from "react-router"

const BackendCheck = () => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    api
      .get("/health")
      .then(() => setActive(true))
      .catch(console.log)
  }, [])

  return (
    <>
      {active && <Outlet />}
      {!active && (
        <div className="flex h-screen w-screen bg-black text-white m-auto">
          <div className="m-auto text-2xl font-extrabold text-red-500">
            Server waking up, please wait ~50 sec before refresh
          </div>
        </div>
      )}
    </>
  )
}

export default BackendCheck
