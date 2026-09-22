"use client";
import { useState } from "react";
const MIYING_TV_URL = "https://tv.miti.cc.cd/";
const tips = [
  "开启你的私人影厅 🎬",
  "光影流转，好戏正在上演 ✨",
  "戴上耳机，沉浸式观影体验",
  "好片不等人，速来打卡",
  "每一部影片，都是一段平行宇宙"
];
export default function MiyingTVApp() {
  const [tip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);
  return (
    <div className="flex flex-col h-full">
      {/* 迷影TV主卡片 蓝紫科技渐变 */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 text-white flex-1 flex flex-col justify-between min-h-[180px]">
        {/* 装饰光晕 */}
        <div className="pointer-events-none absolute -top-10 -right-8 w-36 h-36 rounded-full bg-white/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-6 w-28 h-28 rounded-full bg-fuchsia-300/40 blur-xl" />
        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur flex items-center justify-center text-xl font-black shadow-lg">
              🎬
            </div>
            <div>
              <div className="text-lg font-black leading-tight tracking-wide">迷影・TV</div>
              <div className="text-[11px] text-white/80">MIYING TV STATION</div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-white/90">
            影视交互控制台：影片推荐、实时聊房、片单预约一站式观影空间。
          </p>
        </div>
        <div className="relative mt-5 grid grid-cols-2 gap-2">
          <a
            href={MIYING_TV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl px-3 py-2.5 text-center transition-all duration-200 active:scale-95 bg-white text-violet-600 font-bold shadow-lg hover:shadow-xl"
          >
            <div className="text-[13px] flex items-center justify-center gap-1">
              立即进入
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
            <div className="text-[10px] opacity-70 mt-0.5">私人影视空间</div>
          </a>
          <a
            href="/"
            className="group rounded-xl px-3 py-2.5 text-center transition-all duration-200 active:scale-95 bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold"
          >
            <div className="text-[13px]">我的片单</div>
            <div className="text-[10px] opacity-70 mt-0.5">迷影收藏夹</div>
          </a>
        </div>
      </div>
      {/* 底部随机文案卡片 */}
      <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-violet-300/60 dark:border-violet-500/30">
        <span className="text-sm shrink-0">🎞️</span>
        <div>
          <div className="text-[10px] font-bold text-violet-500 dark:text-violet-400">影厅提示</div>
          <div className="text-xs text-slate-600 dark:text-slate-300">{tip}</div>
        </div>
      </div>
    </div>
  );
}
