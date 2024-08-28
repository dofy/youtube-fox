import { Caption } from '@dofy/youtube-caption-fox'

interface CaptionItemProps {
  caption: Caption
}

export const CaptionItem: React.FC<CaptionItemProps> = ({ caption }) => {
  const filterRegex = /^\[[^\]]+\]$/
  return (
    !filterRegex.test(caption.text) && (
      <div className="caption">
        <span className="caption-item">{caption.start.toFixed(2)}</span>
        <span className="caption-item">{caption.dur.toFixed(2)}</span>
        <span className="caption-text">{caption.text}</span>
      </div>
    )
  )
}
