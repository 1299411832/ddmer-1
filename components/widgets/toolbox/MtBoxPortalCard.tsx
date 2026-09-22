"use client";
import { useState, useEffect, useRef } from "react";

const MT_BOX_URL = "https://w.miti.cc.cd";

type PortalCard = {
  id: string;
  title: string;
  subTitle: string;
  color: string;
};

const cardList: PortalCard[] = [
  {
    id: "game-single",
    title: "单机游戏",
    subTitle: "海量单机资源库",
    color: "#fb923c",
  },
  {
    id: "game-mobile",
    title: "手游专区",
    subTitle: "手机游戏合集",
    color: "#f43f5e",
  },
  {
    id: "game-switch",
    title: "Switch游戏",
    subTitle: "掌机游戏资源",
    color: "#a855f7",
  },
  {
    id: "mod-resource",
    title: "MOD模组",
    subTitle: "游戏模组资源",
    color: "#22c55e",
  },
  {
    id: "update-log",
    title: "持续更新",
    subTitle: "资源实时维护",
    color: "#3b82f6",
  },
  {
    id: "resource-stats",
    title: "资源统计",
    subTitle: "万级游戏资源仓库",
    color: "#06b6d4",
  },
];

export default function MtBoxPortalCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHoverContainer, setIsHoverContainer] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMouse({ x, y });
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rotateX = isHoverContainer ? -mouse.y / 45 : 0;
  const rotateY = isHoverContainer ? mouse.x / 45 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8"
      style={{
        perspective: "1200px",
        background:
          "radial-gradient(900px 500px at 50% 40%, rgba(251,146,60,0.14), rgba(15,23,42,0.85) 50%, #070a13 100%)",
      }}
      onMouseEnter={() => setIsHoverContainer(true)}
      onMouseLeave={() => {
        setIsHoverContainer(false);
        setMouse({ x: 0, y: 0 });
      }}
    >
      {/* 背景网格 */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251,146,60,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,146,60,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 中心标题区域，和迷影TV保持一致 */}
      <div className="relative z-20 text-center mb-6 md:mb-10">
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
        <p className="mt-2 text-slate-300 opacity-70 text-sm md:text-base">
          迷体星球·全网游戏资源聚合
        </p>
        <p className="mt-1 text-slate-400 text-xs md:text-sm">
          优质游戏资源 · 免费 · 持续更新 · 单机 / 手游 / Switch / MOD 一站式聚合
        </p>
      </div>

      {/* 3D卡片容器，响应式网格：手机1列，平板2列，桌面3列，和迷影TV完全相同 */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: isHoverContainer ? "none" : "transform 0.6s ease-out",
        }}
      >
        {cardList.map((card, index) => (
          <PortalItemCard key={card.id} card={card} index={index} />
        ))}
      </div>

      {/* 主跳转按钮，位置样式对齐迷影TV */}
      <div className="relative z-20 mt-6 md:mt-10 text-center pb-2">
        <a
          href={MT_BOX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-2.5 md:px-10 md:py-3 rounded-2xl font-bold text-slate-900 transition-all active:scale-95 hover:scale-105 text-sm md:text-base"
          style={{
            background: "linear-gradient(135deg,#fb923c,#22d3ee)",
            boxShadow: "0 0 24px rgba(251,146,60,0.45)",
          }}
        >
          进入 MT·BOX
        </a>
      </div>

      {/* 流光动画 */}
      <style>{`
        @keyframes shine {
          0%   { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%)  skewX(-20deg); }
        }
        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          animation: shine 2.8s infinite linear;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

function PortalItemCard({
  card,
  index,
}: {
  card: PortalCard;
  index: number;
}) {
  const [localHover, setLocalHover] = useState(false);
  const delay = index * 0.08;

  return (
    <div
      className="relative rounded-2xl p-4 md:p-5 cursor-pointer overflow-hidden shine-effect"
      style={{
        transformStyle: "preserve-3d",
        transform: localHover
          ? "translateZ(24px) scale(1.03)"
          : "translateZ(0)",
        transition: `all 0.4s cubic-bezier(0.2,0,0.2,1) ${delay}s`,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        border: `1px solid ${
          localHover ? card.color + "99" : "rgba(255,255,255,0.1)"
        }`,
        boxShadow: localHover ? `0 0 22px ${card.color}44` : "none",
      }}
      onMouseEnter={() => setLocalHover(true)}
      onMouseLeave={() => setLocalHover(false)}
    >
      <div
        className="absolute -top-8 -right-8 w-16 h-16 rounded-full opacity-30 blur-xl"
        style={{ background: card.color }}
      />
      <h3 className="text-base md:text-lg font-semibold text-white">{card.title}</h3>
      <p className="text-sm text-slate-300 opacity-60 mt-1">{card.subTitle}</p>
    </div>
  );
}
