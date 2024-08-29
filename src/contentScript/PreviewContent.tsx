import { VideoInfo } from '../types'
import { CaptionsList } from './CaptionsList'

interface PreviewContentProps {
  video: VideoInfo
}

export const PreviewContent: React.FC<PreviewContentProps> = ({ video }) => {
  return (
    <>
      <h3>
        Video ID:
        <span className="video-id">{video.videoId}</span>
      </h3>
      <h2>{video.videoTitle}</h2>
      <img src={video.videoCover} alt={video.videoTitle} />
      <section className="content">
        <CaptionsList captions={video.captions || []} />
      </section>
    </>
  )
}
