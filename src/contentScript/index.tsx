import { VideoInfo } from '@dofy/youtube-caption-fox'
import { createRoot, Root } from 'react-dom/client'
import { UserOptions } from '../types'
import { Content } from './Content'
import { PreviewContent } from './PreviewContent'
import { PreviewPanel } from './PreviewPanel'
import './index.css'

const VIDEO_CARD_CLASS = '.text-wrapper.ytd-video-renderer'

const globalObjectMap: {
  options?: UserOptions
  containers: {
    previewContent?: Root
  }
} = {
  containers: {},
}

const openPreviewPanel = (video: VideoInfo) => {
  const previewPanel = document.getElementById('preview-panel')
  previewPanel?.classList.add('active')

  if (!globalObjectMap.containers.previewContent) {
    const videoCaptions = document.getElementById('preview-content')
    globalObjectMap.containers.previewContent = createRoot(videoCaptions!)
  }
  globalObjectMap.containers.previewContent?.render(<PreviewContent video={video} />)
}

const closePreviewPanel = () => {
  const previewPanel = document.getElementById('preview-panel')
  previewPanel?.classList.remove('active')
}

const insertGoogleFont = () => {
  const link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap'
  link.rel = 'stylesheet'
  document.head.appendChild(link)
}

const insertPreviewPanel = () => {
  const previewPanelContainer = document.createElement('div')
  previewPanelContainer.setAttribute('id', 'preview-panel')
  previewPanelContainer.classList.add('yf_preview-panel')
  document.body.appendChild(previewPanelContainer)
  createRoot(previewPanelContainer).render(<PreviewPanel closePreviewPanel={closePreviewPanel} />)
}

const updateVideoCard = (card: HTMLElement) => {
  const videoTitleEl = card.querySelector<HTMLAnchorElement>('#video-title')
  const videoUrl = videoTitleEl?.href
  const videoId = new URL(videoUrl!).searchParams.get('v')

  if (videoUrl?.includes('shorts')) return

  card?.querySelectorAll('.has-content').forEach((node) => node.remove())

  try {
    const container = document.createElement('div')
    container.classList.add('has-content')
    card?.appendChild(container)

    createRoot(container).render(
      <Content
        videoId={videoId!}
        options={globalObjectMap.options!}
        openPreviewPanel={openPreviewPanel}
      />,
    )
  } catch (error) {
    console.error(error)
  }
}

const insertContentToVideoCards = () => {
  const videoCard = document.querySelectorAll<HTMLElement>(VIDEO_CARD_CLASS)
  videoCard?.forEach((card) => {
    updateVideoCard(card)
  })
}

let lastUrl = window.location.href
const observer = new MutationObserver((mutations) => {
  const currentUrl = window.location.href
  if (lastUrl !== currentUrl) {
    lastUrl = currentUrl
    setTimeout(insertContentToVideoCards, 1500)
  }

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        const videoItem = node.querySelector(VIDEO_CARD_CLASS)
        if (videoItem) {
          updateVideoCard(videoItem as HTMLElement)
        }
      }
    })
  })
})

// begin!!!
chrome.runtime.sendMessage({ type: 'getOptions' }, (response) => {
  globalObjectMap.options = response.options

  insertGoogleFont()
  insertPreviewPanel()
  insertContentToVideoCards()

  observer.observe(document.body, { childList: true, subtree: true })
})
