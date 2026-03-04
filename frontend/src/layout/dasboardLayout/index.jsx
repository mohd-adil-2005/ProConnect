import styles from "./style.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setisTokenThere } from "@/config/redux/reducer/authreducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import VerifiedBadge from "@/Component/VerifiedBadge";

function DashboardLayout({ children }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = router.pathname || "";
  const currentUserId = authState.user?.userId?._id;
  const isActive = (path) => pathname === path || (path !== "/dashboard" && pathname.startsWith(path));
  const topProfiles = authState.all_profiles_fetched && Array.isArray(authState.all_profiles)
    ? authState.all_profiles.filter((profile) => profile.userId?.isVerified)
    : [];
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      router.push("/login");
    }
    dispatch(setisTokenThere());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <div className={styles.homeContainer_left}>
          <div
            onClick={() => router.push("/dashboard")}
            className={styles.sidebarOption}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <p>Scroll</p>
          </div>
          <div
            onClick={() => router.push("/discover")}
            className={styles.sidebarOption}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <p>Discover</p>
          </div>

          <div
            onClick={() => router.push("/my_connections")}
            className={styles.sidebarOption}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>

            <p>My Connections</p>
          </div>
        </div>

        <div className={styles.homeContainer_feedContainer}>{children}</div>
        <div className={styles.homeContainer_extraContainer}>
          <h3>Top profiles</h3>
          {topProfiles.length === 0 && (
            <p className={styles.topProfilesEmpty}>No verified profiles yet.</p>
          )}
          {topProfiles.map((profile) => {
            const user = profile.userId;
            if (!user) return null;
            const isOwn = currentUserId && user._id && String(currentUserId) === String(user._id);
            return (
              <div
                key={user._id || profile._id}
                className={styles.topProfileItem}
                onClick={() => {
                  if (isOwn) router.push("/profile");
                  else if (user.username) router.push(`/view_profile?username=${user.username}`);
                }}
              >
                <p className={styles.topProfileName}>
                  {user.name}
                  <VerifiedBadge size={16} />
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.mobileNavBar} role="navigation" aria-label="Main navigation">
        <div
          onClick={() => router.push("/dashboard")}
          className={`${styles.singleitemNavbarView} ${isActive("/dashboard") ? styles.activeNavItem : ""}`}
          aria-current={isActive("/dashboard") ? "page" : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>

        <div
          onClick={() => router.push("/discover")}
          className={`${styles.singleitemNavbarView} ${isActive("/discover") ? styles.activeNavItem : ""}`}
          aria-current={isActive("/discover") ? "page" : undefined}
        >
         <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
        </div>

        <div
          onClick={() => router.push("/my_connections")}
          className={`${styles.singleitemNavbarView} ${isActive("/my_connections") ? styles.activeNavItem : ""}`}
          aria-current={isActive("/my_connections") ? "page" : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
