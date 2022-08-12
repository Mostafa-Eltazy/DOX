import React from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const NotificationsPanel = ({ state }) => {
  switch (state) {
    case "uploading":
      return (
        <>
          <span className="notification-panel text-center">
            {" "}
            uploading ..{" "}
            <Spinner animation="border" variant="primary" size="sm" />
          </span>
        </>
      );
    case "ready":
      return (
        <span className="notification-panel text-center">
          {" "}
          files ready for upload
        </span>
      );
    default:
      return (
        <span className="notification-panel text-center">
          {" "}
          add files to be uploaded
        </span>
      );
  }
};

export default NotificationsPanel;
