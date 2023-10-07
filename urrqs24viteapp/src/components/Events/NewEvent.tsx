/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import {
  ErrorT,
  createNewEvent,
  queryClient,
} from "../../helper/httpRequest.js";
import ErrorBlock from "../UI/ErrorBlock.js";

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  const handleSubmit = (formData: any) => {
    mutate({ event: formData });
  };

  return (
    <div id="modal">
      <Modal onClose={() => navigate("../")}>
        <EventForm onSubmit={handleSubmit}>
          {isPending && "Submitting..."}
          {!isPending && (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Create
              </button>
            </>
          )}
        </EventForm>
        {isError && (
          <ErrorBlock
            title="Failed to create event"
            message={
              (error as ErrorT)?.info?.message ||
              "Failed to create event. Please check your inputs and try again later."
            }
          />
        )}
      </Modal>
    </div>
  );
}
