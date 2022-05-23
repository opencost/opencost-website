import React from "react";

export default function FeatureCard({ description, icon }) {
  return (
    <div
      style={{ width: "310px", height: "331px" }}
      className="m-5 border-2 border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
    >
      <div className="mt-20 mb-10 text-center flex justify-center mx-auto">
        <img src={`/img/${icon}.svg`} alt={icon} />
      </div>
      <div className="text-center px-5">{description}</div>
    </div>
  );
}
