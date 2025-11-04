"use client";

import { motion } from "framer-motion";
import { WHEEL_COLORS } from "../constants";

interface WheelSpinnerProps {
  items: string[];
  rotation: number;
  wheelPaths: string[];
}

export function WheelSpinner({ items, rotation, wheelPaths }: WheelSpinnerProps) {
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      className="drop-shadow-2xl"
      animate={{ rotate: rotation }}
      transition={{ duration: 4, ease: "easeOut" }}
    >
      <defs>
        {items.map((_, index) => {
          const color = WHEEL_COLORS[index % WHEEL_COLORS.length];
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
              d={wheelPaths[index]}
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
  );
}
