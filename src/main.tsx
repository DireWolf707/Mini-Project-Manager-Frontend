import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "./pages/Home.tsx"
import Navbar from "./components/layout/Navbar.tsx"
import BackendCheck from "./components/layout/BackendCheck.tsx"
import Login from "./pages/Login.tsx"
import Signup from "./pages/Signup.tsx"
import Projects from "./pages/Projects.tsx"

const router = createBrowserRouter([
  {
    Component: BackendCheck,
    children: [
      {
        Component: Navbar,
        children: [
          { index: true, Component: Home },
          { path: "login", Component: Login },
          { path: "signup", Component: Signup },
          { path: "projects", Component: Projects },
        ],
      },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
)
