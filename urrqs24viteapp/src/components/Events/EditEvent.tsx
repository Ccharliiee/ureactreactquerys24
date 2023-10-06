/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.js";
import EventForm from "./EventForm.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const handleSubmit = (formData: any) => {
    console.log(formData);
  };

  const handleClose = () => {
    navigate("../");
  };

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={undefined} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
