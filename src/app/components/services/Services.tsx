'use client';

import Link from "next/link";

export default function Services({ fieldIndex, options, label }: any) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4">
        <div className="flex min-w-max divide-x divide-gray-100 rounded-lg shadow">
          {[
            { href: "/", title: "All", subtitle: "216 escort" },
            { href: "/search?searchTerm=Sex", title: "Sex", subtitle: "193 escort" },
            { href: "/search?searchTerm=Massage", title: "Massage", subtitle: "165 escort" },
            { href: "/search?searchTerm=clinics", title: "Clinics", subtitle: "16 escort" },
            { href: "/search?searchTerm=Denmark", title: "Danish", subtitle: "28 escort" },
            { href: "/search?searchTerm=Thai", title: "Thai", subtitle: "184 escort" },
            { href: "search?searchTerm=video", title: "Watch videos", subtitle: "89 escort" },
            { href: "/members", title: "Social Club", subtitle: "Join us" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="relative group flex-1 px-4 py-2 text-center whitespace-nowrap bg-red-700 text-white hover:bg-red-900 transition duration-200 border-r border-gray-100"
            >
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="text-xs">{item.subtitle}</div>

              {/* Animated bottom border */}
              <span className="absolute left-0 bottom-0 h-1 w-full bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
