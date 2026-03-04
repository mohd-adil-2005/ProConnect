import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Import models
import User from "../Models/userModel.js";
import Post from "../Models/postModel.js";
import Comment from "../Models/commentModel.js";
import Profile from "../Models/profileModel.js";
import ConnectionRequest from "../Models/connectionModel.js";

// 30–40 users: American and Islamic first names + last names
const FIRST_NAMES = [
  "James", "Michael", "Robert", "David", "William", "Richard", "Joseph", "Thomas", "Christopher", "Daniel",
  "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin",
  "Ahmad", "Omar", "Hassan", "Yusuf", "Ibrahim", "Khalid", "Tariq", "Rashid", "Amir", "Farhan",
  "Sarah", "Aisha", "Fatima", "Zainab", "Mariam", "Layla", "Nadia", "Samira", "Yasmin", "Leila",
];
const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White",
  "Hassan", "Ali", "Khan", "Hussein", "Malik", "Rahman", "Siddiqui", "Abbas", "Farooq", "Noor",
];

// Post bodies (replace with your own content if needed)
const POST_BODIES = [
  "Discussing global affairs and how communities stay connected in changing times.",
  "Sharing thoughts on international relations and the importance of dialogue.",
  "A reflection on world news and staying informed as responsible citizens.",
  "Thoughts on diplomacy, cooperation, and building bridges between cultures.",
  "How current events shape our perspectives and the value of diverse viewpoints.",
  "Reflecting on news and media and the role of balanced discussion.",
  "The importance of staying engaged with world events while supporting local community.",
  "Thoughts on how global and local issues intersect in our daily lives.",
  "Sharing perspectives on international cooperation and mutual understanding.",
  "A moment to reflect on current affairs and the power of informed conversation.",
  "How we can contribute to constructive dialogue about world events.",
  "The role of social platforms in sharing and discussing global perspectives.",
  "Staying curious about the world while respecting different viewpoints.",
  "Reflections on community, connection, and the broader world we share.",
  "Thoughts on how we stay informed and engaged in a connected world.",
];

const COMMENT_TEXTS = [
  "Great point, thanks for sharing.",
  "I agree with this perspective.",
  "This is an important discussion.",
  "Well said.",
  "Interesting take on this.",
  "Appreciate you posting this.",
  "Good to see this kind of dialogue.",
  "Thanks for the thoughtful post.",
  "Resonates with me.",
  "Worth considering.",
  "Helpful perspective.",
  "Couldn't agree more.",
  "This deserves more attention.",
  "Nice post.",
  "Important topic.",
];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function runSeed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");

    // Clear existing data (order matters for refs)
    console.log("Clearing existing data...");
    await Comment.deleteMany({});
    await Post.deleteMany({});
    await ConnectionRequest.deleteMany({});
    await Profile.deleteMany({});
    await User.deleteMany({});
    console.log("Existing data cleared.");

    const defaultPassword = "SeedPass123!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 12);

    const users = [];
    const usedUsernames = new Set();

    // Guaranteed users you can always use to log in after seed
    const guaranteedUsers = [
      { name: "Ahmad Khan", username: "ahmadkhan", isVerified: false },
      { name: "James Smith", username: "jamesmith", isVerified: false },
      { name: "Sarah Hassan", username: "sarahhassan", isVerified: false },
      // Well-known public figures marked as verified
      { name: "Donald Trump", username: "donaldtrump", isVerified: true },
      { name: "Vladimir Putin", username: "vladimirputin", isVerified: true },
      { name: "Kim Jong Un", username: "kimjongun", isVerified: true },
      { name: "Narendra Modi", username: "narendramodi", isVerified: true },
    ];
    for (const { name, username, isVerified } of guaranteedUsers) {
      const user = await User.create({
        name,
        username,
        email: `seed.${username}@example.com`,
        password: hashedPassword,
        profilePicture: "default.jpg",
        active: true,
        isVerified,
      });
      users.push(user);
      usedUsernames.add(username);
      await Profile.create({
        userId: user._id,
        bio: "Engineer with a background in large scale systems.",
        currentPost: "Senior Software Engineer",
        postwork: [
          {
            company: "TechNova Labs",
            position: "Software Engineer",
            years: "3",
          },
        ],
        education: [
          {
            school: "State University",
            degree: "B.Tech",
            fieldStudy: "Computer Science Engineering",
          },
        ],
      });
    }

    // Rest: random American + Islamic names (keep total around 35–40)
    const userCount = 35 - guaranteedUsers.length;
    for (let i = 0; i < userCount; i++) {
      let first = randomChoice(FIRST_NAMES);
      let last = randomChoice(LAST_NAMES);
      let username = (first + last).toLowerCase().replace(/\s/g, "");
      let safe = 0;
      while (usedUsernames.has(username) && safe < 100) {
        first = randomChoice(FIRST_NAMES);
        last = randomChoice(LAST_NAMES);
        username = (first + last).toLowerCase().replace(/\s/g, "") + (safe > 50 ? safe : "");
        safe++;
      }
      usedUsernames.add(username);

      const name = `${first} ${last}`;
      const email = `seed.${username}@example.com`;

      const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        profilePicture: "default.jpg",
        active: true,
        isVerified: false,
      });
      users.push(user);

      await Profile.create({
        userId: user._id,
        bio: "Engineer working on modern web applications.",
        currentPost: "Software Engineer",
        postwork: [
          {
            company: "CloudScale Systems",
            position: "Full Stack Engineer",
            years: String(randomInt(1, 6)),
          },
        ],
        education: [
          {
            school: "Engineering College",
            degree: "B.E.",
            fieldStudy: "Software Engineering",
          },
        ],
      });
    }

    console.log(`Created ${users.length} users and profiles.`);
    console.log("\n--- Log in with any of these (password: " + defaultPassword + ") ---");
    console.log("  seed.ahmadkhan@example.com");
    console.log("  seed.jamesmith@example.com");
    console.log("  seed.sarahhassan@example.com");
    console.log("  seed.donaldtrump@example.com (verified)");
    console.log("  seed.vladimirputin@example.com (verified)");
    console.log("  seed.kimjongun@example.com (verified)");
    console.log("  seed.narendramodi@example.com (verified)");

    // Create posts: 2–4 per user, likes 600k–2m
    const posts = [];
    for (const user of users) {
      const numPosts = randomInt(2, 4);
      for (let p = 0; p < numPosts; p++) {
        const likes = randomInt(600000, 2000000);
        const post = await Post.create({
          userId: user._id,
          body: randomChoice(POST_BODIES),
          likes,
          media: "",
          active: true,
        });
        posts.push(post);
      }
    }

    // High-engagement posts from verified public-figure accounts
    const specialUsernames = [
      {
        username: "kimjongun",
        body:
          "Sharing a statement on nuclear capabilities and the importance of avoiding escalation, focusing on deterrence and stability.",
      },
      {
        username: "vladimirputin",
        body:
          "Commentary on strategic weapons treaties and the need for dialogue to reduce nuclear risks between major powers.",
      },
      {
        username: "donaldtrump",
        body:
          "Reflecting on past negotiations about nuclear programs and how diplomacy can prevent dangerous misunderstandings.",
      },
      {
        username: "narendramodi",
        body:
          "Discussing responsible use of advanced technology and the role of nuclear policy in maintaining regional peace.",
      },
    ];

    for (const { username, body } of specialUsernames) {
      const user = users.find((u) => u.username === username);
      if (!user) continue;
      const likes = randomInt(3000000, 5000000); // ~3M–5M likes
      const post = await Post.create({
        userId: user._id,
        body,
        likes,
        media: "",
        active: true,
      });
      posts.push(post);
    }

    console.log(`Created ${posts.length} posts (including high-engagement verified posts).`);

    // Create 10–15 comments per post using bulk insert (fast)
    const commentsPerPost = randomInt(10, 15);
    console.log(`Creating comments (~${commentsPerPost} per post)...`);
    const BATCH_SIZE = 500;
    const allCommentDocs = [];
    for (const post of posts) {
      for (let c = 0; c < commentsPerPost; c++) {
        const commenter = users[randomInt(0, users.length - 1)];
        allCommentDocs.push({
          userId: commenter._id,
          postId: post._id,
          comment: randomChoice(COMMENT_TEXTS),
        });
      }
    }
    for (let i = 0; i < allCommentDocs.length; i += BATCH_SIZE) {
      const batch = allCommentDocs.slice(i, i + BATCH_SIZE);
      await Comment.insertMany(batch);
      console.log(`  Comments: ${Math.min(i + BATCH_SIZE, allCommentDocs.length)} / ${allCommentDocs.length}`);
    }

    console.log(`Created ${allCommentDocs.length} comments (~${commentsPerPost} per post).`);
    console.log("\nSeed complete.");
    console.log("All seed users have password: " + defaultPassword);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from DB");
    process.exit(0);
  }
}

runSeed();
