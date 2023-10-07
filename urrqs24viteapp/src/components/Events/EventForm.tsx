/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import ImagePicker from "../ImagePicker.js";
import { useQuery } from "@tanstack/react-query";
import { getAvailableImages } from "../../helper/httpRequest.js";
import ErrorBlock from "../UI/ErrorBlock.js";

export default function EventForm(props: {
  inputData?: {
    image?: any;
    title?: string;
    description?: string;
    date?: string | number | readonly string[] | undefined;
    time?: string | number | readonly string[] | undefined;
    location?: string;
  };
  onSubmit: any;
  children: any;
}) {
  const { inputData, onSubmit: onFormSubmit, children } = props;
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  const { data, isPending, isError } = useQuery({
    queryKey: ["eventsImages"],
    queryFn: getAvailableImages,
  });

  const handleSelectImage = (image: any) => {
    setSelectedImage(image);
  };

  const handleSubmit = (event: { preventDefault: () => void; target: any }) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onFormSubmit({ ...data, image: selectedImage });
  };

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ""}
        />
      </p>

      {isPending && <p>Loading selectable images...</p>}
      {isError && (
        <ErrorBlock
          title="Failed to load selectable images"
          message="Please try again later."
        />
      )}
      {data && (
        <div className="control">
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      )}

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ""}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ""}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ""}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ""}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
