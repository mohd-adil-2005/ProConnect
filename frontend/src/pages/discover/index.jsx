


import UserLayout from "@/layout/userlayout";
import DashboardLayout from "@/layout/dasboardLayout";
import Avatar from "@/Component/Avatar";
import VerifiedBadge from "@/Component/VerifiedBadge";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "@/config/redux/action/authaction";
import { BASE_URL, getProfileImageUrl } from "@/config/index";
import styles from "./style.module.css";
import { useRouter } from "next/router";

function Discover() {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const router = useRouter();
    const currentUserId = authState.user?.userId?._id;

    const handleCardClick = (user) => {
        const target = user?.userId;
        if (!target) return;
        const targetId = target._id;
        const targetUsername = target.username;
        if (currentUserId && targetId && String(currentUserId) === String(targetId)) {
            router.push("/profile");
        } else if (targetUsername) {
            router.push(`/view_profile?username=${targetUsername}`);
        }
    };

    useEffect(() => {
        if (!authState.all_profiles_fetched) {
            dispatch(getAllUser());
        }
    }, []);

    return (
        <UserLayout>
            <DashboardLayout>
                <div className={styles.alluserProfile}>
                    <h1>Discover</h1>
                    {authState.all_profiles_fetched && authState.all_profiles.map((users) => {
                        return (
                            <div 
                                onClick={() => handleCardClick(users)} 
                                className={styles.userCard} 
                                key={users._id}
                            >
                                  <Avatar
                                    src={getProfileImageUrl(users.userId?.profilePicture)}
                                    name={users.userId?.name}
                                    username={users.userId?.username}
                                    size={50}
                                  />
                                <div>
                                    <h3 className={styles.userName} style={{ display: "flex", alignItems: "center" }}>
                                        {users.userId?.name}
                                        {users.userId?.isVerified && (
                                            <VerifiedBadge size={18} />
                                        )}
                                    </h3>
                                    <p style={{ color: "gray" }} className={styles.userName}>
                                        {users.userId?.username}
                                    </p>
                                </div>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </DashboardLayout>
        </UserLayout>
    );
}

export default Discover;




              