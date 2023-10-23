/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

import Modal from "../UI/Modal.js";
import EventForm from "./EventForm.jsx";
import { useQuery } from "@tanstack/react-query";
import {
  getEvent,
  uploadEditedEvent,
  queryClient,
  ErrorT,
} from "../../helper/httpRequest.js";
import ErrorBlock from "../UI/ErrorBlock.js";
import LoadingIndicator from "../UI/LoadingIndicator.js";

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();

  const submit = useSubmit();

  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => getEvent({ signal, id: params.id }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: uploadEditedEvent,
  //   onMutate: async (data) => {
  //     await queryClient.cancelQueries({ queryKey: ["events", params.id] });
  //     const lastVerEvent = queryClient.getQueryData(["events", params.id]);

  //     queryClient.setQueryData(["events", params.id], data.event);

  //     return { lastVerEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", params.id], context?.lastVerEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["events", params.id] });
  //   },
  // });

  const editedEventSubmitHandler = (formData: any) => {
    submit(formData, { method: "PUT" });
  };

  const handleClose = () => {
    navigate("../");
  };

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            (error as ErrorT).info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={editedEventSubmitHandler}>
        {state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return (
    <div id="modal">
      <Modal onClose={handleClose}>{content}</Modal>
    </div>
  );
}

export const eventDataLoader = (props: { params: any }) => {
  return queryClient.fetchQuery({
    queryKey: ["events", props.params.id],
    queryFn: ({ signal }) => getEvent({ signal, id: props.params.id }),
  });
};

export const uploadEditedEventAction = async (props: {
  request: { formData: () => any };
  params: any;
}) => {
  const formData = await props.request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await uploadEditedEvent({ id: props.params.id, event: updatedEventData });
  await queryClient.invalidateQueries({
    queryKey: ["events", props.params.id],
  });
  return redirect("../");
};
