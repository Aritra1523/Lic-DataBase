import { useState } from "react";
import { toast } from "react-toastify";
import { databases, DATABASE_ID, COLLECTION_ID } from "../appwrite/config";
import { ID } from "appwrite";
import FileUpload from "../components/FileUpload";
import "../App.css";
function AddCustomer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [policy, setPolicy] = useState("");
  const [premiumAmount, setPremiumAmount] = useState("");
  const [EnrollmentDate, setEnrollmentDate] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [motherName, setmotherName] = useState("");
  const [fileId, setFileId] = useState("");
  const [aadharFile, setAadharFile] = useState("");
  const [panFile, setPanFile] = useState("");
  const [photoFile, setPhotoFile] = useState("");
  const [bankFile, setBankFile] = useState("");
  const [policyType, setPolicyType] = useState("");
const [loading, setLoading] = useState(false);

/*Add Customer Function*/ 

  const addCustomer = async () => {
     if (!name  || !premiumAmount || !EnrollmentDate || !policyType) {
    alert("Please fill all required fields ❗");
    return;
  }
   console.log("File IDs:", {
    aadharFile,
    panFile,
    photoFile,
    bankFile,
  });
    try {
      setLoading(true)
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        fullName: name,
        phone: phone,
        policyNumber: policy,
        // document: fileId,
        premiumAmount: premiumAmount,
        EnrollmentDate: EnrollmentDate,
        DateOfBirth: dateOfBirth,
        FatherName: fatherName,
        MotherName: motherName,
        aadhar: aadharFile,
        pan: panFile,
        photo: photoFile,
        bankPassbook: bankFile,
        policyType: policyType,

        
      });

      // alert("Customer Added successfully ✅"),
      toast.success("Customer Added Successfully ✅");
      setName(""),
      setPhone(""),
      setPolicy(""),
      setPremiumAmount(""),
      setEnrollmentDate(""),
      setdateOfBirth("")
      setfatherName(""), setmotherName(""),
      setAadharFile(""),
      setPanFile(""),
      setPhotoFile(""),
      setBankFile(""),
      setPolicyType(""),
      setFileId("")
    } catch (error) {
      console.log(error);
    }finally {
    setLoading(false); 
  }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-400 flex justify-center items-center p-6">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-10">

      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        Add Customer
      </h2>

      {/* Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Customer Name **
          </label>
          <input
            type="text"
            placeholder="Enter customer name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Phone
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Policy Number
          </label>
          <input
            type="text"
            placeholder="Enter policy number"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Premium Amount**
          </label>
          <input
            type="number"
            placeholder="Premium amount"
            required
            value={premiumAmount}
            onChange={(e) => setPremiumAmount(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Enrollment Date**
          </label>
          <input
            type="date"
            value={EnrollmentDate}
            required
            onChange={(e) => setEnrollmentDate(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Policy Type**
          </label>
          <input
            type="text"
            placeholder="Policy Type"
            value={policyType}
            required
            onChange={(e) => setPolicyType(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Father's Name
          </label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setfatherName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Mother's Name
          </label>
          <input
            type="text"
            value={motherName}
            onChange={(e) => setmotherName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>
      </div>

      {/* Documents Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Upload Documents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-indigo-500 transition">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              Aadhar Card
            </p>
            <FileUpload setFileId={setAadharFile} />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-indigo-500 transition">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              PAN Card
            </p>
            <FileUpload setFileId={setPanFile} />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-indigo-500 transition">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              Photo
            </p>
            <FileUpload setFileId={setPhotoFile} />
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:border-indigo-500 transition">
            <p className="text-sm font-semibold text-gray-600 mb-3">
              Bank Passbook
            </p>
            <FileUpload setFileId={setBankFile} />
          </div>

        </div>
      </div>

      {/* Button */}
      <div className="mt-10 text-center">
        <button
          onClick={addCustomer}
          disabled={loading}
          className={`px-10 py-3 rounded-lg font-semibold text-white shadow-md transition
          ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
          }`}
        >
          {loading ? "Adding Customer..." : "Add Customer"}
        </button>
      </div>

    </div>
  </div>
);
}

export default AddCustomer;




