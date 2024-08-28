import React from 'react'
import { FiX } from 'react-icons/fi'

interface PreviewPanelProps {
  closePreviewPanel: () => void
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ closePreviewPanel }) => {
  return (
    <div className="body font">
      <div className="header">
        <h1 className="title">Preview Captions</h1>
        <div className="close">
          <FiX onClick={closePreviewPanel} size={32} />
        </div>
      </div>
      <div id="preview-content" className="content"></div>
    </div>
  )
}
