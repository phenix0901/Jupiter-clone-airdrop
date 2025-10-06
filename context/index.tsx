'use client'

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
  coinbasePreference: 'smartWalletOnly',
  enableWalletConnect: false,
  enableReconnect: false,
  enableAuthLogger: false,
  featuredWalletIds: [
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",
    "1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79"
  ]
})

function ContextProvider({ children }: { children: ReactNode }) {
  return (
    <>{children}</>
  )
}

export default ContextProvider
