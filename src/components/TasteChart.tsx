"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { TasteScores } from "@/types/coffee";

const CHART_DATA_KEYS: { key: keyof TasteScores; label: string }[] = [
  { key: "acidity", label: "酸味" },
  { key: "sweetness", label: "甘み" },
  { key: "bitterness", label: "苦味" },
  { key: "body", label: "コク" },
  { key: "aroma", label: "香り" },
];

export default function TasteChart({ scores }: { scores: TasteScores }) {
  const data = CHART_DATA_KEYS.map(({ key, label }) => ({
    subject: label,
    value: scores[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart cx="50%" cy="50%" outerRadius="68%" data={data}>
        <PolarGrid stroke="#d4c4b4" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#7a6a5a", fontSize: 13, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          domain={[0, 5]}
          tickCount={6}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="value"
          fill="#8B6355"
          fillOpacity={0.35}
          stroke="#6B4635"
          strokeWidth={2}
          dot={{ fill: "#6B4635", r: 3 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
