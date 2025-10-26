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
import { useNavigate } from "react-router"

const defaultForm = {
  email: "",
  name: "",
  password: "",
}

const Signup = () => {
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
      .post("/api/auth/register", form)
      .then(() => {
        setForm(defaultForm)
        navigate("/login")
      })
      .catch(console.log)
  }

  return (
    <form onSubmit={handleSubmit} className="m-auto w-full max-w-md px-8">
      <FieldSet>
        <FieldLegend className="text-center text-red-500">
          User Signup
        </FieldLegend>

        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              name="email"
              type="email"
              value={form.email}
              required
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              name="name"
              value={form.name}
              required
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              name="password"
              value={form.password}
              required
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

export default Signup
