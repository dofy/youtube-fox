import { createRoot } from 'react-dom/client'
import { Content } from './Content'
import '/global.css'

const insertButtonToVideoCards = () => {
  const videoCards = document.querySelectorAll('.text-wrapper.ytd-video-renderer')

  videoCards.forEach((card) => {
    const videoTitle = (card.querySelector('#video-title') as HTMLElement).innerText
    const videoUrl = (card.querySelector('#video-title') as HTMLAnchorElement).href
    const videoId = new URL(videoUrl).searchParams.get('v')
    const container = document.createElement('div')
    card.appendChild(container)
    createRoot(container).render(<Content videoId={videoId!} videoTitle={videoTitle} />)
  })
}

insertButtonToVideoCards()
