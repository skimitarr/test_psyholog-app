'use client'
import { useSelectedLayoutSegments } from 'next/navigation';

export function Navigation({ navLinks }: {
  navLinks: {
    label: string
    href: string
  }[]
}) {

  const path = useSelectedLayoutSegments();
  const currentPath = '/' + path.splice(1, 2).join('/');

  return (
    <div className="flex items-center">
      {navLinks.map(link => (
        <a className={`px-4 py-1.5 rounded-full text-black-100 ${link.href === currentPath ? 'bg-neutral-500 text-white' : ''} hover:bg-sky-600 hover:text-white transition-colors ease-in-out duration-300 ...`}
          key={link.label}
          href={link.href}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
