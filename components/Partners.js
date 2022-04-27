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
          {[...Array(7)].map((e, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                width: "320px",
                paddingBottom: "20%",
              }}
            >
              <Image
                src="/images/cloud-blue.png"
                alt="Placeholder logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          ))}
          {/*  <div
            style={{
              position: "relative",
              width: "150px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/aws.png"
              alt="AWS"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "240px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/microsoft-azure.png"
              alt="Azure"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "300px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/gcp.png"
              alt="GCP"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "150px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/d2iq.jpg"
              alt="D2IQ"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "250px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/kubecost-logo.png"
              alt="Kubecost"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "200px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/mindcurv.png"
              alt="Mindcurv"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "200px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/new-relic.png"
              alt="New Relic"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "200px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/ibm.png"
              alt="IBM"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "200px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/spotify.png"
              alt="Spotify"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            style={{
              position: "relative",
              width: "200px",
              paddingBottom: "20%",
            }}
          >
            <Image
              src="/images/ternary.png"
              alt="Ternary"
              layout="fill"
              objectFit="contain"
            />
          </div>*/}
        </div>
      </div>
    </div>
  );
}
