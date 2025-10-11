import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface StressLevelChartProps {
  stressLogs?: { date: Date; level: number }[];
  currentStress?: number; // ✅ Add current stress for today's display
}

const StressLevelChart = ({ stressLogs, currentStress }: StressLevelChartProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ✅ Include today's stress if it exists
  const enhancedLogs = [...(stressLogs || [])];
  const hasTodayLog = enhancedLogs.some(log => {
    const logDate = new Date(log.date);
    logDate.setHours(0, 0, 0, 0);
    return logDate.getTime() === today.getTime();
  });

  if (!hasTodayLog && currentStress !== undefined && currentStress > 0) {
    enhancedLogs.push({ date: today, level: currentStress });
  }

  // Get last 7 days
  const last7DaysLogs = enhancedLogs.slice(-7);
  const hasData = last7DaysLogs.length > 0;

  const avgStress = hasData
    ? (
        last7DaysLogs.reduce((acc, log) => acc + log.level, 0) /
        last7DaysLogs.length
      ).toFixed(1)
    : "0.0";

  const getStressDistribution = () => {
    if (!hasData) {
      return [
        { name: "Low", value: 33, color: "#7CB47C" },
        { name: "Medium", value: 34, color: "#F0C857" },
        { name: "High", value: 33, color: "#E57373" },
      ];
    }

    let lowCount = 0;
    let mediumCount = 0;
    let highCount = 0;

    last7DaysLogs.forEach((log) => {
      if (log.level <= 3) lowCount++;
      else if (log.level <= 7) mediumCount++;
      else highCount++;
    });

    const total = last7DaysLogs.length;
    return [
      { name: "Low (0-3)", value: (lowCount / total) * 100, color: "#7CB47C" },
      { 
        name: "Medium (4-7)", 
        value: (mediumCount / total) * 100, 
        color: "#F0C857" 
      },
      { name: "High (8-10)", value: (highCount / total) * 100, color: "#E57373" },
    ].filter((item) => item.value > 0);
  };

  const data = getStressDistribution();

  // ✅ Get stress level status
  const getStressStatus = () => {
    const level = parseFloat(avgStress);
    if (level <= 3) return { text: "Low", color: "text-green-600", bg: "bg-green-100" };
    if (level <= 7) return { text: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "High", color: "text-red-600", bg: "bg-red-100" };
  };

  const status = getStressStatus();

  return (
    <div className="md:col-span-5 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-3xl p-7 border border-gray-100">
      {/* ✅ Header with status badge */}
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="text-3xl font-extrabold text-[#624A35]">
          {avgStress}
          <span className="text-lg text-gray-500">/10</span>
        </h2>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>
          {status.text}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm font-semibold mb-1">
        Average Stress Level
      </p>
      <p className="text-gray-400 text-xs mb-4">
        Last 7 days tracking
      </p>

      {/* ✅ Chart with better styling */}
      <div className="h-52 flex items-center justify-center bg-gradient-to-b from-[#F8F6F3] to-white rounded-2xl mb-4 shadow-inner border border-gray-100">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={hasData ? 5 : 0}
              dataKey="value"
              label={
                hasData
                  ? (props: any) => {
                      const percent = props.value.toFixed(0);
                      return percent > 5 ? `${percent}%` : ""; // ✅ Hide small percentages
                    }
                  : undefined
              }
              labelLine={false}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value.toFixed(1)}%`}
              contentStyle={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "8px 12px",
              }}
              labelStyle={{ fontWeight: "600", color: "#624A35", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Legend with better spacing */}
      <div className="flex gap-4 text-xs justify-center flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7CB47C] shadow-sm"></div>
          <span className="text-gray-700 font-medium">Low (0-3)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F0C857] shadow-sm"></div>
          <span className="text-gray-700 font-medium">Medium (4-7)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#E57373] shadow-sm"></div>
          <span className="text-gray-700 font-medium">High (8-10)</span>
        </div>
      </div>

      {/* ✅ Empty state message */}
      {!hasData && (
        <div className="text-center mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500 text-sm font-medium">
            📊 Start logging your stress levels
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Track daily to see your distribution
          </p>
        </div>
      )}
    </div>
  );
};

export default StressLevelChart;
