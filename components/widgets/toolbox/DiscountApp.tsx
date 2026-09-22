"use client";

import { useState } from "react";

const DISCOUNT_URL = "https://ficp.fun/s/iZJdfm/?cid=P8GqhZF#/index/home";

const tips = [
  "今日暗号：领券再下单，钱包不伤心 💰",
  "折扣不迷路，省下就是赚到 🧭",
  "先领券后付款，老板看了都沉默 😎",
  "优惠券会过期，快乐不会 ✨",
  "打工人の倔强：能省一块是一块 💪",
];

export default function DiscountApp() {
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);

  return (
    <div className="flex flex-col h-full">
      {/* 折扣卡片 */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 text-white flex-1 flex flex-col justify-between min-h-[180px]">
        {/* 装饰光晕 */}
        <div className="pointer-events-none absolute -top-10 -right-8 w-36 h-36 rounded-full bg-white/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-6 w-28 h-28 rounded-full bg-yellow-300/40 blur-xl" />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur flex items-center justify-center text-xl font-black shadow-lg">
              💸
            </div>
            <div>
              <div className="text-lg font-black leading-tight tracking-wide">折扣工具</div>
              <div className="text-[11px] text-white/80">DISCOUNT HUB</div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-white/90">
            折扣情报站：领券、比价、优惠一站直达。省下的每一分钱，都是下顿饭的加餐。
          </p>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-2">
          <a
            href={DISCOUNT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl px-3 py-2.5 text-center transition-all duration-200 active:scale-95 bg-white text-orange-600 font-bold shadow-lg hover:shadow-xl"
          >
            <div className="text-[13px] flex items-center justify-center gap-1">
              去折扣专区
              <svg
                className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-[10px] opacity-70 mt-0.5">全网优惠聚合</div>
          </a>
          <a
            href="/"
            className="group rounded-xl px-3 py-2.5 text-center transition-all duration-200 active:scale-95 bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold"
          >
            <div className="text-[13px]">回本站首页</div>
            <div className="text-[10px] opacity-70 mt-0.5">星球 · 迷体小站</div>
          </a>
        </div>
      </div>

      {/* 今日暗号 */}
      <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-orange-300/60 dark:border-orange-500/30">
        <span className="text-sm shrink-0">🎫</span>
        <div>
          <div className="text-[10px] font-bold text-orange-500 dark:text-orange-400">今日折扣暗号</div>
          <div className="text-xs text-slate-600 dark:text-slate-300">{tip}</div>
        </div>
      </div>
    </div>
  );
}
