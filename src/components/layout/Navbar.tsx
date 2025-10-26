import { Outlet, Link, useNavigate } from "react-router"
import { Button } from "../ui/button"
import { useState } from "react"

const Navbar = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  return (
    <div className="bg-black h-screen w-screen flex flex-col text-white overflow-auto">
      <div className="flex p-4 border-b-2 border-red-500 items-center">
        <Link to="/" className="grow text-xl font-bold text-red-500">
          Project Manager
        </Link>

        <div className="flex gap-2 items-center">
          {user ? (
            <>
              <Link to="/projects">Projects</Link>
              <Link
                to="/create-project"
                className="border-red-500 border-2 px-2 rounded"
              >
                Create Project
              </Link>
              <Button
                className="hover:cursor-pointer"
                onClick={() => {
                  navigate("/")
                  setUser(null)
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border-red-500 border-2 px-2 rounded-sm"
              >
                Login
              </Link>
              <Link to="/signup" className="bg-red-600 px-2 rounded">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      <Outlet context={{ user, setUser }} />
    </div>
  )
}

export default Navbar
