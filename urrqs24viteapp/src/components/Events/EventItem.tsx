/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { formattedDate } from "../../helper/formaters";

export default function EventItem(props: { event: any }) {
  const { event } = props;

  return (
    <article className="event-item">
      <img src={`http://localhost:3000/${event.image}`} alt={event.title} />
      <div className="event-item-content">
        <div>
          <h2>{event.title}</h2>
          <p className="event-item-date">{formattedDate(event.date)}</p>
          <p className="event-item-location">{event.location}</p>
        </div>
        <p>
          <Link to={`/events/${event.id}`} className="button">
            View Details
          </Link>
        </p>
      </div>
    </article>
  );
}
