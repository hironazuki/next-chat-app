import React from "react";
import { Modal, Segment } from "semantic-ui-react";
// import AddPatientForm, { PatientFormValues } from "./AddPatientForm";
import UpdateRoomForm, { RoomFormValues } from "./UpdateRoomForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: RoomFormValues) => void;
  error?: string;
  room: {
    title: string;
    description?: string;
  };
}

const UpdateRoomModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  room,
}: Props) => (
  <Modal
    open={modalOpen}
    onClose={onClose}
    closeIcon
    size="small"
    style={{ zIndex: 1201 }}
  >
    <Modal.Header>チャットルームの編集</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <UpdateRoomForm onSubmit={onSubmit} onCancel={onClose} room={room} />
    </Modal.Content>
  </Modal>
);

export default UpdateRoomModal;
