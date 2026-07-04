import { RiSafe3Fill } from "react-icons/ri";
import { RiAlarmAddFill } from "react-icons/ri";
export default function Quizzes() {
  return (

    <>
    <div className="flex flex-wrap gap-6">
      <button className="inline-flex flex-col items-center justify-center gap-4 border border-[#00000033]  rounded-2xl px-10 py-8  cursor-pointer">
        <RiAlarmAddFill  size={48} className="text-black" />
        <span className="text-xl font-semibold text-black">
          Set up a new quiz
        </span>
      </button>

      <button className="inline-flex flex-col items-center justify-center gap-4 border border-[#00000033] rounded-2xl px-10 py-8 cursor-pointer">
        <RiSafe3Fill size={48} className="text-black" />

        <span className="text-xl font-semibold text-black">Question Bank</span>
      </button>
    </div>
    </>

  );
}
