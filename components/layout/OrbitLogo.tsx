/**
 * Orbit logo mark — bold geometric "O" ring.
 * Inline SVG for instant rendering.
 */
export function OrbitLogo({
  size = 28,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Orbit"
    >
      <rect width="512" height="512" rx="112" fill="#1a1a2e" />
      <circle cx="256" cy="256" r="120" stroke="white" strokeWidth="48" fill="none" />
      <circle cx="340" cy="172" r="28" fill="#60a5fa" />
    </svg>
  )
}
