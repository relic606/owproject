"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();
  return (
    <header className="bg-black text-white py-2">
      <div className="flex mx-auto px-2">
        <nav>
          <ul className="flex">
            <li className="px-8">
              <Link
                href={"/"}
                className={`rounded-full ${
                  pathName === "/"
                    ? "text-black bg-white p-1"
                    : "hover:text-gray-400 transition delay-50"
                }`}
              >
                Highlights
              </Link>
            </li>
            <li>
              <Link
                href={"/stats"}
                className={`rounded-full ${
                  pathName === "/stats"
                    ? "text-black bg-white p-1"
                    : "hover:text-gray-400 transition delay-50"
                }`}
              >
                Stats
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
