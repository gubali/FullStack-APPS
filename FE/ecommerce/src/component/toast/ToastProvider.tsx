import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

import { Toast, ToastContainer } from "react-bootstrap";

type ToastType = "success" | "danger" | "info" | "warning";

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");

  const showToast = (msg: string, toastType: ToastType = "info") => {
    setMessage(msg);
    setType(toastType);
    setShow(false); // reset for quick repeated toasts
    setTimeout(() => setShow(true), 100);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          bg={type}
        >
          <Toast.Header>
            <strong className="me-auto">
              {type === "danger" ? "Error" : "Notification"}
            </strong>
          </Toast.Header>
          <Toast.Body className={type === "danger" || type === "success" ? "text-white" : undefined}>
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
