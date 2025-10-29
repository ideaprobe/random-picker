"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const DEFAULT_ITEMS = ["选项 1", "选项 2", "选项 3", "选项 4", "选项 5", "选项 6"];

const COLORS = [
  { start: "#FF6B9D", end: "#C44569" },
  { start: "#4FACFE", end: "#00F2FE" },
  { start: "#43E97B", end: "#38F9D7" },
  { start: "#FA709A", end: "#FEE140" },
  { start: "#A8EDEA", end: "#FED6E3" },
  { start: "#FFD89B", end: "#19547B" },
  { start: "#667EEA", end: "#764BA2" },
  { start: "#F093FB", end: "#F5576C" },
  { start: "#4FACFE", end: "#00F2FE" },
  { start: "#30CFD0", end: "#330867" },
  { start: "#A8EDEA", end: "#FED6E3" },
  { start: "#FDBB2D", end: "#22C1C3" },
];

export default function Home() {
  const [items, setItems] = useState<string[]>(DEFAULT_ITEMS);
  const [inputValue, setInputValue] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const addItem = () => {
    if (inputValue.trim() && items.length < 12) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    if (items.length > 2) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const spin = () => {
    if (isSpinning || items.length < 2) return;

    setIsSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 3;
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / items.length;
      const selectedIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % items.length;

      setResult(items[selectedIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  const createWheelPath = (index: number, total: number) => {
    const angle = (2 * Math.PI) / total;
    const startAngle = index * angle - Math.PI / 2;
    const endAngle = startAngle + angle;

    const x1 = 200 + 200 * Math.cos(startAngle);
    const y1 = 200 + 200 * Math.sin(startAngle);
    const x2 = 200 + 200 * Math.cos(endAngle);
    const y2 = 200 + 200 * Math.sin(endAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    return `M 200 200 L ${x1} ${y1} A 200 200 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          随机轮盘
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-96 h-96">
              <motion.svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                className="drop-shadow-2xl"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: "easeOut" }}
              >
                <defs>
                  {items.map((_, index) => {
                    const color = COLORS[index % COLORS.length];
                    return (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`gradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={color.start} />
                        <stop offset="100%" stopColor={color.end} />
                      </linearGradient>
                    );
                  })}
                </defs>

                {items.map((item, index) => {
                  const angle = (360 / items.length) * index;
                  const textAngle = angle + 180 / items.length;
                  const textRadius = 130;

                  return (
                    <g key={index}>
                      <path
                        d={createWheelPath(index, items.length)}
                        fill={`url(#gradient-${index})`}
                        stroke="white"
                        strokeWidth="3"
                      />
                      <text
                        x="200"
                        y="200"
                        fill="white"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textAngle} 200 200) translate(0 ${-textRadius})`}
                      >
                        {item}
                      </text>
                    </g>
                  );
                })}

                <circle cx="200" cy="200" r="30" fill="white" stroke="#ddd" strokeWidth="2" />
                <circle cx="200" cy="200" r="15" fill="#f59e0b" />
              </motion.svg>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-20 border-r-20 border-t-30 border-l-transparent border-r-transparent border-t-red-600 z-10" />
            </div>

            <button
              onClick={spin}
              disabled={isSpinning || items.length < 2}
              className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold text-xl rounded-full shadow-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
            >
              {isSpinning ? "旋转中..." : "开始抽取"}
            </button>

            {result && (
              <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">抽取结果：</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result}</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">自定义列表</h2>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="输入新选项"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={items.length >= 12}
              />
              <button
                onClick={addItem}
                disabled={!inputValue.trim() || items.length >= 12}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
              >
                添加
              </button>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              当前 {items.length} 个选项（最多 12 个，最少 2 个）
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {items.map((item, index) => {
                const color = COLORS[index % COLORS.length];
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${color.start}, ${color.end})` }}
                      />
                      <span className="text-gray-800 dark:text-white">{item}</span>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      disabled={items.length <= 2}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:text-gray-400 disabled:hover:bg-transparent rounded transition-colors"
                    >
                      删除
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
