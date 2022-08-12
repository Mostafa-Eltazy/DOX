import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DownloadLinkModal = ({ file, downloadLink, show, handleClose }) => {
  return (
    <Modal className="main-modal" show={show} onExit={handleClose} onBackdropClick={handleClose} onHide={handleClose}>
      <Modal.Header closeButton className="main-modal__header">
        <Modal.Title style={{ wordWrap: 'break-word' }} className="h6">
          {file.fileName} download link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="main-modal__body">
        {downloadLink ? (
          <a href={downloadLink} className="text-center" download={file.url} >
            {' '}
            Click Here!
          </a>
        ) : (
          'Generating Download Link...'
        )}
      </Modal.Body>
      <Modal.Footer className="main-modal__footer">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadLinkModal;
