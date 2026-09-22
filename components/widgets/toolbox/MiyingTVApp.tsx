"use client";
import { useState, useEffect } from "react";

const MIYING_TV_URL = "https://tv.miti.cc.cd";
const HOME_URL = "/";

const tips = [
  "开启你的私人影厅 🎬",
  "光影流转，好戏正在上演 ✨",
  "戴上耳机，沉浸式观影体验",
  "好片不等人，速来打卡",
  "每一部影片，都是一段平行宇宙",
];

type ModuleItem = {
  id: string;
  label: string;
  desc: string;
  color: string;
  glow: string;
  position: "left" | "right";
};

const modules: ModuleItem[] = [
  {
    id: "recommend",
    label: "推荐影片",
    desc: "今日精选片单",
    color: "#7cc7ff",
    glow: "0 0 18px rgba(124,199,255,0.5)",
    position: "left",
  },
  {
    id: "live-chat",
    label: "实时聊房",
    desc: "边看边聊同频",
    color: "#a78bfa",
    glow: "0 0 18px rgba(167,139,250,0.5)",
    position: "left",
  },
  {
    id: "rank",
    label: "人气榜单",
    desc: "热门正在飙升",
    color: "#22d3ee",
    glow: "0 0 18px rgba(34,211,238,0.5)",
    position: "left",
  },
  {
    id: "reservation",
    label: "我的预约",
    desc: "开播提醒不缺席",
    color: "#818cf8",
    glow: "0 0 18px rgba(129,140,248,0.5)",
    position: "right",
  },
  {
    id: "danmaku",
    label: "弹幕设置",
    desc: "自定义观影氛围",
    color: "#38bdf8",
    glow: "0 0 18px rgba(56,189,248,0.5)",
    position: "right",
  },
  {
    id: "more",
    label: "更多功能",
    desc: "扩展观影空间",
    color: "#c4b5fd",
    glow: "0 0 18px rgba(196,181,253,0.5)",
    position: "right",
  },
];

export default function MiyingTVApp() {
  const [tipText, setTipText] = useState(tips[0]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipText(randomTip);
  }, []);

  const leftModules = modules.filter((m) => m.position === "left");
  const rightModules = modules.filter((m) => m.position === "right");

  return (
    <div className="relative w-full min-h-[520px] rounded-3xl overflow-hidden text-white">
      {/* 背景 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 40%, rgba(56,189,248,0.18), rgba(30,41,80,0.75) 55%, rgba(10,12,24,0.95) 100%)",
        }}
      />

      {/* 网格底纹 */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,199,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,199,255,0.08) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(600px 320px at 50% 42%, black 40%, transparent 75%)",
        }}
      />

      {/* 顶部频谱装饰 */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none opacity-70">
        <div className="absolute inset-0 flex items-end justify-center gap-[3px] px-6">
          {Array.from({ length: 64 }).map((_, i) => {
            const height = 14 + ((i * 7) % 40);
            const color = i % 2 === 0 ? "#7cc7ff" : "#a78bfa";
            return (
              <div
                key={i}
                style={{
                  width: 3,
                  height: `${height}px`,
                  background: color,
                  borderRadius: 2,
                  opacity: 0.35 + ((i * 13) % 40) / 100,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 底部频谱装饰 */}
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none opacity-50">
        <div className="absolute inset-0 flex items-start justify-center gap-[3px] px-6">
          {Array.from({ length: 48 }).map((_, i) => {
            const height = 10 + ((i * 11) % 28);
            return (
              <div
                key={i}
                style={{
                  width: 3,
                  height: `${height}px`,
                  background: i % 2 === 0 ? "#a78bfa" : "#22d3ee",
                  borderRadius: 2,
                  opacity: 0.3 + ((i * 17) % 30) / 100,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 标题 */}
      <div className="relative z-10 flex items-center justify-center pt-8">
        <div className="flex items-center gap-3">
          <span
            className="text-3xl font-black tracking-wider"
            style={{
              background:
                "linear-gradient(180deg,#ffffff 0%, #c7e7ff 35%, #7cc7ff 70%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 10px rgba(124,199,255,0.55))",
            }}
          >
            迷影·TV
          </span>
        </div>
      </div>

      {/* 主体座舱 */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-6 mt-4">
        {/* 左侧卡片 */}
        <div className="flex flex-col gap-3 w-[28%] min-w-[140px]">
          {leftModules.map((m) => (
            <ModuleCard
              key={m.id}
              module={m}
              active={activeId === m.id}
              onHover={setActiveId}
            />
          ))}
        </div>

        {/* 中心圆环区域 */}
        <div className="flex flex-col items-center justify-center relative">
          {/* 外圈静态光晕 */}
          <div
            className="absolute w-56 h-56 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.25), rgba(167,139,250,0.12) 55%, transparent 70%)",
            }}
          />

          {/* 旋转主环 */}
          <div
            className="relative w-40 h-40 rounded-full"
            style={{
              animation: "miying-spin 14s linear infinite",
              background:
                "conic-gradient(from 0deg, rgba(124,199,255,0.9), rgba(34,211,238,0.55), rgba(167,139,250,0.75), rgba(129,140,248,0.6), rgba(124,199,255,0.9))",
              boxShadow:
                "0 0 30px rgba(124,199,255,0.45), inset 0 0 24px rgba(10,14,30,0.9)",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-[2px]"
                style={{
                  left: "50%",
                  top: "50%",
                  background: "rgba(199,231,255,0.85)",
                  transform: `translate(-50%,-50%) rotate(${i * 30}deg) translateY(-77px)`,
                  borderRadius: 2,
                }}
              />
            ))}
          </div>

          {/* 静止内芯 */}
          <div
            className="absolute w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, #1e2a55 0%, #0f1736 45%, #07091a 100%)",
              border: "1px solid rgba(124,199,255,0.45)",
              boxShadow:
                "inset 0 0 20px rgba(56,189,248,0.35), 0 0 18px rgba(124,199,255,0.25)",
            }}
          >
            {/* 播放按钮 */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => window.open(MIYING_TV_URL, "_blank")}
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #eaf6ff, #7cc7ff 40%, #6366f1 100%)",
                boxShadow:
                  "0 0 25px rgba(124,199,255,0.85), inset 0 -4px 10px rgba(30,64,175,0.55)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#07121f">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* 中心标题 */}
          <div className="mt-6 text-center">
            <div
              className="text-sm tracking-[0.3em] text-white/70"
              style={{ textShadow: "0 0 10px rgba(124,199,255,0.5)" }}
            >
              MIYING TV
            </div>
            <div className="text-xs text-white/40 mt-1">影视交互控制台</div>
          </div>
        </div>

        {/* 右侧卡片 */}
        <div className="flex flex-col gap-3 w-[28%] min-w-[140px]">
          {rightModules.map((m) => (
            <ModuleCard
              key={m.id}
              module={m}
              active={activeId === m.id}
              onHover={setActiveId}
            />
          ))}
        </div>
      </div>

      {/* 底部按钮区 */}
      <div className="relative z-10 flex items-center justify-center gap-4 mt-6 px-6">
        <a
          href={MIYING_TV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 max-w-[220px] py-3 rounded-2xl font-bold text-center transition-all active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, #eaf6ff 0%, #7cc7ff 40%, #6366f1 100%)",
            color: "#07121f",
            boxShadow:
              "0 10px 30px rgba(124,199,255,0.45), inset 0 -4px 10px rgba(30,64,175,0.45)",
          }}
        >
          立即进入
        </a>
        <a
          href={HOME_URL}
          className="flex-1 max-w-[220px] py-3 rounded-2xl font-semibold text-center transition-all active:scale-95"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(124,199,255,0.35)",
            color: "#d6e4ff",
            boxShadow: "0 0 18px rgba(56,189,248,0.25)",
          }}
        >
          我的片单
        </a>
      </div>

      {/* 底部提示 */}
      <div className="relative z-10 text-center mt-4 pb-5 text-sm text-white/70">
        {tipText}
      </div>

      {/* 全局动画样式 */}
      <style>{`
        @keyframes miying-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ModuleCard({
  module,
  active,
  onHover,
}: {
  module: ModuleItem;
  active: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <div
      onMouseEnter={() => onHover(module.id)}
      onMouseLeave={() => onHover(null)}
      className="relative rounded-2xl p-3 cursor-pointer transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        border: `1px solid ${active ? module.color : "rgba(124,199,255,0.18)"}`,
        boxShadow: active
          ? module.glow
          : "inset 0 0 20px rgba(56,189,248,0.08)",
        transform: active ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: `${module.color}22`,
            border: `1px solid ${module.color}55`,
            color: module.color,
            boxShadow: `0 0 12px ${module.color}44`,
          }}
        >
          <ModuleIcon id={module.id} />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">
            {module.label}
          </div>
          <div className="text-[11px] text-white/50 truncate">{module.desc}</div>
        </div>
      </div>
    </div>
  );
}

function ModuleIcon({ id }: { id: string }) {
  switch (id) {
    case "recommend":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16v16H4z" opacity="0.2" />
          <path d="M8 17l4-5 3 3 2-2 3 4z" />
        </svg>
      );
    case "live-chat":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "rank":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 17l6-6 4 4 8-8" />
        </svg>
      );
    case "reservation":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "danmaku":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 5h18v10H3zM7 19h10" />
        </svg>
      );
    case "more":
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      );
  }
}
