import { Calendar } from 'react-feather';

export default function Header() {
  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
          AY
        </div>
        <h1 className="text-4xl font-bold text-white">Good Morning, Annie.</h1>
      </div>
      <Calendar className="text-white w-8 h-8" />
    </div>
  );
} 