
import { useState } from "react";
import imageCompression from "browser-image-compression";
import { storage, BUCKET_ID } from "../appwrite/config";
import { ID } from "appwrite";

function FileUpload({ setFileId }) {
  const [status, setStatus] = useState("");


  const upload = async (e) => {
  let selectedFile = e.target.files[0];

  if (!selectedFile) {
    setStatus("Please select a file first");
    return;
  }

  try {
    setStatus("Uploading...");

    const res = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      selectedFile,
      ["read(\"any\")"]
    );

    setFileId(res.$id);

    setStatus(`${selectedFile.name} uploaded successfully ✅`);
  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("MESSAGE:", err.message);
    console.log("RESPONSE:", err.response?.message);

    setStatus("Upload Failed ❌");
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
