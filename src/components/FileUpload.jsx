
import { useState } from "react";
import imageCompression from "browser-image-compression";
import { storage, BUCKET_ID } from "../appwrite/config";
import { ID } from "appwrite";

function FileUpload({ setFileId }) {
  const [status, setStatus] = useState("");

  const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.5, // 500KB
    maxWidthOrHeight: 1200,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log(error);
    return file;
  }
};

  const upload = async (e) => {
    let selectedFile = e.target.files[0];

    if (!selectedFile) {
      setStatus("Please select a file first");
      return;
    }

    try {
      setStatus("Processing...");

      // Compress only if image
    if (selectedFile.type.startsWith("image/")) {
      selectedFile = await compressImage(selectedFile);
    }

    setStatus("Uploading...");

      const res = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        selectedFile,
      );

      setFileId(res.$id);

      setStatus(`${selectedFile.name} uploaded successfully ✅`);
    } catch (err) {
      console.log(err);
      setStatus("Upload Failed ❌");
      alert( err);
      alert(err.response);
      alert(err.message);
      setStatus(err.response);
    }
  };
  

  return (
    <div>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        capture="environment"
        onChange={upload}
      />

      <p>{status}</p>
    </div>
  );
}

export default FileUpload;
