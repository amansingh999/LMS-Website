const express = require("express");
const multer = require("multer");
const { uploadMediaToS3, deleteMediaFromS3 } = require("../../helpers/s3");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload single file
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await uploadMediaToS3(req.file);

    res.status(200).json({
      success: true,
      data: {
        url: result.Location, // Public S3 URL
        key: result.Key,      // Needed for deletion
      },
    });
  } catch (e) {
    console.error("Upload Error:", e);
    res.status(500).json({ success: false, message: "Error uploading file" });
  }
});

// Delete single file
router.delete("/delete/:key", async (req, res) => {
  try {
    const { key } = req.params;

    if (!key) {
      return res.status(400).json({ success: false, message: "File key is required" });
    }

    await deleteMediaFromS3(key);

    res.status(200).json({
      success: true,
      message: "File deleted successfully from S3",
    });
  } catch (e) {
    console.error("Delete Error:", e);
    res.status(500).json({ success: false, message: "Error deleting file" });
  }
});

// Bulk upload files
router.post("/bulk-upload", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploadPromises = req.files.map((file) => uploadMediaToS3(file));
    const results = await Promise.all(uploadPromises);

    const files = results.map((result) => ({
      url: result.Location,
      key: result.Key,
    }));

    res.status(200).json({
      success: true,
      data: files,
    });
  } catch (e) {
    console.error("Bulk Upload Error:", e);
    res.status(500).json({ success: false, message: "Error in bulk uploading files" });
  }
});

module.exports = router;
