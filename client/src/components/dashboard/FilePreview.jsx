import DocViewer, {
  DocViewerRenderers,
  TXTRenderer,
} from '@cyntler/react-doc-viewer'
import { Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail'
import pageThumbnailPlugin from './page-thumbnail-plugin'

const FilePreview = ({ file }) => {
  const thumbnailPluginInstance = thumbnailPlugin()
  const { Cover } = thumbnailPluginInstance

  const pageThumbnailPluginInstance = pageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => 0} />,
  })

  const docs = [{ uri: file.url }]
  switch (true) {
    case ['image/jpg', 'image/png', 'image/jpeg'].includes(file.type):
      return <img src={file.url} alt="preview of uploaded up"></img>
    case ['text/plain'].includes(file.type):
      return (
        <DocViewer
          pluginRenderers={[TXTRenderer]}
          documents={docs}
          style={{ width: '100%' }}
        />
      )
    case ['application/pdf'].includes(file.type):
      return (
        <Viewer
          fileUrl={file.url}
          plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
        />
      )
    case [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ].includes(file.type):
      return (
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          style={{ width: '100%', height: '100%' }}
        />
      )

    case [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ].includes(file.type):
      return (
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          style={{ width: '100%', height: '100%' }}
        />
      )
    default:
      return <span>no preview</span>
  }
}

export default FilePreview

