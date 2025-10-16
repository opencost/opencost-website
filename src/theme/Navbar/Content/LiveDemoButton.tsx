import React from 'react';

interface LiveDemoButtonProps {
  href: string;
}

export default function LiveDemoButton({ href }: LiveDemoButtonProps): JSX.Element {
  return (
    <a
      href={href}
      className="bg-green-400 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors relative no-underline hover:no-underline"
    >
      Live Demo
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
        new
      </span>
    </a>
  );
} 