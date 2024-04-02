import { Navigation } from "./Navigation"
import { RegistrationBtn } from "./LoginButton"
import Image from 'next/image'

export const navItems = [
  { label: 'Вопросы', href: '/questions/1' },
]

export function TheHeader() {
  return (
    <header className="grid grid-cols-[25%_50%_25%] mx-[120px] pt-[30px]">
      <Navigation navLinks={navItems} />
      <Image src="/siteName.webp" width={350} height={78} priority alt="Picture of the author" className="mx-[auto]" />
      <RegistrationBtn />
    </header>
  )
}
