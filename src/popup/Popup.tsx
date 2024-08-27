import { useEffect, useState } from 'react'

export const Popup = () => {
  const [count, setCount] = useState(0)
  const link = 'https://github.com/guocaoyi/create-chrome-ext'

  const minus = () => {
    if (count > 0) setCount(count - 1)
  }

  const add = () => setCount(count + 1)

  useEffect(() => {
    try {
      chrome.storage.sync.get(['count'], (result) => {
        setCount(result.count || 0)
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    try {
      chrome.storage.sync.set({ count })
      chrome.runtime.sendMessage({ type: 'COUNT', count })
    } catch (e) {
      console.error(e)
    }
  }, [count])

  return (
    <main>
      <h1>Popup Page</h1>
      <div className="form-control">
        <button onClick={minus} disabled={count <= 0}>
          -
        </button>
        <div>{count}</div>
        <button onClick={add}>+</button>
      </div>
      <a href={link} target="_blank">
        generated by create-chrome-ext
      </a>
    </main>
  )
}

export default Popup
