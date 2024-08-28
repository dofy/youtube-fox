import { Caption } from '@dofy/youtube-caption-fox'
import React from 'react'
import { UserOptions } from '../types'
import { ContentDetails } from './ContentDetails'

interface ContentProps {
  videoId: string
  options: UserOptions
  openPreviewPanel: (videoId: string, captions: Caption[]) => void
}

export const Content: React.FC<ContentProps> = ({ videoId, options, openPreviewPanel }) => {
  return <ContentDetails videoId={videoId} options={options} openPreviewPanel={openPreviewPanel} />
}
