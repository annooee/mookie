import { Calendar } from "react-feather";

export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center px-8 pt-4 w-full">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
          AU
        </div>
        <Calendar className="text-white w-8 h-8" />
      </div>
      
      <div className="text-center px-4 pt-4">
        <h1 className="text-xl font-bold text-white">Good Morning, Anthony.</h1>
      </div>
    </>
  );
}
