import { Caption } from '@dofy/youtube-caption-fox'
import React from 'react'
import { CaptionItem } from './CaptionItem'

interface CaptionsListProps {
  captions: Caption[]
}

export const CaptionsList: React.FC<CaptionsListProps> = ({ captions }) => {
  return captions.map((caption, index) => <CaptionItem key={index} caption={caption} />)
}
