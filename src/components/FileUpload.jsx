import { useState } from "react";
import { storage, BUCKET_ID } from "../appwrite/config";
import { ID } from "appwrite";

function FileUpload({ setFileId }) {

  const [file,setFile] = useState(null);

  const upload = async () => {

    if(!file){
      alert("Select file first");
      return;
    }

    try{

      const res = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );

      setFileId(res.$id);

      alert("File Uploaded");

    }catch(err){
      console.log(err);
    }

  };

  return(

    <div>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
      />

      <button onClick={upload}>
        Upload Document
      </button>

    </div>

  );

}

export default FileUpload;