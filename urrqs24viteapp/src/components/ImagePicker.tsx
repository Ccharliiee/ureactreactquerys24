/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key } from "react";

export default function ImagePicker(props: {
  images: any;
  selectedImage: any;
  onSelect: any;
}) {
  const { images, selectedImage, onSelect } = props;
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map(
          (image: {
            path: Key | null | undefined;
            caption: string | undefined;
          }) => (
            <li
              key={image.path}
              onClick={() => onSelect(image.path)}
              className={selectedImage === image.path ? "selected" : undefined}
            >
              <img
                src={`http://localhost:3000/${image.path}`}
                alt={image.caption}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
