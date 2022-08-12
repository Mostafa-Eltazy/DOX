import client from "./client";

export const getFiles = async (pageToken) => {
  const response = await client.get(`/files`, {
    params: { pageToken },
  });
  return response.data;
};

export const getFileDownloadLink = async (fileName) => {
  const response = await client.get(`/files/${fileName}`);
  return response.data;
};

export const getFileShareableLink = async (fileName, shareableDuration) => {
  const response = await client.get(
    `/files/${fileName}/${shareableDuration}/signed-url`
  );
  return response.data;
};

export const uploadFile = async (files) => {
  const formData = new FormData();
  for (const f of files) {
    formData.append("files", f);
  }

  return client.post(`/files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
