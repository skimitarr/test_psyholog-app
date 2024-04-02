'use client'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { handleSignOut, useGetCurrentUser } from '../PersonalHooks/useFirebaseAuth';

export function RegistrationBtn() {
  const router = useRouter();
  const path = useSelectedLayoutSegments();
  const currentPath = '/' + path.splice(1, 2).join('/');
  const currentUser = useGetCurrentUser();

  const generateLink = (text: string, onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined, href?: string) => {
    return (
      <a
        className={`px-4 py-1.5 rounded-full text-black-100 cursor-pointer ${currentPath === '/registration' ? 'bg-neutral-500 text-white' : ''} hover:bg-sky-600 hover:text-white transition-colors ease-in-out duration-300 ...`}
        href={href}
        onClick={onClick}
      >
        {text}
      </a>
    );
  };

  return (
    <div className="flex items-center ml-[auto]">
      {(() => {
        switch (currentPath) {
          case '/registration':
            return generateLink('Назад', () => router.back());
          case '/personalAccount':
            return generateLink('Выйти', () => { handleSignOut(); router.back() })
          default:
            if (currentUser) {
              return generateLink('Личный кабинет', undefined, '/personalAccount');
            } else {
              return generateLink('Регистрация', undefined, '/registration');
            }
        }
      })()}
    </div>
  );
}
