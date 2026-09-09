"use client";

const links = [
  {
    href: "https://miti1.cc.cd",
    label: "进入迷体星球",
    desc: "主站 · 星图全览",
    primary: true,
  },
  {
    href: "/",
    label: "回星球首页",
    desc: "星球 · 迷体小站",
    primary: false,
  },
];

export default function MitiApp() {
  return (
    <div className="flex flex-col h-full">
      {/* 星球卡片 */}
      <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 text-white flex-1 flex flex-col justify-between min-h-[180px]">
        {/* 装饰光晕 */}
        <div className="pointer-events-none absolute -top-10 -right-8 w-36 h-36 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-6 w-28 h-28 rounded-full bg-cyan-300/30 blur-xl" />

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl font-black shadow-lg">
              🪐
            </div>
            <div>
              <div className="text-lg font-black leading-tight tracking-wide">迷体星球</div>
              <div className="text-[11px] text-white/75">MITI PLANET</div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-white/90">
            欢迎来到迷体星系。这里是你的个人星球——博客、工具、相册、音乐，以及通往迷体各站点的传送门。
          </p>
        </div>

        <div className="relative mt-5 grid grid-cols-2 gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group rounded-xl px-3 py-2.5 text-center transition-all duration-200 active:scale-95 ${
                l.primary
                  ? "bg-white text-sky-600 font-bold shadow-lg hover:shadow-xl"
                  : "bg-white/15 hover:bg-white/25 backdrop-blur text-white font-semibold"
              }`}
            >
              <div className="text-[13px] flex items-center justify-center gap-1">
                {l.label}
                {l.href.startsWith("http") && (
                  <svg
                    className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="text-[10px] opacity-70 mt-0.5">{l.desc}</div>
            </a>
          ))}
        </div>
      </div>

      {/* 站点列表 */}
      <div className="mt-3">
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1.5">迷体站点导航</div>
        <div className="space-y-1">
          {[
            { name: "迷体·gameworld", href: "https://g.miti.cc.cd", desc: "复古游戏资源库" },
            { name: "迷体影院", href: "https://ce.miti.cc.cd", desc: "TV版豆瓣影视追剧" },
            { name: "迷体MU·PLAYER播放器", href: "https://t.miti.cc.cd", desc: "音乐播放器" },
            { name: "迷影", href: "https://m.miti.cc.cd", desc: "影视播放器" },
          ].map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition-colors"
            >
              <div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">{s.name}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">{s.desc}</div>
              </div>
              <span className="text-[10px] text-sky-500 font-bold shrink-0">骇入↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
