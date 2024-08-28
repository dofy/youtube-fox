import { Caption, getCaptions } from '@dofy/youtube-caption-fox'
import React, { useEffect, useState } from 'react'
import { FiCoffee, FiGitlab, FiLoader, FiPrinter, FiSave } from 'react-icons/fi'
import { UserOptions } from '../types'

interface ContentDetailsProps {
  videoId: string
  options: UserOptions
  openPreviewPanel: (videoId: string, captions: Caption[]) => void
}

export const ContentDetails: React.FC<ContentDetailsProps> = ({
  videoId,
  options,
  openPreviewPanel,
}) => {
  const [captions, setCaptions] = useState<Caption[]>()
  const [loading, setLoading] = useState(false)

  const fetchCaptions = async (videoId: string) => {
    setLoading(true)
    const captionsData = await getCaptions(videoId)
    setCaptions(captionsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchCaptions(videoId)
  }, [videoId])

  return (
    <div className="container">
      <div className="group">
        <div className="label item-with-icon">
          <FiGitlab />
          {videoId}
        </div>
        {loading && (
          <div className="label loading item-with-icon">
            <FiLoader />
            Loading Captions...
          </div>
        )}
        {!loading && captions?.length === 0 && (
          <div className="label error item-with-icon">
            <FiCoffee />
            No Captions
          </div>
        )}
      </div>
      {options.openaiApiKey ? (
        !loading &&
        captions &&
        captions.length > 0 && (
          <div className="group">
            <button
              className="button font item-with-icon"
              onClick={() => openPreviewPanel(videoId, captions)}
            >
              <FiPrinter />
              Preview Captions
            </button>
            <button className="button font item-with-icon">
              <FiSave />
              Safe Draft to S3
            </button>
          </div>
        )
      ) : (
        <button
          className="label error button"
          onClick={() => chrome.runtime.sendMessage({ type: 'openOptionsPage' })}
        >
          Please set your OpenAI API Key in the extension options
        </button>
      )}
    </div>
  )
}
