import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaRegCheckCircle } from 'react-icons/fa'

import { showIntervalLabel } from '../../utilities/utilities'

const ShareLinkModal = ({
  file,
  shareableLink,
  show,
  handleClose,
  shareableLinkDuration,
}) => {
  const [showTick, setShowTick] = useState(false)

  const closeModal = () => {
    setShowTick(false)
    handleClose()
  }

  return (
    <Modal
      className="main-modal"
      show={show}
      onExit={closeModal}
      onBackdropClick={closeModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton className="main-modal__header">
        <Modal.Title style={{ wordWrap: 'break-word' }} className="h6">
          {file.fileName} shareble link for{' '}
          {showIntervalLabel(shareableLinkDuration)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="main-modal__body">
        {shareableLink ? (
          <span style={{ wordWrap: 'break-word' }}>{shareableLink}</span>
        ) : (
          'Genrating Sharable Link...'
        )}
      </Modal.Body>
      <Modal.Footer className="main-modal__footer">
        {showTick ? (
          <FaRegCheckCircle style={{ fontSize: '20px', color: 'green' }} />
        ) : null}
        <Button
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(shareableLink)
            setShowTick(true)
          }}
        >
          Copy to Clipboard
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShareLinkModal
