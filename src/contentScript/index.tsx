import { Caption } from '@dofy/youtube-caption-fox'
import { createRoot, Root } from 'react-dom/client'
import { UserOptions } from '../types'
import { CaptionsList } from './CaptionsList'
import { Content } from './Content'
import { PreviewPanel } from './PreviewPanel'
import './index.css'

const globalObjectMap: {
  options?: UserOptions
  containers: {
    videoCaptions?: Root
  }
} = {
  containers: {},
}

chrome.runtime.sendMessage({ type: 'getOptions' }, (response) => {
  globalObjectMap.options = response.options
})

const openPreviewPanel = (videoId: string, captions: Caption[]) => {
  const previewPanel = document.getElementById('preview-panel')
  previewPanel?.classList.add('active')
  const videoIdElement = previewPanel?.querySelector('#video-id')
  if (videoIdElement) {
    videoIdElement.innerHTML = videoId
  }

  if (!globalObjectMap.containers.videoCaptions) {
    const videoCaptions = document.getElementById('video-captions')
    globalObjectMap.containers.videoCaptions = createRoot(videoCaptions!)
  }
  globalObjectMap.containers.videoCaptions?.render(<CaptionsList captions={captions} />)
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

const updateVideoCard = (card: HTMLElement) => {
  const videoUrl = (card.querySelector('#video-title') as HTMLAnchorElement).href
  const videoId = new URL(videoUrl).searchParams.get('v')

  if (videoUrl.includes('shorts')) return
  if (card.querySelectorAll('.has-content').length > 0) return

  try {
    const container = document.createElement('div')
    container.setAttribute('id', videoId!)
    card.appendChild(container)

    createRoot(container).render(<Content videoId={videoId!} openPreviewPanel={openPreviewPanel} />)
    container.classList.add('has-content')
  } catch (error) {
    console.error(error)
  }
}

const insertContentToVideoCards = () => {
  const videoCards = document.querySelectorAll('.text-wrapper.ytd-video-renderer')
  videoCards.forEach((card) => {
    updateVideoCard(card as HTMLElement)
  })
}

insertPreviewPanel()
insertContentToVideoCards()

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        const card = node.querySelector('.text-wrapper.ytd-video-renderer')
        if (card) {
          updateVideoCard(card as HTMLElement)
        }
      }
    })
  })
})

observer.observe(document.body, { childList: true, subtree: true })
