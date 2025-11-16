"use client";

import React from "react";
import { useThemeStore } from "@/common/stores/theme/theme.store";
import { ifTheme } from "@/common/utils/theme/util/theme.util";

interface Props {
  progress: number;
  radius?: number;
  stroke?: number;
}

export const CircularProgress = ({
  progress,
  radius = 50,
  stroke = 8,
}: Props) => {
  const {theme} = useThemeStore();
  
  const normalizedRadius: number = radius - stroke / 2;
  const circumference: number = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset: number = circumference * (1 - progress / 100);
  
  const backgroundStroke: string = ifTheme(theme, "#404040", "#e5e7eb");
  const progressStroke: string = "url(#grad)";
  
  return (
    <svg height={ radius * 2 }
         width={ radius * 2 }
         style={ {filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))"} }
    >
      <defs>
        <linearGradient id="grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%">
          <stop offset="0%"
                stopColor="#4ade80" />
          <stop offset="100%"
                stopColor="#16a34a" />
        </linearGradient>
      </defs>
      
      <circle
        stroke={ backgroundStroke }
        fill="transparent"
        strokeWidth={ stroke }
        r={ normalizedRadius }
        cx={ radius }
        cy={ radius }
      />
      
      <circle
        stroke={ progressStroke }
        fill="transparent"
        strokeWidth={ stroke }
        strokeLinecap="round"
        strokeDasharray={ circumference }
        strokeDashoffset={ strokeDashoffset }
        r={ normalizedRadius }
        cx={ radius }
        cy={ radius }
        className="transition-all duration-300 ease-linear"
        transform={ `rotate(-90 ${ radius } ${ radius })` }
      />
    </svg>
  );
};
