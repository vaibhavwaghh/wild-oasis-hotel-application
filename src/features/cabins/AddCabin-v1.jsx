import { useState } from "react";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setisOpenModal] = useState(false);
  function handleClick() {
    setisOpenModal(!isOpenModal);
  }
  return (
    <div>
      <Button onClick={handleClick}>Add new Cabin</Button>
      {isOpenModal && (
        <Modal onClose={() => setisOpenModal(false)}>
          <CreateCabinForm onCloseModal={() => setisOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
