import Image from "next/image";
import authImg from "../../../public/images/Image.png";
import logoImg from "../../../public/images/Logo-white.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen bg-[#0D1321] text-white p-8 overflow-hidden ">
      <div className="w-full h-full flex flex-row gap-25">
        <section className="w-[50%] h-full flex flex-col justify-start items-start pl-4">
          <div className="">
            <Image
              src={logoImg}
              alt="Quizwiz Logo"
              width={140}
              height={40}
              priority
            />
          </div>

          <div className="flex-1 w-full flex items-center justify-start">
            <div className="w-full ">{children}</div>
          </div>
        </section>

        <section className="w-[45%] h-full relative">
          <div className="relative w-full h-full rounded-3xl overflow-hidden">
            <Image
              src={authImg}
              alt="Authentication"
              fill
              priority
              className="object-cover"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
