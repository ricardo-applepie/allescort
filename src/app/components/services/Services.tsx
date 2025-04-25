'use client';

import Link from "next/link";

export default function Services({ fieldIndex, options, label }: any) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4">
        <div className="flex min-w-max divide-x divide-gray-100 rounded-lg shadow">
          {[
            { href: "/search?city=København", title: "København", subtitle: "216 escort" },
            { href: "/search?city=Jylland", title: "Jylland", subtitle: "193 escort" },
            { href: "/search?city=Aarhus", title: "Aarhus", subtitle: "165 escort" },
            { href: "/search?city=Aalborg", title: "Aalborg", subtitle: "16 escort" },
            { href: "/search?city=Sjælland", title: "Sjælland", subtitle: "28 escort" },
            { href: "/search?city=Odense", title: "Odense", subtitle: "184 escort" },
            { href: "/search?city=Fyn", title: "Fyn", subtitle: "89 escort" },
            { href: "/search?city=Kolding", title: "Kolding", subtitle: "Join us" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="relative group flex-1 px-4 py-2 text-center whitespace-nowrap bg-red-700 text-white hover:bg-red-900 transition duration-200 border-r border-gray-100"
            >
              <div className="text-sm font-semibold">{item.title}</div>
              {/* <div className="text-xs">{item.subtitle}</div> */}

              {/* Animated bottom border */}
              <span className="absolute left-0 bottom-0 h-1 w-full bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
