import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  //console.log({ userDetails });

  const fetchuserdetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      //console.log(user);

      const docRef = doc(db, "Users", user.uid);
      const docsnap = await getDoc(docRef);

      if (docsnap.exists()) {
        //console.log(docsnap.data());
        setUserDetails(docsnap.data());
      } else {
        console.log("user is not logged in");
      }
    });
  };

  useEffect(() => {
    fetchuserdetails();
  }, []);

  async function handleSignout() {
    
    try {
      await auth.signOut();
      window.location.href = "/login"
      console.log("user logged out succesfully");
      toast.success("User logged out successfully",{
        position:"top-center" 
      })
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`,{
        position:"bottom-center"
      });
    }
  }
  return (
    <div>
      {userDetails ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={userDetails.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h3>Welcome {userDetails.FirstName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.EmailId}</p>
            <p>First Name: {userDetails.FirstName}</p>
            {/* <p>Last Name: {userDetails.lastName}</p> */}
          </div>
          <button className="btn btn-primary" onClick={handleSignout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Profile;
