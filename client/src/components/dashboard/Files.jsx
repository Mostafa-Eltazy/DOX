import React from 'react';

import FileCard from './FileCard';

const Files = ({ fileList }) => {
  return (
    <>
      {fileList?.length > 0 ? (
        fileList.map(file => {
          return <FileCard key={file.id} file={file} />;
        })
      ) : (
        <span>Nothing has been uploded </span>
      )}
    </>
  );
};

export default Files;
