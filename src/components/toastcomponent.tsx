import * as React from "react";
interface IToastProps {
  message: string;
  title: string;
}
const Toast: React.FC<IToastProps> = (props: IToastProps) => {
  return (
    <div
      className="toast"
      style={{ position: "absolute", top: 84, right: 18 }}
      data-delay="2000"
    >
      <div className="toast-header">
        <strong className="mr-auto">{props.title}</strong>
        <small>Just now</small>
        <button
          type="button"
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">{props.message}</div>
    </div>
  );
};

export default Toast;
