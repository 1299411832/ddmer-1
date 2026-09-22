"use client";
import { useState, useEffect, useRef } from "react";

const MT_BOX_URL = "https://w.miti.cc.cd";
const HOME_URL = "/";

const tips = [
  "打开百宝箱，发现好游戏 🎮",
  "单机、手游、Switch、MOD 一站式聚合 📦",
  "资源持续更新，随时上新 ⚡",
  "免费聚合，一键直达 🌟",
];

type FeatureCard = {
  title: string;
  desc: string;
  color: string;
  align: "left" | "right";
};

const featureCards: FeatureCard[] = [
  {
    title: "单机游戏",
    desc: "海量单机资源库，持续更新",
    color: "#fb923c",
    align: "left",
  },
  {
    title: "手游专区",
    desc: "热门手游合集，随时畅玩",
    color: "#f43f5e",
    align: "right",
  },
  {
    title: "Switch 资源",
    desc: "掌机游戏资源，一站式获取",
    color: "#a855f7",
    align: "left",
  },
  {
    title: "MOD 模组",
    desc: "游戏模组、补丁、扩展资源",
    color: "#22c55e",
    align: "right",
  },
];

export default function MtBoxPortalCard() {
  const [tip, setTip] = useState("");
  const [hoverCard, setHoverCard] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

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

  const rotateX = -mouse.y / 50;
  const rotateY = mouse.x / 50;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl p-5 sm:p-8 md:p-12"
      style={{
        perspective: "1200px",
        background:
          "radial-gradient(900px 600px at 50% 40%, rgba(251,146,60,0.18), rgba(34,211,238,0.08) 45%, rgba(15,23,42,0.9) 70%, #070a13 100%)",
      }}
    >
      {/* 背景网格 */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251,146,60,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251,146,60,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* 频谱柱状图 */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-[2px] rounded-t"
            style={{
              left: `${(i / 48) * 100}%`,
              height: `${20 + ((i * 7) % 80)}px`,
              background: `linear-gradient(to top, rgba(251,146,60,0.6), rgba(34,211,238,0.2))`,
              animation: `spectrum ${1.2 + (i % 5) * 0.15}s ease-in-out infinite alternate`,
              animationDelay: `${(i % 10) * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* 顶部标题 */}
      <div className="relative z-20 text-center mb-6 md:mb-10">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.2em] inline-block"
          style={{
            background: "linear-gradient(180deg,#fff7cc,#fb923c 45%,#ff7a59)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter:
              "drop-shadow(0 0 10px rgba(251,146,60,0.55)) drop-shadow(0 0 22px rgba(255,122,89,0.35))",
          }}
        >
          MT·BOX
        </h1>
        <p className="mt-2 text-slate-300 text-sm md:text-base opacity-80">
          迷体星球 · 全网游戏资源聚合
        </p>
        <p className="mt-1 text-slate-400 text-xs md:text-sm">
          优质游戏资源 · 免费 · 持续更新 · 单机 / 手游 / Switch / MOD 一站式聚合
        </p>
      </div>

      {/* 3D 主体区 */}
      <div
        className="relative z-10 flex items-center justify-center gap-4 md:gap-8"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        {/* 左侧功能卡 */}
        <div className="hidden md:flex flex-col gap-4 w-[210px]">
          {featureCards
            .filter((c) => c.align === "left")
            .map((card) => (
              <FeatureCard
                key={card.title}
                card={card}
                hoverCard={hoverCard}
                setHoverCard={setHoverCard}
              />
            ))}
        </div>

        {/* 中心旋转 HUD + 播放按钮 */}
        <div className="relative flex items-center justify-center">
          {/* 外圈旋转 */}
          <div
            className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] rounded-full"
            style={{
              border: "1px dashed rgba(251,146,60,0.35)",
              animation: "spin 22s linear infinite",
            }}
          />
          <div
            className="absolute w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] md:w-[360px] md:h-[360px] rounded-full"
            style={{
              border: "1px dashed rgba(34,211,238,0.25)",
              animation: "spin 17s linear infinite reverse",
            }}
          />
          <div
            className="absolute w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] rounded-full"
            style={{
              border: "1px solid rgba(251,146,60,0.18)",
              animation: "spin 13s linear infinite",
            }}
          />

          {/* 刻度装饰 */}
          <div
            className="absolute w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] md:w-[380px] md:h-[380px] rounded-full"
            style={{ animation: "spin 22s linear infinite" }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-0 w-[2px] h-3 -translate-x-1/2"
                style={{
                  height: i % 3 === 0 ? "14px" : "6px",
                  background:
                    i % 3 === 0
                      ? "rgba(251,146,60,0.7)"
                      : "rgba(34,211,238,0.35)",
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  transformOrigin: "center 155px",
                }}
              />
            ))}
          </div>

          {/* 中心播放按钮，保持不旋转 */}
          <a
            href={MT_BOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-[150px] md:h-[150px] rounded-full flex items-center justify-center group"
            style={{
              background:
                "radial-gradient(circle, rgba(251,146,60,0.35), rgba(251,146,60,0.08) 70%)",
              border: "2px solid rgba(251,146,60,0.85)",
              boxShadow:
                "0 0 30px rgba(251,146,60,0.55), inset 0 0 24px rgba(251,146,60,0.35)",
            }}
          >
            <div
              className="absolute inset-3 rounded-full"
              style={{
                border: "1px solid rgba(34,211,238,0.45)",
                animation: "pulseRing 2.4s ease-out infinite",
              }}
            />
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white ml-1"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>

        {/* 右侧功能卡 */}
        <div className="hidden md:flex flex-col gap-4 w-[210px]">
          {featureCards
            .filter((c) => c.align === "right")
            .map((card) => (
              <FeatureCard
                key={card.title}
                card={card}
                hoverCard={hoverCard}
                setHoverCard={setHoverCard}
              />
            ))}
        </div>
      </div>

      {/* 底部按钮区 */}
      <div className="relative z-20 mt-8 md:mt-12 flex flex-col items-center gap-3">
        <p className="text-slate-300 text-xs md:text-sm opacity-75">{tip}</p>
        <div className="flex gap-3">
          <a
            href={MT_BOX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-2xl font-bold text-slate-900 text-sm md:text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg,#fb923c,#22d3ee)",
              boxShadow: "0 0 22px rgba(251,146,60,0.45)",
            }}
          >
            立即进入
          </a>
          <a
            href={HOME_URL}
            className="px-6 py-2.5 rounded-2xl font-bold text-white text-sm md:text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
            }}
          >
            返回首页
          </a>
        </div>
      </div>

      {/* 动画 */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes spectrum {
          from { height: 18px; }
          to { height: 96px; }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({
  card,
  hoverCard,
  setHoverCard,
}: {
  card: FeatureCard;
  hoverCard: string | null;
  setHoverCard: (id: string | null) => void;
}) {
  return (
    <div
      className="rounded-2xl p-4 cursor-pointer transition-all duration-300"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        border: `1px solid ${
          hoverCard === card.title
            ? card.color + "99"
            : "rgba(255,255,255,0.1)"
        }`,
        boxShadow:
          hoverCard === card.title
            ? `0 0 22px ${card.color}55`
            : "none",
        transform:
          hoverCard === card.title
            ? "translateY(-6px) translateZ(18px)"
            : "translateY(0)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={() => setHoverCard(card.title)}
      onMouseLeave={() => setHoverCard(null)}
    >
      <div
        className="w-8 h-8 rounded-lg mb-2 flex items-center justify-center"
        style={{
          background: card.color + "22",
          border: `1px solid ${card.color}77`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill="none"
          stroke={card.color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8l7-4 7 4-7 4-7-4z" />
          <path d="M5 12l7 4 7-4" />
          <path d="M5 16l7 4 7-4" />
        </svg>
      </div>
      <h3 className="text-white font-semibold text-sm">{card.title}</h3>
      <p className="text-slate-300 text-xs mt-1 opacity-70">{card.desc}</p>
    </div>
  );
}
