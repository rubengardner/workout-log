import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SetCreateForm from "./pages/sets/SetCreateForm";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function CreateSetModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {
        id,
        setWorkout,
        setSets
      } = props;
      const currentUser = useCurrentUser();
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Create set
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a set</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SetCreateForm
            workout={id}
            setWorkout={setWorkout}
            setSets={setSets}
            profile_id={currentUser.profile_id} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            <i class="fa-solid fa-xmark"></i>
            </Button>
            <Button variant="primary" onClick={handleClose}>
            <i className="fa-solid fa-plus"></i>
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default CreateSetModal;