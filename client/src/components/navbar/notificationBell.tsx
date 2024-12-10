import { Bell } from "lucide-react";

export default function NotificationBell() {
  return (
    <button className="relative">
      <Bell className="size-5" />
      <span className="absolute -top-1 -right-1 bg-red-500 size-4 text-xs rounded-full flex items-center justify-center">
        3
      </span>
    </button>
  );
}
