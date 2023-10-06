/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal(props: { children: any; onClose: any }) {
  const [domReady, setDomReady] = useState(false);
  const dialog = useRef<any>();

  useEffect(() => {
    setDomReady(true);
    const modal = dialog.current;
    modal?.showModal();

    return () => {
      modal?.close();
    };
  }, []);

  return domReady
    ? createPortal(
        <dialog className="modal" ref={dialog} onClose={props.onClose}>
          {props.children}
        </dialog>,
        document.getElementById("modal")!
      )
    : null;
}
