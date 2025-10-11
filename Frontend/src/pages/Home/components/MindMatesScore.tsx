import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type TimeRange = "1W" | "1M" | "3M" | "ALL";

interface MindMatesScoreProps {
  mentalHealthScore?: number;
  mentalHealthScoreLogs?: { date: Date; score: number }[];
}

const MindMatesScore = ({
  mentalHealthScore,
  mentalHealthScoreLogs = [],
}: MindMatesScoreProps) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1W");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if today already has a log
  const hasTodayLog = mentalHealthScoreLogs.some(log => {
    const logDate = new Date(log.date);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === today.getTime();
  });

  // Create enhanced logs with today's data
  const enhancedLogs = [...mentalHealthScoreLogs];
  if (!hasTodayLog && mentalHealthScore) {
    enhancedLogs.push({
      date: today,
      score: mentalHealthScore
    });
  }

  // Generate date range based on selection
  const getDateRange = () => {
    const days = [];
    
    if (selectedRange === "1W") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        days.push({
          date: date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          }),
          dateObj: date,
        });
      }
    } else if (selectedRange === "1M") {
      for (let i = 30; i >= 0; i -= 3) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        days.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          dateObj: date,
        });
      }
    } else if (selectedRange === "3M") {
      for (let i = 90; i >= 0; i -= 7) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        days.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          dateObj: date,
        });
      }
    } else {
      for (let i = 365; i >= 0; i -= 30) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        days.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
          }),
          dateObj: date,
        });
      }
    }
    
    return days;
  };

  const dateRange = getDateRange();

  // Map mental health score logs to dates
  const logMap = new Map<string, number[]>();
  enhancedLogs.forEach((log) => {
    const logDate = new Date(log.date);
    logDate.setHours(0, 0, 0, 0);
    
    const bucket = dateRange.find((day) => {
      const diff = Math.abs(logDate.getTime() - day.dateObj.getTime());
      const daysDiff = diff / (1000 * 60 * 60 * 24);
      
      if (selectedRange === "1W") return daysDiff < 0.5;
      if (selectedRange === "1M") return daysDiff < 1.5;
      if (selectedRange === "3M") return daysDiff < 3.5;
      return daysDiff < 15;
    });
    
    if (bucket) {
      const key = bucket.dateObj.toDateString();
      if (!logMap.has(key)) logMap.set(key, []);
      logMap.get(key)!.push(log.score);
    }
  });

  // Create chart data
  const chartData = dateRange.map((day) => {
    const dateKey = day.dateObj.toDateString();
    const scores = logMap.get(dateKey) || [];
    const score = scores.length > 0 
      ? scores.reduce((a, b) => a + b, 0) / scores.length 
      : 0;
    
    return {
      date: day.date,
      score: Math.round(score),
    };
  });

  // Calculate average mental health score
  const getAvgScore = () => {
    if (enhancedLogs.length === 0) return "0";
    
    const rangeStart = dateRange[0].dateObj;
    const logsInRange = enhancedLogs.filter(log => new Date(log.date) >= rangeStart);
    
    if (logsInRange.length === 0) return "0";
    
    const sum = logsInRange.reduce((acc, log) => acc + log.score, 0);
    return Math.round(sum / logsInRange.length).toString();
  };

  const avgScore = getAvgScore();

  const timeRangeOptions = [
    { label: "1 Week", value: "1W" as TimeRange },
    { label: "1 Month", value: "1M" as TimeRange },
    { label: "3 Months", value: "3M" as TimeRange },
    { label: "All Time", value: "ALL" as TimeRange },
  ];

  return (
    <div className="md:col-span-7 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-3xl p-7 border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-extrabold text-[#624A35]">
              {mentalHealthScore ? `${mentalHealthScore}%` : "N/A"}
            </h2>
            <span className="text-sm text-gray-500 font-medium">
              Average: {avgScore}%
            </span>
          </div>
          <p className="text-gray-600 text-sm font-semibold mt-1">
            Mental Health Score
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            {selectedRange === "1W" ? "Last 7 days" : 
             selectedRange === "1M" ? "Last 30 days" : 
             selectedRange === "3M" ? "Last 90 days" : "All time"} tracking
          </p>
        </div>
        
        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-full text-xs font-bold ${
          Number(avgScore) >= 70 
            ? "bg-green-100 text-green-700" 
            : Number(avgScore) >= 50 
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}>
          {Number(avgScore) >= 70 ? "😊 Excellent" : Number(avgScore) >= 50 ? "😐 Good" : "😰 Needs Attention"}
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-64 bg-gradient-to-b from-[#F8F6F3] to-white rounded-2xl p-4 mb-5 shadow-inner border border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A3B763" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#A3B763" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" stroke="#e5e5e5" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 500 }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
              angle={selectedRange === "1W" ? 0 : -45}
              textAnchor={selectedRange === "1W" ? "middle" : "end"}
              height={selectedRange === "1W" ? 30 : 50}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 500 }}
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "8px 12px",
              }}
              labelStyle={{ fontWeight: "600", color: "#624A35", fontSize: "12px" }}
              formatter={(value: any) => [
                value === 0 ? "No data" : `Score: ${value}%`,
                "",
              ]}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="url(#lineGradient)"
              strokeWidth={4}
              dot={selectedRange === "3M" || selectedRange === "ALL" ? false : { r: 6, fill: "#A3B763", strokeWidth: 3, stroke: "#fff" }}
              activeDot={{ r: 8, fill: "#8AA84E", strokeWidth: 3, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time Range Buttons */}
      <div className="flex gap-2 justify-between flex-wrap">
        {timeRangeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedRange(option.value)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 ${
              selectedRange === option.value
                ? "bg-gradient-to-r from-[#A3B763] to-[#8AA84E] text-white shadow-lg shadow-green-200 scale-105"
                : "bg-gray-100 text-[#624A35] hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MindMatesScore;
