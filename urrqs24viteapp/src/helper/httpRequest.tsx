export type ErrorT = Error & {
  code?: number;
  info?: { message?: string };
};

export async function getEvents(props: {
  signal?: AbortSignal | null | undefined;
  searchKey?: string;
}) {
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
}
