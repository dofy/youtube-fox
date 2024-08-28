import { Caption } from '@dofy/youtube-caption-fox'
import { createRoot, Root } from 'react-dom/client'
import { UserOptions } from '../types'
import { Content } from './Content'
import { PreviewContent } from './PreviewContent'
import { PreviewPanel } from './PreviewPanel'
import './index.css'

const globalObjectMap: {
  options?: UserOptions
  containers: {
    previewContent?: Root
  }
} = {
  containers: {},
}

const openPreviewPanel = (videoId: string, captions: Caption[]) => {
  const previewPanel = document.getElementById('preview-panel')
  previewPanel?.classList.add('active')

  if (!globalObjectMap.containers.previewContent) {
    const videoCaptions = document.getElementById('preview-content')
    globalObjectMap.containers.previewContent = createRoot(videoCaptions!)
  }
  globalObjectMap.containers.previewContent?.render(
    <PreviewContent videoId={videoId} captions={captions} />,
  )
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

    createRoot(container).render(
      <Content
        videoId={videoId!}
        options={globalObjectMap.options!}
        openPreviewPanel={openPreviewPanel}
      />,
    )
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

// begin!!!
chrome.runtime.sendMessage({ type: 'getOptions' }, (response) => {
  globalObjectMap.options = response.options

  insertPreviewPanel()
  insertContentToVideoCards()

  observer.observe(document.body, { childList: true, subtree: true })
})
