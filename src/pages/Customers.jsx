import { useEffect, useState } from "react";
import "../App.css";
import { ID } from "appwrite";
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
  const [editCustomer, setEditCustomer] = useState(null);
  const [editData, setEditData] = useState({});
  const loadCustomers = async () => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    setCustomers(res.documents);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteCustomer = async (customer) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      if (customer.aadhar) {
        await storage.deleteFile(BUCKET_ID, customer.aadhar);
      }

      if (customer.pan) {
        await storage.deleteFile(BUCKET_ID, customer.pan);
      }

      if (customer.photo) {
        await storage.deleteFile(BUCKET_ID, customer.photo);
      }

      if (customer.bankPassbook) {
        await storage.deleteFile(BUCKET_ID, customer.bankPassbook);
      }

      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, customer.$id);

      loadCustomers();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.policyNumber?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalCustomers = customers.length;
  const totalPolicies = customers.length;

  const totalPremium = customers.reduce(
    (sum, c) => sum + Number(c.premiumAmount || 0),
    0,
  );

  const sendReminder = (customer) => {
    const message = `Hello ${customer.fullName},

Your LIC premium of ₹${customer.premiumAmount} for Policy No: ${customer.policyNumber} is due.

Please make the payment via:
Google Pay / PhonePe

Payment Number: 9593443777

Thank you,
Krishna Mohan Das (LICI)`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/91${customer.phone}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

// const getNextDueDate = (customer) => {

//   const start = new Date(customer.EnrollmentDate);
//   const today = new Date();

//   let interval = 1;

//   const type = customer.policyType?.toLowerCase();

//   if (type === "m") interval = 1;
//   if (type === "q") interval = 3;
//   if (type === "h") interval = 6;
//   if (type === "y") interval = 12;

//   const due = new Date(start);

//   while (due < today) {
//     due.setMonth(due.getMonth() + interval);
//   }

//   return due;
// };

const getDueDates = (customer) => {
  const start = new Date(customer.EnrollmentDate);
  const today = new Date();

  let interval = 1;

  const type = customer.policyType?.toLowerCase();

  if (type === "m") interval = 1;
  if (type === "q") interval = 3;
  if (type === "h") interval = 6;
  if (type === "y") interval = 12;

  const nextDue = new Date(start);

  while (nextDue <= today) {
    nextDue.setMonth(nextDue.getMonth() + interval);
  }

  const lastDue = new Date(nextDue);
  lastDue.setMonth(lastDue.getMonth() - interval);

  return { lastDue, nextDue };
};

  const thisWeekDue = customers.filter((c) => {
  const { lastDue } = getDueDates(c);

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  return lastDue >= today && lastDue <= nextWeek;
}).length;

  // const markPaid = async (customer) => {
  //   await databases.updateDocument(DATABASE_ID, COLLECTION_ID, customer.$id, {
  //     lastPaidDate: new Date().toISOString(),
  //   });

  //   loadCustomers();
  // };

 const markPaid = async (customer) => {

  if (customer.lastPaidDate) {
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, customer.$id, {
      lastPaidDate: null
    });
  } else {
    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, customer.$id, {
      lastPaidDate: new Date().toISOString()
    });
  }

  loadCustomers();
};
  const startEdit = (customer) => {
    setEditCustomer(customer);
    setEditData(customer);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  };
 const updateCustomer = async () => {
  try {

    let aadharId = editCustomer.aadhar;
    let panId = editCustomer.pan;
    let photoId = editCustomer.photo;
    let bankId = editCustomer.bankPassbook;

    if (editData.newAadhar) {
      const file = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        editData.newAadhar
      );

    if (editCustomer.aadhar) {
  await storage.deleteFile(BUCKET_ID, editCustomer.aadhar);
}

      aadharId = file.$id;
    }

    if (editData.newPan) {
      const file = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        editData.newPan
      );

      // await storage.deleteFile(BUCKET_ID, editCustomer.pan);

        if (editCustomer.pan) {
  await storage.deleteFile(BUCKET_ID, editCustomer.pan);
}

      panId = file.$id;
    }

    if (editData.newPhoto) {
      const file = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        editData.newPhoto
      );

      // await storage.deleteFile(BUCKET_ID, editCustomer.photo);
        if (editCustomer.photo) {
  await storage.deleteFile(BUCKET_ID, editCustomer.photo);
}

      photoId = file.$id;
    }

    if (editData.newBank) {
      const file = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        editData.newBank
      );

      // await storage.deleteFile(BUCKET_ID, editCustomer.bankPassbook);

        if (editCustomer.bankId) {
  await storage.deleteFile(BUCKET_ID, editCustomer.bankId);
}
      bankId = file.$id;
    }

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      editCustomer.$id,
      {
        fullName: editData.fullName,
        phone: editData.phone,
        FatherName: editData.FatherName,
        MotherName: editData.MotherName,
        premiumAmount: editData.premiumAmount,
        policyNumber: editData.policyNumber,

        aadhar: aadharId,
        pan: panId,
        photo: photoId,
        bankPassbook: bankId
      }
    );

    setEditCustomer(null);
    loadCustomers();

  } catch (err) {
    console.log(err);
  }
};
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
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Due This Week</h3>
          <p className="text-2xl font-bold text-red-600">{thisWeekDue}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-600 text-sm">
              <th className="p-4">Name</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Date of Birth</th>
              <th className="p-4">Father Name</th>
              <th className="p-4">Mother Name</th>
              <th className="p-4">Policy Number</th>
              <th className="p-4">Policy Type</th>
              <th className="p-4">Premium Amount</th>
              <th className="p-4">Enrollment Date</th>
              {/* <th className="p-4">Next Due</th>
              <th className="p-4">Status</th> */}
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

              const { lastDue, nextDue } = getDueDates(c);

const lastPaid = c.lastPaidDate ? new Date(c.lastPaidDate) : null;

const isDue = !lastPaid || lastPaid < lastDue;

              return (
                <tr
                  key={c.$id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{c.fullName}</td>
                  <td className="p-4">{c.phone}</td>
                  <td className="p-4">{c.DateOfBirth?.split("T")[0]}</td>
                  <td className="p-4">{c.FatherName}</td>
                  <td className="p-4">{c.MotherName}</td>
                  <td className="p-4">{c.policyNumber}</td>
                  <td className="p-4">{c.policyType}</td>

                  <td className="p-4 text-green-600 font-semibold">
                    ₹{c.premiumAmount}
                  </td>

                  <td className="p-4">
  {c.EnrollmentDate
    ? new Date(c.EnrollmentDate).toLocaleDateString("en-GB")
    : ""}
</td>

                  {/* <td>{nextDue.toLocaleDateString("en-IN")}</td> */}

                  {/* <td className="p-4">
                    {isDue ? (
                      <span className="text-red-600 font-bold">Due</span>
                    ) : (
                      <span className="text-green-600">Active</span>
                    )}
                  </td> */}

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

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => deleteCustomer(c)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => sendReminder(c)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      WhatsApp
                    </button>
                    {/* <button
  onClick={() => markPaid(c)}
  className={`text-white px-3 py-1 rounded-lg ${
    c.lastPaidDate ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {c.lastPaidDate ? "Undo Paid" : "Paid"}
</button> */}
                    <button
                      onClick={() => startEdit(c)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {editCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-96">
              <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

              <input
                name="fullName"
                value={editData.fullName || ""}
                onChange={handleEditChange}
                className="border p-2 w-full mb-2"
                placeholder="Full Name"
              />

              <input
                name="phone"
                value={editData.phone || ""}
                onChange={handleEditChange}
                className="border p-2 w-full mb-2"
                placeholder="Phone"
              />

              <input
                name="FatherName"
                value={editData.FatherName || ""}
                onChange={handleEditChange}
                className="border p-2 w-full mb-2"
                placeholder="Father Name"
              />

              <input
                name="MotherName"
                value={editData.MotherName || ""}
                onChange={handleEditChange}
                className="border p-2 w-full mb-2"
                placeholder="Mother Name"
              />

              <input
                name="premiumAmount"
                value={editData.premiumAmount || ""}
                onChange={handleEditChange}
                className="border p-2 w-full mb-4"
                placeholder="Premium Amount"
              />

              <p className="text-sm mt-2">Replace Aadhar</p>
<input
  type="file"
  onChange={(e) =>
    setEditData({ ...editData, newAadhar: e.target.files[0] })
  }
  className="border p-2 w-full mb-2"
/>

<p className="text-sm">Replace PAN</p>
<input
  type="file"
  onChange={(e) =>
    setEditData({ ...editData, newPan: e.target.files[0] })
  }
  className="border p-2 w-full mb-2"
/>

<p className="text-sm">Replace Photo</p>
<input
  type="file"
  onChange={(e) =>
    setEditData({ ...editData, newPhoto: e.target.files[0] })
  }
  className="border p-2 w-full mb-2"
/>

<p className="text-sm">Replace Bank Passbook</p>
<input
  type="file"
  onChange={(e) =>
    setEditData({ ...editData, newBank: e.target.files[0] })
  }
  className="border p-2 w-full mb-4"
/>

              <div className="flex gap-2">
                <button
                  onClick={updateCustomer}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() => setEditCustomer(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Customers;
