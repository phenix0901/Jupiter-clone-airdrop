import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Info } from "lucide-react";

export default function UltraTogglePanel({ toggleModal }: {
    toggleModal: () => void
}) {
    const [mode, setMode] = useState("manual");
    const [slippage, setSlippage] = useState(0.5);
    const [feeMode, setFeeMode] = useState("priority");
    const [feeType, setFeeType] = useState("max");
    const [priorityFee, setPriorityFee] = useState(0.001);

    return (
        <div className="text-white rounded-2xl w-full max-w-xl mx-auto font-sans">
            <div className="bg-gray-900 p-6 rounded-t-lg border-b">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-bold">Swap Settings</h2>
                    <span className="cursor-pointer text-xl" onClick={toggleModal}>&times;</span>
                </div>
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex bg-black rounded-full overflow-hidden w-full p-1">
                        <Button
                            onClick={() => setMode("auto")}
                            className={`w-1/2 px-4 py-1 text-sm rounded-full ${mode === "auto" ? "text-green-500 bg-[#c7f284]/10" : "bg-transparent text-gray-400"
                                }`}
                        >
                            ✨ Ultra V2
                        </Button>
                        <Button
                            onClick={() => setMode("manual")}
                            className={`w-1/2 px-4 py-1 text-sm rounded-full ${mode === "manual" ? "text-green-500 bg-[#c7f284]/10" : "bg-transparent text-gray-400"
                                }`}
                        >
                            Manual
                        </Button>
                    </div>
                </div>
            </div>
            {/* Info Section */}
            {mode === "auto" ? (
                <div className="bg-[#0d151e] text-gray-300 rounded-b-lg">
                    <div className="space-y-3 text-sm p-4">
                        <h2 className="font-semibold text-base flex items-center gap-1">
                            ✨ What is Ultra V2?
                        </h2>
                        <p className="text-xs text-neutral-500">
                            Ultra V2 is designed to help you get the most out of every swap by optimising for the transaction’s success rate and slippage.
                        </p>
                        <div>
                            <h3 className="text-white font-medium">Optimised Transaction Landing</h3>
                            <p className="text-xs text-neutral-500">
                                Ultra V2 dynamically fine-tunes the optimal settings required to
                                land your transaction fast and successfully, while offering MEV
                                mitigation.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white font-medium">Real-Time Slippage Estimation (RTSE)</h3>
                            <ul className="list-disc list-inside space-y-1 text-xs text-neutral-500">
                                <li>Analysing current market conditions</li>
                                <li>Monitoring price impact and volatility</li>
                                <li>
                                    Adjusting slippage settings automatically to balance trade
                                    success and price protection
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-medium">Gasless Support</h3>
                            <p className="text-xs text-neutral-500">
                                Not enough SOL to pay for gas fees? Ultra V2 will automatically
                                offer you a gasless trade, as long as the trade has a qualifying
                                value.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-[#0d151e] text-gray-300 rounded-b-lg">
                    <div className="p-4 space-y-4  text-xs font-semibold text-gray-400">
                        <div className="pb-2 border-b">
                            <div className="flex justify-between items-center">
                                <div className="flex flex-row items-center">
                                    <span>Max Slippage</span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info size={16} className="ml-1" />
                                        </TooltipTrigger>
                                        <TooltipContent className="z-100 bg-gray-900 text-gray-400 border">
                                            Set a fixed slippage and the exact value will be used. This only applies for Metis and DFlow aggregators.
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                                <div className="flex bg-black rounded-full overflow-hidden p-1 gap-2">
                                    {[0.5, 1, 0].map((v) => (
                                        <Button
                                            key={v}
                                            onClick={() => setSlippage(v)}
                                            className={`px-4 rounded-full text-xs ${slippage === v
                                                ? "bg-[#4caf50] text-black"
                                                : "bg-[#232637] text-gray-400"
                                                }`}
                                        >
                                            {v}%
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex flex-row items-center">
                                <span>Broadcast Mode</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={16} className="ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent className="z-100 bg-gray-900 text-gray-400 border">
                                        Send your transactions via either PriorityFees, Jito or Both!
                                        <ul className="list-disc list-inside text-xs">
                                            <li>Jito for MEV protection</li>
                                            <li>Both for better landing rate but may spend more fees</li>
                                        </ul>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="flex gap-2 mt-2 bg-[#232637] rounded-full p-2">
                                {["Priority Fees", "Jito", "Nozomi"].map((m) => (
                                    <>
                                        <span>{m}</span>
                                        <Switch />
                                    </>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex flex-row items-center">
                                <span>Fee Type</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={16} className="ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent className="z-100 bg-gray-900 text-gray-400 border">
                                        <div>
                                            <div>For Max Cap, Jupiter will intelligently minimize your fees.</div>
                                            <div>Or use Exact Fee to specify your own fee value</div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex bg-black rounded-full overflow-hidden w-full p-1">
                                    <Button
                                        onClick={() => setFeeType("max")}
                                        className={`w-1/2 px-4 py-1 rounded-full ${feeType === "max" ? "text-green-500 bg-[#c7f284]/10" : "bg-transparent text-gray-400"
                                            }`}
                                    >
                                        Max Cap
                                    </Button>
                                    <Button
                                        onClick={() => setFeeType("exact")}
                                        className={`w-1/2 px-4 py-1 rounded-full ${feeType === "exact" ? "text-green-500 bg-[#c7f284]/10" : "bg-transparent text-gray-400"
                                            }`}
                                    >
                                        Exact Fee
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-b pb-2">
                            <div className="flex flex-row items-center">
                                <span>Priority Fee</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={16} className="ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent className="z-100 bg-gray-900 text-gray-400 border">
                                        <div>
                                            <div>Will'll adjust transaction fee based on market conditions,</div>
                                            <div> up to your max.</div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2 mt-1 bg-black px-2 rounded-md">
                                    <input
                                        type="number"
                                        value={priorityFee}
                                        onChange={(e) => setPriorityFee(parseFloat(e.target.value))}
                                        className="p-1 rounded text-sm w-24 text-center text-white"
                                    />
                                    <span>SOL</span>
                                </div>
                                <p className="text-xs text-gray-500">~${(priorityFee * 230).toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex flex-row items-center">
                                <span>Use wSOL</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={16} className="ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent className="z-100 bg-gray-900 text-gray-400 border">
                                        Use Wrapped SOL instead of Native SOL.
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-row items-center">
                                <span>Use Legacy Transaction</span>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info size={16} className="ml-1" />
                                    </TooltipTrigger>
                                    <TooltipContent className="z-100 bg-gray-900 text-gray-400 border">
                                        <div>
                                            <div>Legacy Transaction is a significant downgrade that allows</div>
                                            <div>for less advanced routings and worse prices.</div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Switch />
                        </div>

                        <div>
                            <details className="bg-black rounded-xl p-2 cursor-pointer">
                                <summary className="text-gray-300">Routers</summary>
                                <p className="text-xs text-gray-500">2/2 routers are enabled.</p>
                            </details>
                        </div>

                        <div>
                            <details className="bg-black rounded-xl p-2 cursor-pointer">
                                <summary className="text-gray-300">AMM sources</summary>
                                <p className="text-xs text-gray-500">60/60 AMM are enabled.</p>
                            </details>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}