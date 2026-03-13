import { useEffect, useState } from "react";
import '../App.css'

import {
  databases,
  DATABASE_ID,
  COLLECTION_ID,
  storage,
  BUCKET_ID,
} from "../appwrite/config";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const loadCustomers = async () => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

    setCustomers(res.documents);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

const deleteCustomer = async (customer) => {
if(!window.confirm("Delete this customer?")) return;
  try {

    if(customer.aadhar){
      await storage.deleteFile(BUCKET_ID, customer.aadhar);
    }

    if(customer.pan){
      await storage.deleteFile(BUCKET_ID, customer.pan);
    }

    if(customer.photo){
      await storage.deleteFile(BUCKET_ID, customer.photo);
    }

    if(customer.bankPassbook){
      await storage.deleteFile(BUCKET_ID, customer.bankPassbook);
    }

    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID,
      customer.$id
    );

    loadCustomers();

  } catch(err){
    console.log(err);
  }

}
const filteredCustomers = customers.filter((c) =>
  c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
  c.phone?.includes(search) ||
  c.policyNumber?.toLowerCase().includes(search.toLowerCase())
);
const totalCustomers = customers.length;

const totalPolicies = customers.length;

const totalPremium = customers.reduce(
  (sum,c)=> sum + Number(c.premiumAmount || 0),
  0
);
 return (
  <div className="p-8 bg-gray-100 min-h-screen">

    <h2 className="text-3xl font-bold mb-6">Customers</h2>

    <input
      type="text"
      placeholder="Search name / phone / policy"
      onChange={(e) => setSearch(e.target.value)}
      className="mb-6 w-full md:w-96 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Total Customers</h3>
        <p className="text-2xl font-bold">{totalCustomers}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Total Policies</h3>
        <p className="text-2xl font-bold">{totalPolicies}</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Total Premium</h3>
        <p className="text-2xl font-bold text-green-600">₹{totalPremium}</p>
      </div>

    </div>

    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full text-left">

        <thead className="bg-gray-50 border-b">
          <tr className="text-gray-600 text-sm">
            <th className="p-4">Name</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Policy</th>
            <th className="p-4">Premium</th>
            <th className="p-4">Enrollment Date</th>
            <th className="p-4">Aadhar</th>
            <th className="p-4">PAN</th>
            <th className="p-4">Photo</th>
            <th className="p-4">Bank</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          
          {filteredCustomers.map((c) => {
            const aadharURL = storage.getFileView(BUCKET_ID, c.aadhar);
            const panURL = storage.getFileView(BUCKET_ID, c.pan);
            const photoURL = storage.getFileView(BUCKET_ID, c.photo);
            const bankURL = storage.getFileView(BUCKET_ID, c.bankPassbook);

            return (
              <tr
                key={c.$id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{c.fullName}</td>
                <td className="p-4">{c.phone}</td>
                <td className="p-4">{c.policyNumber}</td>
                <td className="p-4 text-green-600 font-semibold">
                  ₹{c.premiumAmount}
                </td>
                <td className="p-4">{c.EnrollmentDate}</td>

                <td className="p-4">
                  <a
                    href={aadharURL}
                    target="_blank"
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                </td>

                <td className="p-4">
                  <a
                    href={panURL}
                    target="_blank"
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                </td>

                <td className="p-4">
                  <a
                    href={photoURL}
                    target="_blank"
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                </td>

                <td className="p-4">
                  <a
                    href={bankURL}
                    target="_blank"
                    className="text-indigo-600 hover:underline"
                  >
                    View
                  </a>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => deleteCustomer(c)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>

  </div>
);
}

export default Customers;
