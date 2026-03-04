/**
 * Verified badge – Instagram / X style: blue circle with white checkmark
 */
export default function VerifiedBadge({ size = 20, className = "" }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        marginLeft: 0,
        marginRight: 0,
        verticalAlign: "middle",
        flexShrink: 0,
      }}
      aria-label="Verified"
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ display: "block" }}
      >
        <circle cx="12" cy="12" r="12" fill="#1D9BF0" />
        <path
          fill="#FFFFFF"
          fillRule="evenodd"
          d="M17.06 8.28l-6.5 6.5a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l2.47 2.47 5.97-5.97a.75.75 0 111.06 1.06z"
        />
      </svg>
    </span>
  );
}
