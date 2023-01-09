import userEvent from "@testing-library/user-event"
import React from "react"
import { render, screen } from "testing"
import PasswordField from "./PasswordField"

test("renders", async () => {
  render(<PasswordField label="field1" value="" onChange={() => {}} />)
})

test("edit", async () => {
  const user = userEvent.setup()

  render(<PasswordField label="field1" value="" onChange={() => {}} edit />)

  await user.click(screen.getByRole("button"))
})