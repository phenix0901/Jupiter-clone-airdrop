import { solanaWeb3JsAdapter, projectId, networks } from '@/config'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'

// Set up metadata
const metadata = {
  name: 'next-reown-appkit',
  description: 'next-reown-appkit',
  url: 'https://robinadminserver.xyz', // origin must match your domain & subdomain
  icons: []
}

// Create the modal
export const modal = createAppKit({
  allWallets: 'SHOW',
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks,
  metadata: metadata,
  themeMode: 'dark',
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    connectMethodsOrder: ['wallet'],
    emailShowWallets: true,
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  },
  debug: false,
  enableWalletGuide: true,
  enableCoinbase: false,
  enableWalletConnect: false,
  enableReconnect: false,
  enableAuthLogger: false,
})

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  )
}

export default ContextProvider
