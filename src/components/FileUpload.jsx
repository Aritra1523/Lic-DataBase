import { useState } from "react";
import { storage, BUCKET_ID } from "../appwrite/config";
import { ID } from "appwrite";

function FileUpload({ setFileId }) {

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const upload = async () => {

    if (!file) {
      setStatus("Please select a file first");
      return;
    }

    try {

      setStatus("Uploading...");

      const res = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );

      setFileId(res.$id);

      setStatus("Upload Successful ✅");

    } catch (err) {
      console.log(err);
      alert(err.message);
      // alert(file)
      // alert(file.size)
      setStatus("Upload Failed ❌");

    }

  };

  return (

    <div>

      <input
        type="file"
       // accept=".pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload}>
        Upload Document
      </button>

      <p>{status}</p>

    </div>

  );

}

export default FileUpload;