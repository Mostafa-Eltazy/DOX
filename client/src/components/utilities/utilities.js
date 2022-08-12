import { fileTypeIconMap, shareableTimeIntervals } from './constants';

export const showFileIcon = ext => {
  const fileType = fileTypeIconMap.find(type => type.ext.includes(ext));
  return fileType?.icon;
};

export const showFileLabel = ext => {
  const fileType = fileTypeIconMap.find(type => type.ext.includes(ext));
  return fileType?.label;
};

export const showIntervalLabel = value => {
  const interval = shareableTimeIntervals.find(i => i.value === +value);
  return interval?.label;
};


