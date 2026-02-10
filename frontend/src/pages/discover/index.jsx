


import UserLayout from "@/layout/userlayout";
import DashboardLayout from "@/layout/dasboardLayout";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "@/config/redux/action/authaction";
import { BASE_URL } from "@/config/index";
import styles from "./style.module.css";
import { useRouter } from "next/router";

function Discover() {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const router = useRouter();

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
                                onClick={() => { router.push(`/view_profile?username=${users.userId.username}`) }} 
                                className={styles.userCard} 
                                key={users._id}
                            >
                                  {users.userId?.profilePicture && 
 users.userId.profilePicture !== 'default.jpg' && 
 users.userId.profilePicture.startsWith('http') ? (
 <img  
        src={users.userId?.profilePicture} 
        alt="Profile"
        className="userProfile"
        style={{
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    aspectRatio: "1 / 1",
  }}
        onError={(e) => {
            e.target.style.display = 'none'; // Hide broken image
        }}
    />
) : (
    <div style={{ 
        width: '50px', 
        height: '50px', 
        borderRadius: '50%', 
        backgroundColor: '#4CAF50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white'
    }}>

        {users.userId?.username?.[0]?.toUpperCase() || 'U'}
    </div>
)}
                               
                                <div>
                                    <h3 className={styles.userName}>{users.userId?.name}</h3>
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




              