import Hello from "../../components/Hello";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function OpenCountry() {
  return (
    <Modal>
      <Modal.Open opens="country">
        <Button variation="primary">Open Page</Button>
      </Modal.Open>
      <Modal.Window name="country">
        <Hello />
      </Modal.Window>
    </Modal>
  );
}
