interface DateDisplayProps {
  isCurrentlyListening: boolean;
  date: string;
}

export default function DateDisplay({ isCurrentlyListening, date }: DateDisplayProps) {
  return (
    <div className="px-10 mt-8 flex justify-between text-white w-[90%] ">
      <div className="text-md">{date}</div>
      <div className="text-md">
        {isCurrentlyListening ? "Currently Listening" : "History"}
      </div>
    </div>  
  );
} 