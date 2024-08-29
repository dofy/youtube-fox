import { Caption } from '@dofy/youtube-caption-fox'
import React from 'react'
import { UserOptions, VideoInfo } from '../types'
import { ContentDetails } from './ContentDetails'

export interface ContentProps {
  video: VideoInfo
  options: UserOptions
  openPreviewPanel: (video: VideoInfo) => void
}

export const Content: React.FC<ContentProps> = ({ video, options, openPreviewPanel }) => {
  return <ContentDetails video={video} options={options} openPreviewPanel={openPreviewPanel} />
}
