import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Partners() {
  return (
    <div className="px-20 lg:px-40 pt-20 pb-20 bg-green-100">
      <div className="flex flex-col gap-y-6">
        <div className="text-4xl text-black font-bold text-center pt-20 h-48 flex items-center justify-center font-anek">
          Founding Partners
        </div>
        <div className="flex flex-wrap justify-around gap-10">
          <div
            style={{
              position: "relative",
              width: "330px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/armory.png"
              alt="Armory"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "330px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/google.png"
              alt="Google Cloud"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
