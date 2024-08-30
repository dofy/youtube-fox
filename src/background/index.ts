import { DefaultOptions } from '../contents'

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage()
})

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.type) {
    case 'getOptions':
      chrome.storage.sync.get(['options'], (result) => {
        sendResponse({
          message: 'getOptions',
          options: {
            ...DefaultOptions,
            ...result.options,
          },
        })
      })
      break
    case 'openOptionsPage':
      chrome.runtime.openOptionsPage()
      break
    default:
      sendResponse({ message: 'unknownMessageType' })
      console.error('Unknown Message Type')
      break
  }
  return true
})
