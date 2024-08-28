import { Caption, getCaptions } from '@dofy/youtube-caption-fox'
import React from 'react'

interface ContentProps {
  videoId: string
  openPreviewPanel: (videoId: string, captions: Caption[]) => void
}

export const Content: React.FC<ContentProps> = ({ videoId, openPreviewPanel }) => {
  const captions: Caption[] = []

  const fetchCaptions = async (videoId: string) => {
    const captionsData = await getCaptions(videoId)
    if (captionsData.length === 0) {
      const error = document.getElementById(`error-${videoId}`)
      error?.classList.remove('hidden')
      const buttons = document.getElementById(`buttons-${videoId}`)
      buttons?.classList.add('hidden')
    } else {
      captions.push(...captionsData)
    }
  }

  fetchCaptions(videoId)

  const previewCaptions = () => {
    openPreviewPanel(videoId, captions)
  }

  return (
    <div className="container">
      <div className="group">
        <div className="label">ID: {videoId}</div>
        <div id={`error-${videoId}`} className="label error hidden">
          No Captions
        </div>
      </div>
      <div id={`buttons-${videoId}`} className="group">
        <button className="button font" onClick={previewCaptions}>
          Preview Captions
        </button>
        <button className="button font">Safe Draft</button>
      </div>
    </div>
  )
}
