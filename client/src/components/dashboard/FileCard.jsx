import moment from 'moment'
import { useState } from 'react'
import { BsCloudDownload, BsShare } from 'react-icons/bs'

import { shareableTimeIntervals } from '../utilities/constants'
import { showFileIcon, showFileLabel } from '../utilities/utilities'
import { getFileDownloadLink, getFileShareableLink } from '../../api/files.api'
import FilePreview from './FilePreview'
import DownloadLinkModal from './modals/DownloadLinkModal'
import ShareLinkModal from './modals/ShareLinkModal'
import { ONE_HOUR_MS } from '../utilities/constants'

const FileCard = ({ file }) => {
  const [visibleModal, setVisibleModal] = useState(null)

  const [downloadLink, setDownloadLink] = useState('')
  const [shareableLink, setShareableLink] = useState('')
  const [shareableLinkDuration, setShareableLinkDuration] = useState(
    ONE_HOUR_MS,
  )

  const handleClose = () => {
    setVisibleModal(null)
  }

  const handleDownload = async (fileName) => {
    setVisibleModal('download')
    const downloadLink = await getFileDownloadLink(fileName)
    setDownloadLink(downloadLink.url)
  }

  const handleShare = async (fileName, shareableDuration) => {
    setVisibleModal('share')
    const shareableLink = await getFileShareableLink(
      fileName,
      shareableDuration,
    )
    setShareableLink(shareableLink.url)
  }

  return (
    <>
      <div className="file-card m-3">
        <div className="d-flex justify-content-start p-3">
          <div className="d-flex flex-column  mt-1 mx-2 w-100">
            <h6
              style={{ wordWrap: 'break-word' }}
              className="text-center mb-0 file-card_title"
            >
              {file.fileName}
            </h6>
            <hr />

            <div className="d-flex w-100 justify-content-around">
              <div className="col-5">
                <FilePreview file={file} />
              </div>

              <div className="d-flex flex-column align-self-center align-self-md-end mb-1 col-5">
                <button
                  className="main-button-icon-red"
                  style={{ marginLeft: '0' }}
                  onClick={(e) => {
                    handleDownload(file.fileName)
                  }}
                >
                  <BsCloudDownload />
                </button>

                <span>link duration</span>

                <select
                  className="mb-2"
                  value={shareableLinkDuration}
                  onChange={(e) => {
                    setShareableLinkDuration(e.target.value)
                  }}
                >
                  {shareableTimeIntervals.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <button
                  className="main-button-icon-green"
                  style={{ marginLeft: '0' }}
                  onClick={(e) => {
                    handleShare(file.fileName, shareableLinkDuration)
                  }}
                >
                  <BsShare />
                </button>

                <div className="d-flex align-items-center">
                  <span>{showFileIcon(file.type.split('/')[1])}</span>
                  <span className="mx-2 mt-1">
                    {showFileLabel(file.type.split('/')[1])}
                  </span>
                </div>
                <span className="align-self-start mt-2">
                  {' '}
                  {file.downloadCount ?? 0} Downloads{' '}
                </span>
                <div className="d-flex flex-column  mt-1">
                  {moment(file.createdAt.split('T')[0], 'YYYY/MM/DD')
                    .startOf('day')
                    .fromNow()
                    .split(' ')[1] === 'days' ? (
                    <span>
                      {' '}
                      {file.createdAt.split('T')[1].split(':')[0]}:
                      {file.createdAt.split('T')[1].split(':')[1]}
                    </span>
                  ) : (
                    <span>
                      {moment(file.createdAt.split('T')[0], 'YYYY/MM/DD')
                        .startOf('day')
                        .fromNow()}
                    </span>
                  )}
                  <span>
                    {moment(file.createdAt.split('T')[0], 'YYYY/MM/DD').format(
                      'MMM Do YYYY',
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DownloadLinkModal
        file={file}
        downloadLink={downloadLink}
        show={visibleModal === 'download'}
        handleClose={handleClose}
      />
      <ShareLinkModal
        file={file}
        shareableLink={shareableLink}
        shareableLinkDuration={shareableLinkDuration}
        show={visibleModal === 'share'}
        handleClose={handleClose}
      />
    </>
  )
}

export default FileCard
