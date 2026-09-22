import { useState, useEffect } from 'react';
import { Film, MessageSquare, TrendingUp, Calendar, Terminal, ChevronRight, Tv } from 'lucide-react';

// 跳转地址，按需修改
const MIYING_TV_URL = "https://ficp.fun/miying";
const HOME_URL = "/";

// 底部随机趣味文案
const tips = [
  "开启你的私人影厅 🎬",
  "光影流转，好戏正在上演 ✨",
  "戴上耳机，沉浸式观影体验",
  "好片不等人，速来打卡",
  "每一部影片，都是一段平行宇宙"
];

export default function MiyingTVApp() {
  const [tipText, setTipText] = useState(tips[0]);

  useEffect(() => {
    // 每次打开面板随机选取文案
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipText(randomTip);
  }, []);

  const moduleList = [
    { id: "recommend", label: "推荐影片", icon: <Film size={22}/>, color: "#4f7cff" },
    { id: "live-chat", label: "实时聊房", icon: <MessageSquare size={22}/>, color: "#9d4edd" },
    { id: "rank", label: "人气榜单", icon: <TrendingUp size={22}/>, color: "#ff5ca8" },
    { id: "reservation", label: "我的预约", icon: <Calendar size={22}/>, color: "#22d3ee" },
    { id: "danmaku", label: "弹幕设置", icon: <Terminal size={22}/>, color: "#a78bfa" },
    { id: "more", label: "更多", icon: <ChevronRight size={22}/>, color: "#9ca3af" },
  ];

  return (
    <div className="w-full min-h-[480px] rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(30,20,60,0.4), rgba(10,10,18,0.9))",
        border: "1px solid rgba(157, 78, 221, 0.35)",
        boxShadow: "0 10px 40px rgba(79, 124, 255, 0.25)",
        backdropFilter: "blur(18px)"
      }}
    >
      {/* 顶部标题 */}
      <div className="flex items-center gap-3 mb-8">
        <Tv size={28} style={{color:"#9d4edd"}}/>
        <h2 className="text-2xl font-bold text-white">迷影・TV</h2>
      </div>

      {/* 中央脉冲播放核心 */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(79,124,255,0.35), rgba(157,78,221,0.15) 60%, transparent 70%)",
            animation: "pulse 2.4s ease-in-out infinite"
          }}
        >
          <Film size={40} color="#e8e8ff"/>
        </div>
      </div>

      {/* 功能卡片网格 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {moduleList.map(item => (
          <div key={item.id}
            className="rounded-xl p-3 cursor-pointer transition-all duration-250 hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)"
            }}
            onMouseEnter={(e)=>{
              e.currentTarget.style.borderColor = item.color;
              e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}25`;
            }}
            onMouseLeave={(e)=>{
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span style={{color: item.color}}>{item.icon}</span>
              <span className="text-sm text-gray-200">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 操作按钮行 */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => window.open(MIYING_TV_URL, "_blank")}
          className="flex-1 py-3 rounded-xl font-semibold"
          style={{
            background: "linear-gradient(135deg, #e0a3b2, #f4d3c7, #b5838d)",
            color: "#2a1f22"
          }}
        >
          立即进入
        </button>
        <button
          onClick={() => window.location.href = HOME_URL}
          className="flex-1 py-3 rounded-xl font-semibold"
          style={{
            background: "linear-gradient(135deg, rgba(79, 124, 255, 0.15), rgba(157, 78, 221, 0.25))",
            border: "1px solid rgba(157, 78, 221, 0.45)",
            color: "#e8e8ff"
          }}
        >
          我的片单
        </button>
      </div>

      {/* 底部随机提示文案 */}
      <div className="text-center text-sm text-purple-200 opacity-80">
        {tipText}
      </div>

      {/* 全局动画样式内联 */}
      <style>{`
        @keyframes pulse {
          0%,100% { opacity:0.85; transform:scale(1); }
          50% { opacity:1; transform:scale(1.04); }
        }
      `}</style>
    </div>
  );
}
