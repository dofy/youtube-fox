import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { SidePanel } from './SidePanel'
import '/global.css'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <SidePanel />
    </ChakraProvider>
  </React.StrictMode>,
)
