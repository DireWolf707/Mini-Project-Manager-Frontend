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
  title: "",
  description: "",
}

const CreateProject = () => {
  const { user } = useOutletContext()
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
      .post("/api/projects", form, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then(() => navigate("/projects"))
      .catch(console.log)
  }

  return (
    <form onSubmit={handleSubmit} className="m-auto w-full max-w-md px-8">
      <FieldSet>
        <FieldLegend className="text-center text-red-500">
          Create Project
        </FieldLegend>

        <FieldGroup>
          <Field>
            <FieldLabel>Title</FieldLabel>
            <Input
              name="title"
              required
              minLength={3}
              maxLength={100}
              value={form.title}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel>Description</FieldLabel>
            <Input
              name="description"
              maxLength={500}
              value={form.description}
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

export default CreateProject
