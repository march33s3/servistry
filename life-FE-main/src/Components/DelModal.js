import Modal from "react-bootstrap/Modal";

function DelModal(props) {
  return (
    <div className="deleteModalMain">
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="deleteModal">
          <h4>Delete Adoption Registry</h4>
          <p>Are you sure ?</p>
          <div className="d-flex gap-5 justify-content-center mt-4">
            <button className="button1 px-4 px-md-5">Yes</button>
            <button className="button1 px-4 px-md-5" onClick={props.onHide}>No</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DelModal;
