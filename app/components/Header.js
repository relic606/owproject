"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathName = usePathname();
  return (
    <header className="bg-white flex h-20 relative z-10 border-b border-gray-400 bg-gradient-to-b from-white to-gray-200 text-lg">
      <div
        className="absolute left-10
      top-2"
      >
        <Link href={"/"}>
          <Image
            src="/projects/overwatch/icons/Icon-Overwatch.png"
            width={80}
            height={0}
            alt="overwatch logo"
          />
        </Link>
      </div>
      <div className="flex mx-auto my-auto">
        <nav>
          <Link
            href={"/"}
            className={`orange-text transition delay-50 p-4 font
                ${
                  pathName === "/"
                    ? "font-extrabold"
                    : "font-semibold text-gray-800"
                }
                `}
          >
            Highlights
          </Link>
          <Link
            href={"/stats"}
            className={`orange-text transition delay-50 p-4
            ${
              pathName === "/stats"
                ? "font-bold"
                : "font-semibold text-gray-800"
            }`}
          >
            Stats
          </Link>
        </nav>
      </div>
    </header>
  );
}
