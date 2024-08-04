import Convertor from "@/components/convertor";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#FFEAAE] flex-col items-center justify-between p-5 lg:p-12">
      <div className="flex h-screen flex-col  lg:flex-row lg:gap-5 gap-3 w-full">
        <div className="lg:w-1/2 lg:h-full h-1/3 font-serif text-[4rem] rounded-[15px] flex justify-center items-center bg-[#A53F2B]">Currency Converter</div>
        <div className="lg:w-1/2 lg:h-full h-2/3 rounded-[15px] border-2 border-[#A53F2B] flex justify-center items-center bg-[#141414]">
        <Convertor />
        </div>
      </div>
    </main>
  );
}