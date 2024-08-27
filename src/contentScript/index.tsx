import { createRoot } from 'react-dom/client'
import { Content } from './Content'
import { PreviewPanel } from './PreviewPanel'
import './index.css'
import { Caption } from '@dofy/youtube-caption-fox'

const openPreviewPanel = (videoId: string, captions: Caption[]) => {
  const previewPanel = document.getElementById('preview-panel')
  previewPanel?.classList.add('active')
  const videoIdElement = previewPanel?.querySelector('#video-id')
  if (videoIdElement) {
    videoIdElement.innerHTML = videoId
  }
  const videoCaptions = previewPanel?.querySelector('#video-captions')
  if (videoCaptions) {
    videoCaptions.innerHTML = ''
    captions.forEach((caption) => {
      const captionElement = document.createElement('div')
      captionElement.classList.add('caption')
      const captionStart = document.createElement('span')
      captionStart.classList.add('caption-item')
      const captionDur = document.createElement('span')
      captionDur.classList.add('caption-item')
      const captionText = document.createElement('span')
      captionText.classList.add('caption-text')

      captionStart.innerHTML = caption.start.toFixed(2)
      captionDur.innerHTML = caption.dur.toFixed(2)
      captionText.innerHTML = caption.text

      captionElement.appendChild(captionStart)
      captionElement.appendChild(captionDur)
      captionElement.appendChild(captionText)

      videoCaptions.appendChild(captionElement)
    })
  }
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
  } catch (error) {}
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
