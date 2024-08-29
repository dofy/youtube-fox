import { getCaptions, VideoInfo } from '@dofy/youtube-caption-fox'
import React, { useEffect, useState } from 'react'
import { FiCloud, FiCoffee, FiGitlab, FiLoader, FiPrinter, FiSave } from 'react-icons/fi'
import { putFileToBucket } from '../utils/s3'
import { ContentProps } from './Content'

export const ContentDetails: React.FC<ContentProps> = ({ videoId, options, openPreviewPanel }) => {
  const [video, setVideo] = useState<VideoInfo>()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const fetchCaptions = async (videoId: string) => {
    setLoading(true)
    const videoData = await getCaptions(videoId)
    setVideo(videoData)
    setLoading(false)
  }

  const saveCaptions = async () => {
    if (!video || saving || saved) return

    setSaving(true)

    try {
      await putFileToBucket(
        `${videoId}_${video?.title || new Date().toISOString()}`,
        JSON.stringify(video),
        'application/json',
      )
      setSaved(true)
    } catch (error) {
      console.error(error)
      setSaved(false)
    } finally {
      setSaving(false)
    }
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
              disabled={saving || saved}
              onClick={saveCaptions}
            >
              {saved ? <FiCloud /> : <FiSave />}
              {saving ? 'Saving Captions...' : saved ? 'Captions Saved!' : 'Save Captions to S3'}
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
