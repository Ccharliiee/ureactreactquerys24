import { useQuery } from "@tanstack/react-query";

import { ErrorT, getEvents } from "../../helper/httpRequest.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";
import { useRef, useState } from "react";

export default function FindEventSection() {
  const searchElement = useRef<HTMLInputElement>(null);
  const [searchKey, setSearchKey] = useState<string>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { searchKey: searchKey }],
    queryFn: ({ signal, queryKey }) =>
      getEvents({ signal, ...(queryKey[1] as object) }),
    enabled: searchKey !== undefined,
  });

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setSearchKey(searchElement.current?.value ?? "");
  }

  let content = <p>Please enter a search info and to find events.</p>;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={(error as ErrorT)?.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event: { id: React.Key | null | undefined }) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
