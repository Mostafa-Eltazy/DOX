import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { IoIosAddCircleOutline } from "react-icons/io";
import { uploadFile } from "../../api/files.api";
import FileLabel from "./FileLabel";
import NotificationsPanel from "./NotificationsPanel";

const UploadPanel = ({ refetchFiles }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFiletoStorage = async () => {
    try {
      setIsUploading(true);
      await uploadFile(files);
      toast("Upload successful", { type: "success" });
      setFiles([]);
      refetchFiles();
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleRemove = (fileName) => {
    setFiles(files.filter((f) => f.name !== fileName));
  };

  const notification = useMemo(() => {
    if (isUploading) {
      return "uploading";
    }
    if (files.length) {
      return "ready";
    } else {
      return "idle";
    }
  }, [files, isUploading]);

  return (
    <>
      <div className="upload-panel d-flex flex-column align-items-center">
        <h4 className="mt-4 text-center"> Welcome Back</h4>
        <NotificationsPanel state={notification} />
        <div className="mb-3 d-flex flex-column align-items-center">
          <h4 className="text-center mx-2">
            {" "}
            Upload more files to your DOX Storage
          </h4>
          <label
            className="form-label mt-3"
            htmlFor="formFile"
            style={{ fontSize: "25px" }}
          >
            <IoIosAddCircleOutline
              style={{ color: "green", fontSize: "40px", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="formFile"
            className="d-none"
            multiple
            onChange={(e) => handleFileChange(e)}
            accept="image/*, application/pdf, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>

        {files.length
          ? files?.map((f) => {
              return (
                <FileLabel
                  key={f.name}
                  fileName={f.name}
                  onRemoved={handleRemove}
                />
              );
            })
          : null}
        <button
          className={`${
            files.length > 0 ? "upload-btn-active" : "upload-btn"
          } d-flex align-items-center justify-content-center w-75 mb-2`}
          onClick={() => uploadFiletoStorage()}
          disabled={files.length < 1}
        >
          <i className="fa-solid fa-cloud-arrow-up upload-btn__icon"></i>
          <span className="mx-2">Upload </span>
        </button>
      </div>
    </>
  );
};

export default UploadPanel;
