import { use, useState } from "react";
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
  const addCustomer = async () => {
    try {
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

      alert("Customer Added"),
      setName(""),
      setPhone(""),
      setPolicy(""),
      setPremiumAmount(""),
      setEnrollmentDate(""),
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
    <div className="min-h-screen bg-gray-500 p-8 flex justify-center">
      <div className="w-full max-w-3xl bg-gray rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
          Add Customer
        </h2>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-lg font-semibold text-black-900">
              Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-500 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-lg font-semibold text-black-600">
              Date of Birth
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setdateOfBirth(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-black-600">
              Phone
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-black-600">
              Policy Number
            </label>
            <input
              type="text"
              placeholder="Enter policy number"
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-black-600">
              Premium Amount
            </label>
            <input
              type="number"
              placeholder="Premium amount"
              value={premiumAmount}
              onChange={(e) => setPremiumAmount(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-300 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-lg font-semibold text-black-600">
              Enrollment Data
            </label>
            <input
              type="date"
              value={EnrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-black-600">
              Policy Type
            </label>
            <input
              type="text"
              placeholder="Pllicy Type"
              value={policyType}
              onChange={(e) => setPolicyType(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-300 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-lg font-semibold text-black-600">
              Father's Name
            </label>
            <input
              type="text"
              value={fatherName}
              onChange={(e) => setfatherName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-lg font-semibold text-black-600">
              Mother's Name
            </label>
            <input
              type="text"
              value={motherName}
              onChange={(e) => setmotherName(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-1 focus:ring-black-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-black-700 mb-6">
            Upload Documents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-black-50 hover:border-indigo-500 transition">
              <p className="text-lg font-semibold text-black-600 mb-3">
                Aadhar Card
              </p>
              <FileUpload setFileId={setAadharFile} />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-black-50 hover:border-indigo-500 transition">
              <p className="text-lg font-semibold text-black-600 mb-3">
                PAN Card
              </p>
              <FileUpload setFileId={setPanFile} />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-black-50 hover:border-indigo-500 transition">
              <p className="text-lg font-semibold text-black-600 mb-3">Photo</p>
              <FileUpload setFileId={setPhotoFile} />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-black-50 hover:border-indigo-500 transition">
              <p className="text-lg font-semibold text-black-600 mb-3">
                Bank Passbook
              </p>
              <FileUpload setFileId={setBankFile} />
            </div>
          </div>
        </div>

       
        <button
  onClick={addCustomer}
  disabled={loading}
  className={`px-8 py-3 rounded-lg font-semibold transition
  ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
>
  {loading ? "Adding..." : "Add Customer"}
</button>
      </div>
    </div>
  );
}

export default AddCustomer;
