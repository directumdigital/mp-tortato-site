import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

export default function GridPattern({
  className,
  tone = "light",
  size = 48,
}: {
  className?: string;
  tone?: Tone;
  size?: number;
}) {
  const stroke = tone === "dark" ? "rgba(255,255,255,0.06)" : "rgba(10,15,61,0.06)";
  const dot = tone === "dark" ? "rgba(255,255,255,0.15)" : "rgba(10,15,61,0.12)";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]",
        className
      )}
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`grid-${tone}-${size}`}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${size} 0 L 0 0 0 ${size}`}
              fill="none"
              stroke={stroke}
              strokeWidth={1}
            />
            <circle cx="0" cy="0" r="1" fill={dot} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${tone}-${size})`} />
      </svg>
    </div>
  );
}
