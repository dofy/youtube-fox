import { getCaptions, VideoInfo } from '@dofy/youtube-caption-fox'
import React, { useEffect, useState } from 'react'
import { FiCloud, FiCoffee, FiCopy, FiLoader, FiPrinter, FiSave } from 'react-icons/fi'
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
    if (options.s3AccessKey && options.s3SecretKey && options.s3Region && options.s3BucketName)
      fetchCaptions(videoId)
  }, [videoId])

  return (
    <div className="yf_container yf_noto">
      <div className="yf_group">
        <a
          href="/watch?v=ZbZSe6N_BXs"
          className="yf_label yf_item-with-icon"
          onClick={(evt) => {
            evt.preventDefault()
            navigator.clipboard.writeText(videoId)
          }}
        >
          <FiCopy color="#c00" />
          {videoId}
        </a>
        {loading && (
          <div className="yf_label yf_loading yf_item-with-icon">
            <FiLoader color="#c00" />
            Loading Captions...
          </div>
        )}
        {!loading && video?.captions?.length === 0 && (
          <div className="yf_label yf_error yf_item-with-icon">
            <FiCoffee />
            No Captions
          </div>
        )}
      </div>
      {options.s3AccessKey && options.s3SecretKey && options.s3Region && options.s3BucketName ? (
        !loading &&
        video &&
        video.captions.length > 0 && (
          <div className="yf_group">
            <button className="yf_button yf_item-with-icon" onClick={() => openPreviewPanel(video)}>
              <FiPrinter />
              Preview Captions
            </button>
            <button
              className="yf_button yf_item-with-icon"
              disabled={saving || saved}
              onClick={saveCaptions}
            >
              {saved ? <FiCloud /> : <FiSave />}
              {saving ? 'Saving Captions...' : saved ? 'Captions Saved!' : 'Save Captions'}
            </button>
          </div>
        )
      ) : (
        <button
          className="yf_label yf_button"
          onClick={() => chrome.runtime.sendMessage({ type: 'openOptionsPage' })}
        >
          Please set up your S3 credentials first
        </button>
      )}
    </div>
  )
}
