import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
const Account = () => {
  // Assuming you have the user details stored in your state or fetched from Firestore

  const [email, setemail] = useState(null);
  const [name, setname] = useState(null);

  async function fetch_details() {
    try {
      auth.onAuthStateChanged(async (user) => {
        const docRef = doc(db, "Users", auth.currentUser.uid);
        const docsnap = await getDoc(docRef);

        if (docsnap.exists()) {
          setemail(docsnap.data().EmailId);
          setname(docsnap.data().FirstName + " " + docsnap.data().LastName);
        } else {
          console.log("No docs...");
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    //console.log(auth.currentUser.metadata.creationTime)
    fetch_details();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          Account Details
        </h1>

        <div className="mb-2">
          <span className="text-gray-500">Name:</span>
          <p className="text-lg text-gray-800">{name}</p>
        </div>

        <div className="mb-2">
          <span className="text-gray-700">Email:</span> {/* Darker grey */}
          <p className="text-lg text-gray-900">{email}</p> {/* Even darker */}
        </div>

        <div className="mb-2">
          <span className="text-gray-500">Account Created:</span>
          <p className="text-lg text-gray-800">{"hii"}</p>
        </div>

        <button
          className="btn btn-primary shadow-sm"
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            color: "#fff",
          }}
          onClick={() => {
            window.location.href = "/profile";
          }}
        >
          Go to Home page
        </button>
      </div>
    </div>
  );
};

export default Account;
