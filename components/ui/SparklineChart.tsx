'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(
  () => import('react-apexcharts').then((mod) => mod.default),
  { ssr: false }
);

interface PricePoint {
  x: number;
  y: number;
}

export default function SparklineChart({
  coinId = 'solana',
  coinName = 'SOL',
  vsCurrency = 'usd',
  days = 10,
  address = 'So11...1112',
  decimals = 4,
}: {
  coinId?: string;
  coinName?: string;
  vsCurrency?: string;
  days?: number;
  address?: string;
  decimals?: number;
}) {
  const [series, setSeries] = useState<{ name: string; data: PricePoint[] }[]>([
    { name: coinName, data: [] },
  ]);
  const [iconUrl, setIconUrl] = useState<string>('');

  useEffect(() => {
    async function fetchCoinPrice() {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`
        );
        const data = await res.json();

        const priceData: PricePoint[] = data.prices.map((p: [number, number]) => ({
          x: p[0],
          y: parseFloat(p[1].toFixed(6)),
        }));

        setSeries([{ name: coinName, data: priceData }]);
      } catch (err) {
        console.error('Failed to fetch coin price', err);
      }
    }

    async function fetchCoinIcon() {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        const data = await res.json();
        setIconUrl(data.image.small); // small icon ~32x32
      } catch (err) {
        console.error('Failed to fetch coin icon', err);
      }
    }

    fetchCoinPrice();
    setInterval(fetchCoinPrice, 30000);
  }, [coinId, vsCurrency, days]);

  const getYAxisRange = (data: PricePoint[]) => {
    if (!data || data.length === 0) return { min: 0, max: 1 };
    const prices = data.map((p) => p.y);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const margin = (maxPrice - minPrice) * 0.2 || 0.00005;
    return { min: minPrice - margin, max: maxPrice + margin };
  };

  const { min: yMin, max: yMax } =
    series[0].data.length > 0 ? getYAxisRange(series[0].data) : { min: 0, max: 1 };

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 100,
      sparkline: { enabled: true },
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { curve: 'smooth', width: 2.5, colors: ['#00ffcc'] },
    colors: ['#00ffcc'],
    fill: { type: 'solid', colors: ['#00ffcc'], opacity: 0.7 },
    markers: { size: 0, hover: { size: 6 }, strokeColors: '#0d1117' },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }: any) {
        const raw = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const ts = new Date(raw.x);
        const timeLabel = ts.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
        const price = raw.y;
        return `
          <div style="
            background: rgba(13,17,23,1);
            color: #fff;
            padding: 8px 10px;
            border-radius: 8px;
            font-size: 12px;
            box-shadow: 0 6px 18px rgba(2,6,23,0.6);
            min-width: 90px;
          ">
            <div style="opacity:0.85; font-size:11px; margin-bottom:4px;">${timeLabel}</div>
            <div style="font-weight:600;">$${Number(price).toFixed(6)}</div>
          </div>
        `;
      },
    },
    xaxis: { type: 'datetime', labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false } },
    yaxis: { show: false, min: yMin, max: yMax },
    grid: { show: false },
  };

  const latestPrice = series[0].data.length > 0 ? series[0].data[series[0].data.length - 1].y : 0;
  const firstPrice = series[0].data.length > 0 ? series[0].data[0].y : 0;
  const changePercent = firstPrice ? ((latestPrice - firstPrice) / firstPrice) * 100 : 0;

  return (
    <div
      style={{
        width: '250px',
        background: '#0d1117',
        borderRadius: '12px',
        padding: '16px',
        color: '#fff',
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue"',
      }}
    >
      {/* Header with icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {iconUrl && <img src={iconUrl} alt={coinName} style={{ width: 24, height: 24, borderRadius: 12 }} />}
          <div>
            <div style={{ fontWeight: 700 }}>{coinName}</div>
            <div style={{ fontSize: 12, color: '#8b949e' }}>
              {address.slice(0, 4) + '...' + address.slice(-4)}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700 }}>${latestPrice.toFixed(decimals)}</div>
          <div style={{ fontSize: 12, color: changePercent >= 0 ? '#00ff99' : '#ff4d4d' }}>
            {changePercent >= 0 ? '+' : ''}
            {changePercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <ReactApexChart options={options} series={series} type="line" height={50} />

      <a href={`https://dexscreener.com/solana/${address}`} target="_blank">
        <div style={{ fontSize: 12, color: '#58a6ff', marginTop: 8, cursor: 'pointer' }}>Open Page →</div>
      </a>
    </div>
  );
}
