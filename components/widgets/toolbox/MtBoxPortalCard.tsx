"use client";
import { useState, useEffect, useRef } from "react";

const MT_BOX_URL = "https://w.miti.cc.cd";

type NavItem = {
  id: string;
  label: string;
};

type CardItem = {
  id: string;
  title: string;
  desc: string;
  tag: string;
  color: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "首页" },
  { id: "single", label: "单机" },
  { id: "mobile", label: "手游" },
  { id: "switch", label: "Switch" },
  { id: "mod", label: "MOD" },
];

const cards: CardItem[] = [
  {
    id: "hot",
    title: "热门资源",
    desc: "全网热门游戏一键入库",
    tag: "热门",
    color: "#fb923c",
  },
  {
    id: "latest",
    title: "最新更新",
    desc: "今日新增 328 个资源",
    tag: "今日更新",
    color: "#22d3ee",
  },
  {
    id: "mod",
    title: "MOD 合集",
    desc: "模组、补丁、扩展资源聚合",
    tag: "MOD",
    color: "#a78bfa",
  },
];

export default function MtBoxPortalCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  const rotateX = isHover ? -mouse.y / 50 : 0;
  const rotateY = isHover ? mouse.x / 50 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8"
      style={{
        perspective: "1200px",
        background:
          "radial-gradient(900px 500px at 20% 30%, rgba(251,146,60,0.12), rgba(34,211,238,0.08) 45%, rgba(15,23,42,0.85) 70%, #070a13 100%)",
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => {
        setIsHover(false);
        setMouse({ x: 0, y: 0 });
      }}
    >
      {/* 背景网格 */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 顶部标题 */}
      <div className="relative z-20 mb-6 md:mb-8">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider"
          style={{
            background: "linear-gradient(90deg,#ffffff,#fb923c,#22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 12px rgba(251,146,60,0.45))",
          }}
        >
          MT·BOX
        </h2>
        <p className="mt-1 text-slate-300 opacity-70 text-sm md:text-base">
          迷体星球 · 全网游戏资源聚合
        </p>
        <p className="mt-0.5 text-slate-400 text-xs md:text-sm">
          优质游戏资源 · 免费 · 持续更新 · 单机 / 手游 / Switch / MOD 一站式聚合
        </p>
      </div>

      {/* 主体区域 */}
      <div
        className="relative z-10 grid grid-cols-12 gap-4 md:gap-6"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHover ? "none" : "transform 0.6s ease-out",
        }}
      >
        {/* 左侧导航 */}
        <div className="col-span-12 sm:col-span-3 md:col-span-2">
          <div className="rounded-2xl p-3 md:p-4 bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-xs text-slate-400 mb-2 px-2">导航</div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all mb-1 ${
                  activeNav === item.id
                    ? "text-white"
                    : "text-slate-300 hover:text-white"
                }`}
                style={{
                  background:
                    activeNav === item.id
                      ? "linear-gradient(90deg, rgba(251,146,60,0.35), rgba(34,211,238,0.25))"
                      : "transparent",
                  boxShadow:
                    activeNav === item.id
                      ? "0 0 18px rgba(251,146,60,0.35)"
                      : "none",
                  border:
                    activeNav === item.id
                      ? "1px solid rgba(251,146,60,0.5)"
                      : "1px solid transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 中央推荐卡 */}
        <div className="col-span-12 sm:col-span-9 md:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="relative rounded-2xl p-4 cursor-pointer overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                  border: `1px solid ${card.color}55`,
                  boxShadow: `0 0 18px ${card.color}33`,
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${(index + 1) * 4}px)`,
                  transition: "transform 0.35s ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateZ(24px) scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `translateZ(${(index + 1) * 4}px)`;
                }}
              >
                <div
                  className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: card.color + "33",
                    color: card.color,
                    border: `1px solid ${card.color}66`,
                  }}
                >
                  {card.tag}
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base">
                  {card.title}
                </h3>
                <p className="text-slate-300 text-xs mt-1">{card.desc}</p>
                <div
                  className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-20 blur-xl"
                  style={{ background: card.color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 右侧主按钮 */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col gap-3 md:gap-4">
          <a
            href={MT_BOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center rounded-2xl py-5 text-center cursor-pointer transition-all"
            style={{
              background:
                "linear-gradient(135deg, #fb923c, #f43f5e 50%, #a78bfa)",
              boxShadow: "0 0 28px rgba(251,146,60,0.5)",
              transformStyle: "preserve-3d",
              transform: "translateZ(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateZ(28px) scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateZ(8px)";
            }}
          >
            <div className="text-white text-xs opacity-80 mb-1">立即进入</div>
            <div className="text-white text-lg md:text-xl font-black">
              打开百宝箱
            </div>
            <div className="mt-2 flex gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
          </a>

          {/* 状态面板 */}
          <div className="rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-xs text-slate-400 mb-2">资源状态</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-xs">在线资源</span>
              <span className="text-white font-bold text-sm">12,860</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-300 text-xs">今日更新</span>
              <span className="text-cyan-300 font-bold text-sm">+328</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-xs">运行状态</span>
              <span className="text-emerald-300 text-xs">● 正常</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="relative z-20 mt-6 md:mt-8 flex flex-wrap gap-2 text-[11px] md:text-xs">
        <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
          免费
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
          持续更新
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
          单机 / 手游 / Switch / MOD
        </span>
        <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
          一站式聚合
        </span>
      </div>

      {/* 轻喜剧像素装饰 */}
      <div className="pointer-events-none absolute right-6 bottom-10 text-2xl opacity-80">
        🎮
      </div>
      <div className="pointer-events-none absolute left-1/3 bottom-6 text-xl opacity-70">
        ⭐
      </div>
      <div className="pointer-events-none absolute right-1/4 top-20 text-lg opacity-60">
        📦
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
