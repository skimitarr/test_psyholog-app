import Image from "next/image";
import CustomButton from "../../components/CustomButton";

export default function page() {
  return (
    <>
      <div className="pt-[30px] mb-[100px] flex justify-center">
        <Image
          src="/mainLogo.png"
          alt="Logo"
          width={500}
          height={422}
          priority
        />
      </div>
      <div className="max-w-[300px] mx-[auto] pb-[30px]">
        <CustomButton
          title={"Continue with Google"}
          containerStyles={
            "w-full h-full flex justify-center items-center text-black text-xl border-2 border-gray-500 rounded-md hover:bg-gray-400 transition-colors duration-300 ease-in-out"
          }
          btnType={"button"}
          iconBefore={"/google.logo.png"}
        />
      </div>
    </>
  );
}

