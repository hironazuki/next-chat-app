import React from "react";
import { Modal, Segment } from "semantic-ui-react";
// import AddPatientForm, { PatientFormValues } from "./AddPatientForm";
import AddRoomForm, { RoomFormValues } from "./AddRoomForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: RoomFormValues) => void;
  error?: string;
}

const AddRoomModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal
    open={modalOpen}
    onClose={onClose}
    closeIcon
    size="small"
    style={{ zIndex: 1201 }}
  >
    <Modal.Header>チャットルームの追加</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddRoomForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddRoomModal;
