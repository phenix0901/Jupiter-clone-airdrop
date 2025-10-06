import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UltraTogglePanel() {
    const [mode, setMode] = useState("manual");
    const [slippage, setSlippage] = useState(0.5);
    const [feeMode, setFeeMode] = useState("priority");
    const [feeType, setFeeType] = useState("max");
    const [priorityFee, setPriorityFee] = useState(0.001);

    return (
        <div className="text-white rounded-2xl w-full max-w-xl mx-auto font-sans">
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

            {/* Info Section */}
            {mode === "auto" ? (
                <div className="border-none text-gray-300">
                    <div className="space-y-3 text-sm p-4">
                        <h2 className="text-[#b2f46b] font-semibold text-base flex items-center gap-1">
                            ✨ What is Ultra V2?
                        </h2>
                        <p>
                            Ultra V2 is designed to help you get the most out of every swap by
                            optimising for the transaction’s success rate and slippage.
                        </p>
                        <div>
                            <h3 className="text-white font-medium">Optimised Transaction Landing</h3>
                            <p>
                                Ultra V2 dynamically fine-tunes the optimal settings required to
                                land your transaction fast and successfully, while offering MEV
                                mitigation.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white font-medium">Real-Time Slippage Estimation (RTSE)</h3>
                            <ul className="list-disc list-inside space-y-1">
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
                            <p>
                                Not enough SOL to pay for gas fees? Ultra V2 will automatically
                                offer you a gasless trade, as long as the trade has a qualifying
                                value.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-none text-gray-300">
                    <div className="p-4 space-y-4 text-sm">
                        <div>
                            <div className="flex justify-between items-center">
                                <span>Max Slippage</span>
                                <div className="flex gap-2">
                                    {[0.5, 1, 0].map((v) => (
                                        <Button
                                            key={v}
                                            onClick={() => setSlippage(v)}
                                            className={`px-3 py-1 rounded-lg text-xs ${slippage === v
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

                        <div>
                            <span>Broadcast Mode</span>
                            <div className="flex gap-2 mt-2">
                                {["Priority Fees", "Jito", "Nozomi"].map((m) => (
                                    <Button
                                        key={m}
                                        onClick={() => setFeeMode(m.toLowerCase())}
                                        className={`px-3 py-1 rounded-lg text-xs ${feeMode === m.toLowerCase()
                                            ? "bg-[#4caf50] text-black"
                                            : "bg-[#232637] text-gray-400"
                                            }`}
                                    >
                                        {m}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span>Fee Type</span>
                            <div className="flex gap-2 mt-2">
                                {["Max Cap", "Exact Fee"].map((f) => (
                                    <Button
                                        key={f}
                                        onClick={() => setFeeType(f.toLowerCase())}
                                        className={`px-3 py-1 rounded-lg text-xs ${feeType === f.toLowerCase()
                                            ? "bg-[#4caf50] text-black"
                                            : "bg-[#232637] text-gray-400"
                                            }`}
                                    >
                                        {f}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span>Priority Fee</span>
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    type="number"
                                    value={priorityFee}
                                    onChange={(e) => setPriorityFee(parseFloat(e.target.value))}
                                    className="bg-[#232637] p-1 rounded text-sm w-24 text-center text-white"
                                />
                                <span>SOL</span>
                            </div>
                            <p className="text-xs text-gray-500">~${(priorityFee * 230).toFixed(2)}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <span>Use wSOL</span>
                            <Switch />
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Use Legacy Transaction</span>
                            <Switch />
                        </div>

                        <div>
                            <details className="bg-[#232637] rounded-xl p-2 cursor-pointer">
                                <summary className="text-gray-300">Routers</summary>
                                <p className="text-xs text-gray-500">2/2 routers are enabled.</p>
                            </details>
                        </div>

                        <div>
                            <details className="bg-[#232637] rounded-xl p-2 cursor-pointer">
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