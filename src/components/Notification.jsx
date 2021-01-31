import React from "react";
import { Transition } from "react-transition-group";

const duration = 300;

const defaultStyle = {
  transition: `${duration}ms ease-in-out`,
  opacity: 0,
  marginLeft: "-5rem",
};

const transitionStyles = {
  entering: { opacity: 0.95, top: "2rem", visibility: "visible" },
  entered: { opacity: 0.95, top: "2rem", visibility: "visible" },
  exiting: { opacity: 0, top: "0rem" },
  exited: { opacity: 0, top: "0rem", visibility: "hidden" },
};

const Notification = ({
  in: inProp,
  type,
  messageText,
  button1Text,
  button2Text,
  button1Function,
  button2Function,
}) => {
  let messageStyles;
  switch (type) {
    case "confirm":
      messageStyles = "bg-yellow-200 ring ring-yellow-400";
      break;
    case "successful":
      messageStyles = "bg-blue-200 ring ring-blue-400";
      break;
    case "unsuccessful":
      messageStyles = "bg-red-200 ring ring-red-400";
      break;
    default:
      throw Error("invalid notification type");
  }

  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          className={`flex flex-col px-4 py-6 fixed  rounded left-2/4 h-22 w-64 md:w-80 ${messageStyles}`}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <h2 className="font-medium mb-2 text-blue-800 overflow-hidden">
            {messageText}
          </h2>
          {type === "confirm" && (
            <div className="flex flex-row justify-between">
              <button
                className="px-4 py-2 bg-red-400 transition focus:ring focus:ring-red-400 focus:outline-none hover:bg-red-300 rounded"
                onClick={() => button1Function()}
              >
                {button1Text}
              </button>
              <button
                className="px-4 py-2 bg-blue-400 transition focus:ring focus:ring-blue-400 focus:outline-none hover:bg-blue-300 rounded"
                onClick={() => button2Function()}
              >
                {button2Text}
              </button>
            </div>
          )}
        </div>
      )}
    </Transition>
  );
};

export default Notification;
