import React, { useState } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-green-900 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="font-semibold text-white text-xl ml-2 mt-3">
                <Image
                  src="/images/opencost-text.png"
                  alt="OpenCost Logo"
                  width={165}
                  height={40}
                />
              </a>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  scroll={true}
                  href="https://cloud-native.slack.com/?redir=%2Farchives%2FC03D56FPD4G"
                >
                  <a className="hover:text-green-400 text-white font-light text-sm  mt-1">
                    Join Slack
                  </a>
                </Link>
                <Link scroll={true} href="#">
                  <a className="hover:text-green-400 text-white font-light text-sm  mt-1">
                    Documentation
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-right float-right hidden md:block">
            <Link href="https://github.com/kubecost">
              <a className="hover:text-green-400 text-white text-sm font-medium float-right">
                <button className="text-xl">
                  <FaGithub className="inline mr-1 mb-1 w-6 h-6" />
                </button>
              </a>
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-400 text-white font-medium">
            <Link href="#">
              <a className="hover:bg-green-800 hover:text-white block px-3 py-2 text-base">
                GitHub
              </a>
            </Link>
            <Link href="#">
              <a className="hover:bg-green-800 hover:text-white block px-3 py-2 text-base">
                Documentation
              </a>
            </Link>
            <Link href="#">
              <a className="hover:bg-green-800 hover:text-white block px-3 py-2 text-base">
                Join Slack
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
