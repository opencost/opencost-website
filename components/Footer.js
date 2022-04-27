import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center lg:text-left px-10 lg:px-20 bg-white">
      <div class="max-w-screen-xl py-5 px-4 text-gray-800 flex justify-center mx-auto">
        <div class="p-3">
          <div className="flex items-center justify-center">
            <span className="mt-1">created by</span>
            <a
              className="font-semibold text-xl ml-2 text-black mt-2"
              href="https://kubecost.com"
            >
              <Image
                src="/images/kubecost-logo.png"
                alt="Kubecost"
                width={115}
                height={25}
              />
            </a>
          </div>

          <div class="flex text-sm mt-5 space-x-5">
            <a href="#" class="ml-4 font-light hover:text-green-400">
              GitHub
            </a>
            <a href="#" class="font-light hover:text-green-400">
              Twitter
            </a>
            <a href="#" class="font-light hover:text-green-400">
              Docs
            </a>
            <a href="#" class="font-light hover:text-green-400">
              Slack
            </a>
          </div>
        </div>
      </div>
      <div class="pl-4 flex py-5 m-auto text-green-800 text-sm flex-col items-center max-w-screen-xl">
        <p>© Copyright 2022. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
