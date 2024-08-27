import '/global.css'

interface ContentProps {
  videoId: string
  videoTitle: string
}

export const Content: React.FC<ContentProps> = ({ videoId, videoTitle }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-blue-100 rounded-md py-2 px-4">YouTube</div>
      <div>{videoId}</div>
      <div>{videoTitle}</div>
    </div>
  )
}
