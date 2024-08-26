import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './Popup'
import '/global.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <ChakraProvider>
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  </ChakraProvider>,
)
