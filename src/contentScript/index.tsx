import { createRoot } from 'react-dom/client'
import { Content } from './Content'
import '/global.css'

const insertButtonToVideoCards = () => {
  const videoCards = document.querySelectorAll('.text-wrapper.ytd-video-renderer')

  videoCards.forEach((card) => {
    const container = document.createElement('div')
    card.appendChild(container)
    createRoot(container).render(<Content />)
  })
}

// 初始加载的卡片处理
insertButtonToVideoCards()
