import { useState } from "react";
import { storage, BUCKET_ID } from "../appwrite/config";
import { ID } from "appwrite";

function FileUpload({ setFileId }) {

  const [status, setStatus] = useState("");

  const upload = async (selectedFile) => {

    if (!selectedFile) {
      setStatus("Please select a file first");
      return;
    }

    try {

      setStatus("Uploading...");

      const res = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        selectedFile
      );

      setFileId(res.$id);

      setStatus("Upload Successful ✅");

    } catch (err) {

      console.log(err);
      alert(err.message);
      alert(err)
      setStatus("Upload Failed ❌");

    }

  };

  return (

    <div>

      <input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => upload(e.target.files[0])}
      />

      <p>{status}</p>

    </div>

  );

}

export default FileUpload;