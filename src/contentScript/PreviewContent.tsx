import { VideoInfo } from '@dofy/youtube-caption-fox'
import { CaptionsList } from './CaptionsList'

interface PreviewContentProps {
  video: VideoInfo
}

export const PreviewContent: React.FC<PreviewContentProps> = ({ video }) => {
  return (
    <>
      <div className="video-info">
        <img src={video.cover} className="img-cover" alt={video.title} />
        <div className="video-text">
          <h3>
            Video ID:
            <span className="video-id">{video.id}</span>
          </h3>
          <h2 className="video-title">{video.title}</h2>
        </div>
      </div>
      <section className="content">
        <CaptionsList captions={video.captions} />
      </section>
    </>
  )
}
