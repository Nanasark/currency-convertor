import Convertor from "@/components/convertor";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-orange-900 flex-col items-center justify-between p-5 lg:p-12">
      <div className="flex h-screen flex-col  lg:flex-row lg:gap-5 gap-3 w-full">
        <div className="lg:w-1/2 lg:h-full h-1/3 rounded-[15px] flex justify-center items-center bg-slate-400">Text here</div>
        <div className="lg:w-1/2 lg:h-full h-2/3 rounded-[15px] flex justify-center items-center bg-gray-950">
        <Convertor />
        </div>
      </div>
    </main>
  );
}