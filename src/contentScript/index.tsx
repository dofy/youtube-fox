import { Caption } from '@dofy/youtube-caption-fox'
import { createRoot, Root } from 'react-dom/client'
import { UserOptions, VideoInfo } from '../types'
import { Content } from './Content'
import { PreviewContent } from './PreviewContent'
import { PreviewPanel } from './PreviewPanel'
import './index.css'

const VIDEO_ITEM_CLASS = '#dismissible'
const VIDEO_TEXT_CLASS = '.text-wrapper.ytd-video-renderer'

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

const insertPreviewPanel = () => {
  const previewPanelContainer = document.createElement('div')
  previewPanelContainer.setAttribute('id', 'preview-panel')
  previewPanelContainer.classList.add('preview-panel')
  document.body.appendChild(previewPanelContainer)
  createRoot(previewPanelContainer).render(<PreviewPanel closePreviewPanel={closePreviewPanel} />)
}

const updateVideoCard = (item: HTMLElement) => {
  const card = item.querySelector<HTMLElement>(VIDEO_TEXT_CLASS)
  const videoTitleEl = card?.querySelector<HTMLAnchorElement>('#video-title')
  const videoCoverEl = item.querySelector<HTMLImageElement>('.yt-core-image')

  if (!videoTitleEl || !videoCoverEl) return
  const videoUrl = videoTitleEl?.href
  const videoId = new URL(videoUrl!).searchParams.get('v')
  const videoTitle = videoTitleEl?.textContent
  const videoCover = videoCoverEl?.src
  console.log('🚀 ~ updateVideoCard ~ videoCover:', videoCover)

  if (videoUrl?.includes('shorts')) return

  card?.querySelectorAll('.has-content').forEach((node) => node.remove())

  try {
    const container = document.createElement('div')
    container.classList.add('has-content')
    card?.appendChild(container)

    createRoot(container).render(
      <Content
        video={{
          videoId: videoId!,
          videoTitle: videoTitle!,
          videoCover: videoCover!,
        }}
        options={globalObjectMap.options!}
        openPreviewPanel={openPreviewPanel}
      />,
    )
  } catch (error) {
    console.error(error)
  }
}

const insertContentToVideoCards = () => {
  const videoItems = document.querySelectorAll<HTMLElement>(VIDEO_ITEM_CLASS)
  videoItems?.forEach((item) => {
    updateVideoCard(item)
  })
}

let lastUrl = window.location.href
const observer = new MutationObserver((mutations) => {
  const currentUrl = window.location.href
  if (lastUrl !== currentUrl) {
    lastUrl = currentUrl
    setTimeout(insertContentToVideoCards, 1000)
  }

  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        const videoItem = node.querySelector(VIDEO_ITEM_CLASS)
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

  insertPreviewPanel()
  insertContentToVideoCards()

  observer.observe(document.body, { childList: true, subtree: true })
})
