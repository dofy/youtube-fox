import React, { useEffect, useState } from 'react'

interface PreviewPanelProps {
  closePreviewPanel: () => void
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ closePreviewPanel }) => {
  return (
    <div className="body font">
      <div className="header">
        <h1 className="title">Preview Captions</h1>
        <div className="close">
          <button className="button font" onClick={closePreviewPanel}>
            Close
          </button>
        </div>
      </div>
      <h3>
        Video ID:
        <span id="video-id"></span>
      </h3>
      <section id="video-captions" className="content"></section>
    </div>
  )
}
