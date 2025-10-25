'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header({ lang = 'ru' }: any) {
  const pathname = usePathname() || '/'
  const pathWithoutLocale = pathname.replace(/^\/(ru|kz|en)/, '') || '/'
  return (
    <header className="bg-card border-b border-gray-700 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href={`/${lang}`} className="text-2xl font-bold text-primary">JQL Kazakhstan</Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li><Link href={`/${lang}/collections`} className="hover:text-primary">Коллекции</Link></li>
            <li><Link href={`/${lang}/custom-order`} className="hover:text-primary">Индивидуальный заказ</Link></li>
            <li><Link href={`/${lang}/partners`} className="hover:text-primary">Партнёрам</Link></li>
            <li><Link href={`/${lang}/contacts`} className="hover:text-primary">Контакты</Link></li>
          </ul>
        </nav>
        <div className="flex space-x-2">
          <Link href={`/ru${pathWithoutLocale}`} className="px-2 py-1 rounded bg-gray-700">RU</Link>
          <Link href={`/kz${pathWithoutLocale}`} className="px-2 py-1 rounded">KZ</Link>
          <Link href={`/en${pathWithoutLocale}`} className="px-2 py-1 rounded">EN</Link>
        </div>
      </div>
    </header>
  )
}
