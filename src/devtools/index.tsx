import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { DevTools } from './DevTools'
import '/global.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <DevTools />
    </ChakraProvider>
  </React.StrictMode>,
)

chrome.devtools.panels.create('ReactCrx', '', '../../devtools.html', function () {
  console.log('devtools panel create')
})
