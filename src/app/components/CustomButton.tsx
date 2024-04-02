'use client';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { signInWithGoogle } from "@/app/PersonalHooks/useFirebaseAuth";
import { CustomButtonProps } from "../types/index";

export default function CustomButton({
  title,
  containerStyles,
  btnType,
  iconBefore,
}: CustomButtonProps) {
  const router = useRouter();

  const handleSignIn = async () => {
    await signInWithGoogle();
    router.back();
  }
  return (
    <button
      disabled={false}
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleSignIn}
    >
      {iconBefore && (
        <Image
          src={iconBefore}
          alt="icon"
          style={{ width: "auto", height: "90%" }}
          width={50}
          height={50}
          priority
        />
      )}
      <span>{title}</span>
    </button>
  );
}
