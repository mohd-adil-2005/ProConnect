import Head from "next/head";
import { useRouter } from "next/router";
import UserLayout from "@/layout/userlayout";
import styles from "@/styles/Home.module.css";

export default function Home() {
const router= useRouter();
  return (
    <UserLayout>
    <>
    
    <div className={styles.container}>
    <Head>
      <title>Pro Connect — Connect with friends without exaggeration</title>
    </Head>
    <div className={styles.mainContainer}>
      <div className={styles.container_Left}>
         <h1 className={styles.headline}>Connect with friends<br />without exaggeration</h1>
         <p className={styles.tagline}>A true social media platform, with stories with no bluffs.</p>
         <div onClick={()=>{router.push("/login")}} className={styles.buttonJoin}>
          <p>Join Now</p>
         </div>
         </div>
      <div className={styles.container_right}>
        <img src="images/banner.png" alt="connection_img" />
      </div>
    </div>

    </div>

    </>
    </UserLayout>
   
  );
}
