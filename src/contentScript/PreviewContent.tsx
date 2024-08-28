import { Caption } from '@dofy/youtube-caption-fox'
import { CaptionsList } from './CaptionsList'

interface PreviewContentProps {
  videoId: string
  captions: Caption[]
}

export const PreviewContent: React.FC<PreviewContentProps> = ({ videoId, captions }) => {
  return (
    <>
      <h3>
        Video ID:
        <span className="video-id">{videoId}</span>
      </h3>
      <section className="content">
        <CaptionsList captions={captions} />
      </section>
    </>
  )
}
