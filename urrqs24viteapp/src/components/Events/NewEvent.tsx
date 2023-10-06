/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";

export default function NewEvent() {
  const navigate = useNavigate();

  const handleSubmit = (formData: any) => {
    console.log(formData);
  };

  return (
    <div id="modal">
      <Modal onClose={() => navigate("../")}>
        <EventForm onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </EventForm>
      </Modal>
    </div>
  );
}
