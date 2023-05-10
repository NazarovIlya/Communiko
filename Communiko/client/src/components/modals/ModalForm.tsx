import { observer } from "mobx-react-lite";
import { Button, Modal } from "semantic-ui-react";
import { repository } from "../../repository/Repository";

export default observer(function ModalContainer() {
  const { modalRepo } = repository;
  return (
    <Modal open={modalRepo.modal.open} onClose={modalRepo.hide} size='mini'>
      <Modal.Content>
        {modalRepo.modal.content}
      </Modal.Content>
    </Modal>
  )
})