import { Avatar, AvatarFallback } from "../ui/avatar";

export default function ProfileLogo({ initial }: { initial?: string }) {
  const firstLetter = initial ? initial.charAt(0).toUpperCase() : "U";
  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback className="bg-[#7f22fe] text-white font-semibold">
        {firstLetter}
      </AvatarFallback>
    </Avatar>
  );
}
