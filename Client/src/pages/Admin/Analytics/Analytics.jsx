import React, { useEffect, useState } from "react";
import { getAnalytics } from "../../../api/analytics";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import "./Analytics.css";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const analytics = await getAnalytics();
      console.log("Analytics Data →", analytics);
      setData(analytics);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data available yet</p>;

  const resolvedData = [
    { name: "Resolved", value: data.resolvedPercent },
    { name: "Unresolved", value: 100 - data.resolvedPercent },
  ];

  const COLORS = ["#28a745", "#ccc"]; // green + gray

  return (
    <div className="analytics-root">
      <h3 className="analytics-title">Analytics</h3>

      {/* Average Reply Time */}
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

      {/* Resolved Tickets */}
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

      {/* Total Chats */}
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
