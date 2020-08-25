import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddRoomModal/FormField";
// import { Gender, Patient } from "../types";
import { CreateRoomInput } from "../../src/API";
/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type RoomFormValues = Omit<CreateRoomInput, "id" | "owner">;
interface Props {
  onSubmit: (values: RoomFormValues) => void;
  onCancel: () => void;
  room: {
    title: string;
    description?: string;
  };
}

export const UpdateRoomForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  room,
}) => {
  return (
    <Formik
      initialValues={{
        title: room.title,
        description: room.description,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.title) {
          errors.name = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Title"
              placeholder="Title"
              name="title"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateRoomForm;
