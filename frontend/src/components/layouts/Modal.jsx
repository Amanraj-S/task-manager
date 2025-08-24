import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl mx-4 animate-fadeIn">
        {/* Modal content */}
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Modal header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-5 max-h-[70vh] overflow-y-auto bg-white text-gray-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
