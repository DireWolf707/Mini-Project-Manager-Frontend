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
  dueDate: "",
}

const CreateTaskForm = ({ projectId, getProject }) => {
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
      .post(
        `/api/projects/${projectId}/tasks`,
        { ...form, dueDate: form.dueDate === "" ? null : form.dueDate },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then(() => {
        getProject()
        setForm(defaultForm)
      })
      .catch(console.log)
  }

  return (
    <form onSubmit={handleSubmit} className="m-auto w-full max-w-md px-8">
      <FieldSet>
        <FieldLegend className="text-center text-red-500">
          Create Task
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
            <FieldLabel>Due Date</FieldLabel>
            <Input
              name="dueDate"
              type="date"
              value={form.dueDate}
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

export default CreateTaskForm
