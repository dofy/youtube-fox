import { createRoot } from 'react-dom/client'
import { Content } from './Content'
import '/global.css'

const insertButtonToVideoCards = () => {
  const videoCards = document.querySelectorAll('.text-wrapper.ytd-video-renderer')

  videoCards.forEach((card) => {
    const videoTitle = (card.querySelector('#video-title') as HTMLElement).innerText
    console.log('🚀 ~ videoCards.forEach ~ videoTitle:', videoTitle)
    const videoUrl = (card.querySelector('#video-title') as HTMLAnchorElement).href
    const videoId = new URL(videoUrl).searchParams.get('v')
    console.log('🚀 ~ videoCards.forEach ~ videoId:', videoId)

    const container = document.createElement('div')
    card.appendChild(container)
    createRoot(container).render(<Content />)
  })
}

insertButtonToVideoCards()
