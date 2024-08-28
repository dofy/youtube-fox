chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.type) {
    case 'getOptions':
      chrome.storage.sync.get(['options'], (result) => {
        sendResponse({ message: 'getOptions', options: result.options })
      })
      break
    default:
      sendResponse({ message: 'unknown request' })
      break
  }
  return true
})
