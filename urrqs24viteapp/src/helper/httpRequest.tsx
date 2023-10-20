/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export type ErrorT = Error & {
  code?: number;
  info?: { message?: string };
};

export const getEvents = async (props: {
  signal?: AbortSignal | null | undefined;
  searchKey?: string;
}) => {
  let url = "http://localhost:3000/events";

  if (props?.searchKey) {
    url += "?search=" + props.searchKey;
  }

  const response = await fetch(url, { signal: props?.signal });

  if (!response.ok) {
    const error: ErrorT = new Error(
      "An error occurred while fetching the events"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
};

export const getEvent = async (props: {
  signal: AbortSignal | null | undefined;
  id: string | undefined;
}) => {
  const { id, signal } = props;
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error: ErrorT = new Error(
      "An error occurred while fetching the event"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
};

export const createNewEvent = async (eventData: any) => {
  const response = await fetch(`http://localhost:3000/events`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: ErrorT = new Error(
      "An error occurred while creating the event"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
};

export const getAvailableImages = async (props: {
  signal?: AbortSignal | null | undefined;
}) => {
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal: props?.signal,
  });

  if (!response.ok) {
    const error: ErrorT = new Error(
      "An error occurred while fetching the images"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
};

export const deleteEvent = async (props: { id: string }) => {
  const response = await fetch(`http://localhost:3000/events/${props.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error: ErrorT = new Error(
      "An error occurred while deleting the event"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
};

export const uploadEditedEvent = async (props: { id: string; event: any }) => {
  const { id, event } = props;
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: ErrorT = new Error(
      "An error occurred while updating the event"
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
};
