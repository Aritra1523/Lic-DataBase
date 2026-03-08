import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">

      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        Dashboard
      </h2>

      <div className="flex flex-col md:flex-row gap-6">

        <Link to="/add">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl shadow hover:bg-indigo-700 transition w-60">
            Add Customer
          </button>
        </Link>

        <Link to="/customers">
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl shadow hover:bg-green-700 transition w-60">
            View Customers
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;