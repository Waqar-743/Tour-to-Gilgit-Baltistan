import { useEffect, useRef } from "react";
import Icon from "./Icon";

export default function JournalDialog({
  title,
  children,
  onClose,
  wide = false,
}) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previous && previous !== document.body && previous.isConnected)
        previous.focus();
      else document.querySelector(".menu-toggle")?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`journal-dialog ${wide ? "dialog-wide" : ""}`}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === ref.current) {
          const bounds = ref.current.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-top">
        <span className="eyebrow">A field guide to Gilgit-Baltistan</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <Icon name="close" />
        </button>
      </div>
      <h2 id="dialog-title" className="dialog-title">
        {title}
      </h2>
      {children}
    </dialog>
  );
}
