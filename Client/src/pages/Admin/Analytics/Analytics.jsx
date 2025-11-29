import React, { useEffect, useState } from "react";
// Assuming getAnalytics is defined in the correct relative path
import { getAnalytics } from "../../../api/analytics";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import "./Analytics.css";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call delay for demonstration if needed, otherwise this is fine
      // *** IMPORTANT: Make sure getAnalytics returns an object with a non-empty array
      //    for the missingChatsHistory key for the chart to show.
      const analytics = await getAnalytics(); 
      console.log("Analytics Data →", analytics);
      setData(analytics);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data available yet</p>;

  // Data structure for the Pie Chart
  const resolvedData = [
    { name: "Resolved", value: data.resolvedPercent },
    { name: "Unresolved", value: 100 - data.resolvedPercent },
  ];

  const COLORS = ["#28a745", "#ccc"]; // green + gray for resolved/unresolved

  return (
    <div className="analytics-root">
      <h3 className="analytics-title">Analytics</h3>

      {/* Missing Chats Line Chart (The component will render this only if data.missingChatsHistory is a non-empty array) */}
      {data.missingChatsHistory && data.missingChatsHistory.length > 0 && (
        <div className="linechart-card">
          <h2>Missing Chats</h2>

          <LineChart width={500} height={200} data={data.missingChatsHistory}>
            <Line
              type="monotone"
              dataKey="value" // The value on the Y-axis (number of chats)
              stroke="#184E7F"
              strokeWidth={3}
            />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="day" /> {/* The X-axis data (e.g., Week 1, Day 1) */}
            <YAxis />
          </LineChart>
        </div>
      )}

      {/* --- Average Reply Time --- */}
      <div className="analytics-row">
        <div className="analytics-left">
          <h2>Average Reply Time</h2>
          <p>
            For highest customer satisfaction rates you should aim to reply to
            an incoming customer's message in 15 seconds or less. Quick
            responses build trust and increase sales.
          </p>
        </div>

        <h1 className="analytics-value">{data.avgReplyTime} secs</h1>
      </div>

      {/* --- Resolved Tickets Pie Chart --- */}
      <div className="analytics-row">
        <div className="analytics-left">
          <h2>Resolved Tickets</h2>
          <p>
            Showing how many customer issues were solved successfully during the
            selected time period.
          </p>
        </div>

        <PieChart width={120} height={120}>
          <Pie
            data={resolvedData}
            cx="50%"
            cy="50%"
            innerRadius={28}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
          >
            {resolvedData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          {/* Custom text element to display the percentage in the center of the donut chart */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#333"
          >
            {data.resolvedPercent}%
          </text>
          <Tooltip />
        </PieChart>
      </div>

      {/* --- Total Chats --- */}
      <div className="analytics-row">
        <div className="analytics-left">
          <h2 className="Total-Chats">Total Chats</h2>
          <p>
            Total number of chats received across all channels during this
            period.
          </p>
        </div>

        <h1 className="analytics-value">{data.totalChats} chats</h1>
      </div>
    </div>
  );
}