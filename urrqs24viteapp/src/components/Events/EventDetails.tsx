import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Header from "../Header.tsx";
import {
  getEvent,
  deleteEvent,
  queryClient,
  ErrorT,
} from "../../helper/httpRequest.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import Modal from "../UI/Modal.tsx";
import { formattedDate } from "../../helper/formaters.tsx";

export default function EventDetails() {
  const [openDelMod, setOpenDelMod] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => getEvent({ signal, id: params.id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });
  const deleteInitHandler = () => {
    setOpenDelMod(true);
  };

  const deleteCancelHandler = () => {
    setOpenDelMod(false);
  };

  const deleteHandler = () => {
    mutate({ id: params.id! });
  };

  let eventContent;

  if (isPending) {
    eventContent = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    eventContent = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            (error as ErrorT).info?.message ||
            "Failed to fetch event data, please try again later."
          }
        />
      </div>
    );
  }

  if (data) {
    eventContent = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={deleteInitHandler}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate(data.date)} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {openDelMod && (
        <div id="modal">
          <Modal onClose={deleteCancelHandler}>
            <h2>Are you sure?</h2>
            <p>
              Do you really want to delete this event? This action cannot be
              undone.
            </p>
            <div className="form-actions">
              {isPendingDeletion && (
                <p>Deleting {data.title}, please wait...</p>
              )}
              {!isPendingDeletion && (
                <>
                  <button onClick={deleteCancelHandler} className="button-text">
                    Cancel
                  </button>
                  <button onClick={deleteHandler} className="button">
                    Delete
                  </button>
                </>
              )}
            </div>
            {isErrorDeleting && (
              <ErrorBlock
                title="Failed to delete event"
                message={
                  (deleteError as ErrorT).info?.message ||
                  "Failed to delete event, please try again later."
                }
              />
            )}
          </Modal>
        </div>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{eventContent}</article>
    </>
  );
}
