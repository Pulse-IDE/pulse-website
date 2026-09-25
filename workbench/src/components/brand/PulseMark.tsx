import { WorkbenchIcon } from "@/components/icons/WorkbenchIcon";

interface PulseMarkProps {
  size?: "sm" | "md";
  className?: string;
}

export function PulseMark({ size = "md", className = "" }: PulseMarkProps) {
  const box = size === "sm" ? "h-7 w-7 rounded-lg" : "h-8 w-8 rounded-lg";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-[#5B9DFF] to-[#22D3EE] text-white shadow-[0_0_20px_rgba(91,157,255,0.35)] ${box} ${className}`}
    >
      <WorkbenchIcon name="pulse" className={icon} />
    </div>
  );
}
