
import { useState } from "react";
import { storage, BUCKET_ID } from "../appwrite/config";
import { ID } from "appwrite";

function FileUpload({ setFileId }) {
  const [status, setStatus] = useState("");

  const upload = async (e) => {
    const selectedFile = e.target.files[0];

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
