import { useState } from "react";
import styles from "./styles.module.css";

/**
 * Get first and last letter for avatar initials.
 * "John Doe" -> "JD", "bnm" -> "BM", "a" -> "A"
 */
export function getInitials(nameOrUsername) {
  const s = nameOrUsername && String(nameOrUsername).trim();
  if (!s) return "U";
  const parts = s.split(/\s+/).filter(Boolean);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  if (s.length === 1) return s[0].toUpperCase();
  return (s[0] + s[s.length - 1]).toUpperCase();
}

/**
 * Check if we should show the profile image (valid URL and not default placeholder).
 */
export function hasValidProfileImage(src) {
  if (!src || typeof src !== "string") return false;
  if (src === "default.jpg") return false;
  return true;
}

export default function Avatar({
  src,
  name,
  username,
  size = 50,
  className = "",
  onClick,
  alt = "Profile",
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage =
    hasValidProfileImage(src) && !imgFailed;
  const initials = getInitials(name || username || "");

  const sizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
    minWidth: `${size}px`,
    minHeight: `${size}px`,
    fontSize: size <= 40 ? "0.75rem" : size <= 56 ? "1rem" : "1.25rem",
  };

  if (showImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${styles.avatarImg} ${className}`.trim()}
        style={{
          ...sizeStyle,
          borderRadius: "50%",
          objectFit: "cover",
          display: "block",
          cursor: onClick ? "pointer" : undefined,
        }}
        onClick={onClick}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <div
      className={`${styles.avatarInitials} ${className}`.trim()}
      style={{
        ...sizeStyle,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4CAF50",
        color: "white",
        fontWeight: "bold",
        cursor: onClick ? "pointer" : undefined,
      }}
      onClick={onClick}
    >
      {initials}
    </div>
  );
}
