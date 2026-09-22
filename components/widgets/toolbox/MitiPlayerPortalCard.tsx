"use client";
import { useState, useEffect, useRef } from "react";

const MITI_PLAYER_URL = "https://t.miti.cc.cd/";

type PortalCard = {
  id: string;
  title: string;
  subTitle: string;
  color: string;
};

const cardList: PortalCard[] = [
  {
    id: "player-core",
    title: "迷体·PLAYER",
    subTitle: "高性能播放内核",
    color: "#34d399",
  },
  {
    id: "codec",
    title: "解码引擎",
    subTitle: "全格式硬件解码",
    color: "#7cc7ff",
  },
  {
    id: "subtitle",
    title: "字幕系统",
    subTitle: "多字幕渲染引擎",
    color: "#a78bfa",
  },
  {
    id: "audio",
    title: "音频控制器",
    subTitle: "音轨均衡与增益",
    color: "#22d3ee",
  },
  {
    id: "cache",
    title: "缓存调度",
    subTitle: "预加载资源管理",
    color: "#818cf8",
  },
  {
    id: "advance",
    title: "高级参数",
    subTitle: "自定义渲染管线",
    color: "#c4b5fd",
  },
];

export default function MitiPlayerPortalCard() {
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
          "radial-gradient(900px 500px at 50% 40%, rgba(52,211,153,0.14), rgba(15,23,42,0.85) 50%, #070a13 100%)",
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
            linear-gradient(rgba(52,211,153,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 中心标题 */}
      <div className="relative z-20 text-center mb-6 md:mb-10">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider"
          style={{
            background: "linear-gradient(90deg,#ffffff,#34d399,#7cc7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 12px rgba(52,211,153,0.45))",
          }}
        >
          迷体·PLAYER
        </h2>
        <p className="mt-2 text-slate-300 opacity-70 text-sm md:text-base">
          PORTAL INTERFACE · 播放器门户
        </p>
      </div>

      {/* 3D 卡片容器，响应式网格 */}
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

      {/* 主按钮 */}
      <div className="relative z-20 mt-6 md:mt-10 text-center pb-2">
        <a
          href={MITI_PLAYER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-2.5 md:px-10 md:py-3 rounded-2xl font-bold text-slate-900 transition-all active:scale-95 hover:scale-105 text-sm md:text-base"
          style={{
            background: "linear-gradient(135deg,#34d399,#22d3ee)",
            boxShadow: "0 0 24px rgba(52,211,153,0.45)",
          }}
        >
          骇入·播放器
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
