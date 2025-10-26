import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/apiClient"
import { useState } from "react"
import { useNavigate, useOutletContext } from "react-router"

const defaultForm = {
  email: "",
  password: "",
}

const Login = () => {
  const { setUser } = useOutletContext()
  const [form, setForm] = useState(defaultForm)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    api
      .post("/login", form)
      .then(({ data: { accessToken } }) => {
        setForm(defaultForm)
        api
          .get("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(({ data }) => {
            navigate("/projects")
            setUser({ ...data, accessToken })
          })
      })
      .catch(console.log)
  }

  return (
    <form onSubmit={handleSubmit} className="m-auto w-full max-w-md px-8">
      <FieldSet>
        <FieldLegend className="text-center text-red-500">
          User Login
        </FieldLegend>

        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </Field>
        </FieldGroup>

        <Button type="submit" className="hover:cursor-pointer">
          Submit
        </Button>
      </FieldSet>
    </form>
  )
}

export default Login
