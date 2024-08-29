import { getCaptions, VideoInfo } from '@dofy/youtube-caption-fox'
import React, { useEffect, useState } from 'react'
import { FiCoffee, FiGitlab, FiLoader, FiPrinter, FiSave } from 'react-icons/fi'
import { putFileToBucket } from '../utils/s3'
import { ContentProps } from './Content'

export const ContentDetails: React.FC<ContentProps> = ({ videoId, options, openPreviewPanel }) => {
  const [video, setVideo] = useState<VideoInfo>()
  const [loading, setLoading] = useState(false)

  const fetchCaptions = async (videoId: string) => {
    setLoading(true)
    const videoData = await getCaptions(videoId)
    setVideo(videoData)
    setLoading(false)
  }

  useEffect(() => {
    fetchCaptions(videoId)
  }, [videoId])

  return (
    <div className="container">
      <div className="group">
        <div className="label item-with-icon">
          <FiGitlab fill="#c00" color="#f00" />
          {videoId}
        </div>
        {loading && (
          <div className="label loading item-with-icon">
            <FiLoader color="#c00" />
            Loading Captions...
          </div>
        )}
        {!loading && video?.captions?.length === 0 && (
          <div className="label error item-with-icon">
            <FiCoffee />
            No Captions
          </div>
        )}
      </div>
      {options.openaiApiKey ? (
        !loading &&
        video &&
        video.captions.length > 0 && (
          <div className="group">
            <button className="button font item-with-icon" onClick={() => openPreviewPanel(video)}>
              <FiPrinter />
              Preview Captions
            </button>
            <button
              className="button font item-with-icon"
              onClick={async () => {
                const result = await putFileToBucket(
                  new Date().toISOString(),
                  JSON.stringify(video, null, 2),
                  'application/json',
                )
                console.log('-- result:', result)
              }}
            >
              <FiSave />
              Safe Draft to S3
            </button>
          </div>
        )
      ) : (
        <button
          className="label button"
          onClick={() => chrome.runtime.sendMessage({ type: 'openOptionsPage' })}
        >
          Please set your OpenAI API Key in the extension options
        </button>
      )}
    </div>
  )
}
