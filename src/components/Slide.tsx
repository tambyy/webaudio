"use client";

import useSlideStore from "@/store/slideStore";
import { ReactNode, useEffect } from "react";

const Slide = ({
  name,
  title,
  onOpen,
  onClose,
  children,
}: {
  name: string;
  title: string;
  onOpen?: () => void;
  onClose?: () => void;
  children: ReactNode;
}) => {
  /**
   * Is current slide open ?
   */
  const isOpen = useSlideStore(
    (state) =>
      state.slides.length > 0 && state.slides[state.slides.length - 1] == name
  );

  /**
   * Close te current open slide
   */
  const close = useSlideStore((state) => state.close);

  useEffect(() => {
    if (isOpen) {
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
    }
  }, [onOpen, isOpen, onClose]);

  return (
    <div
      className={`fixed left-0 top-0 w-full h-full duration-200 ease-in ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-10"
        onClick={close}
      ></div>

      {/* Slide */}
      <div
        className={`fixed right-0 top-0 h-full flex flex-col bg-white rounded duration-200 ease-in ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-row px-6 py-4 items-center">
          {/* Title */}
          <span className="flex-1 text-sm font-medium text-black pr-4">
            {title}
          </span>

          {/* Close */}
          <a className="cursor-pointer" onClick={close}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#777777"
            >
              <path d="M291-253.85 253.85-291l189-189-189-189L291-706.15l189 189 189-189L706.15-669l-189 189 189 189L669-253.85l-189-189-189 189Z" />
            </svg>
          </a>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-row px-6 py-4 w-full text-black text-sm overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Slide;
