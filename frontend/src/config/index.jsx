import axios from "axios";

// Server (getServerSideProps): use local backend in dev so seed data is found
// Browser: use local backend when on localhost
const isServer = typeof window === "undefined";
const isDev = process.env.NODE_ENV === "development";
const isBrowserLocalhost = !isServer && window?.location?.hostname === "localhost";
const USE_LOCAL_BACKEND = (isServer && isDev) || isBrowserLocalhost;
export const BASE_URL = USE_LOCAL_BACKEND ? "http://localhost:8080/" : "https://proconnectp.onrender.com/";

export const clientServer = axios.create({
  baseURL: BASE_URL,
});

/** Resolve profile image URL: full URL as-is, else BASE_URL + uploads/ + filename */
export function getProfileImageUrl(profilePicture) {
  if (!profilePicture || profilePicture === "default.jpg") return null;
  if (typeof profilePicture === "string" && profilePicture.startsWith("http")) return profilePicture;
  return BASE_URL + "uploads/" + profilePicture;
}
