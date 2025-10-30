import React, { useEffect, useState } from "react";

const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("T")[0],
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const startDate = "2024-01-01";
    const endDate = "2024-12-31";
    const data = generateActivityData(startDate, endDate);
    setActivityData(data);
  }, []);

  const getColor = (count) => {
    if (count === 0) return "rgba(0, 217, 255, 0.1)";
    if (count < 10) return "rgba(0, 255, 136, 0.3)";
    if (count < 20) return "rgba(0, 255, 136, 0.5)";
    if (count < 30) return "rgba(0, 255, 136, 0.7)";
    if (count < 40) return "rgba(0, 255, 136, 0.9)";
    return "rgb(0, 255, 136)";
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(24px, 1fr))",
        gap: "4px",
        padding: "20px 0",
        maxWidth: "900px",
      }}
    >
      {activityData.map((activity, index) => (
        <div
          key={index}
          title={`${activity.date}: ${activity.count} contributions`}
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: getColor(activity.count),
            borderRadius: "6px",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.2)";
            e.target.style.boxShadow = `0 0 10px ${getColor(activity.count)}`;
            e.target.style.zIndex = "10";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "none";
            e.target.style.zIndex = "0";
          }}
        />
      ))}
    </div>
  );
};

export default HeatMapProfile;
