import PDFDocument from "pdfkit";
import axios from "axios";
import fs from "fs";
import path from "path";
import os from "os"; // <--- Import OS module

const  convertUserDataToPDF = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      
      // FIXED: Use system temp directory (Works on Render, Windows, Mac)
      const tempPath = path.join(os.tmpdir(), `resume-${Date.now()}.pdf`);

      const stream = fs.createWriteStream(tempPath);
      doc.pipe(stream);

      // ===== PROFILE IMAGE LOGIC =====
      if (userData?.userId?.profilePicture?.startsWith("http")) {
        try {
          const imageResponse = await axios.get(
            userData.userId.profilePicture,
            { responseType: "arraybuffer" }
          );
          doc.image(imageResponse.data, doc.page.width / 2 - 50, 40, { width: 100 });
          doc.moveDown(6);
        } catch (imgErr) {
          console.log("Could not load profile image for PDF");
          doc.moveDown(4);
        }
      }

      doc.fontSize(18).text(userData.userId?.name || "User", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Username: ${userData.userId?.username}`);
      doc.text(`Email: ${userData.userId?.email}`);
      doc.moveDown();
      doc.text("Bio:");
      doc.text(userData.bio || "No bio available.");

      doc.end();

      stream.on("finish", () => resolve(tempPath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

export default convertUserDataToPDF;