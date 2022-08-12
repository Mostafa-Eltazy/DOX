import { AiOutlineFilePdf, AiOutlineFileImage } from "react-icons/ai";
import { RiFileExcel2Line, RiFileWord2Line } from "react-icons/ri";
import { GrDocumentTxt } from "react-icons/gr";

export const ONE_HOUR_MS = 1000 * 60 * 60 * 60;

export const fileTypeIconMap = [
  {
    ext: ["pdf"],
    label: "pdf file",
    icon: <AiOutlineFilePdf style={{ fontSize: "20px" }} />,
  },
  {
    ext: ["jpg", "jpeg", "png"],
    label: "image",
    icon: <AiOutlineFileImage style={{ fontSize: "20px" }} />,
  },
  {
    ext: [
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "vnd.ms-excel",
    ],
    label: "excel sheet",
    icon: <RiFileExcel2Line style={{ fontSize: "20px" }} />,
  },
  {
    ext: [
      "vnd.openxmlformats-officedocument.wordprocessingml.document",
      "msword",
    ],
    label: "word file",
    icon: <RiFileWord2Line style={{ fontSize: "20px" }} />,
  },
  {
    ext: ["plain"],
    label: "text file",
    icon: <GrDocumentTxt style={{ fontSize: "20px" }} />,
  },
];

export const shareableTimeIntervals = [
  {
    label: "1 hr",
    value: ONE_HOUR_MS,
  },
  {
    label: "6 hrs",
    value: ONE_HOUR_MS * 6,
  },
  {
    label: "12 hrs",
    value: ONE_HOUR_MS * 12,
  },
  {
    label: "24 hrs",
    value: ONE_HOUR_MS * 24,
  },
];


