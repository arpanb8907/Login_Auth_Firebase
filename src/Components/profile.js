import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  addDoc,
  doc,
  getDocs,
  collection,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import Task from "./task";
import { toast } from "react-toastify";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [adding, setadding] = useState(false);
  const [formdata, setformdata] = useState("");
  const [arr_data, setarr_data] = useState([]);
  //console.log({ userDetails });

  const fetchuserdetails = async () => {
    //   try{auth.onAuthStateChanged(async (user) => {
    //     console.log(user);

    //     const docRef = doc(db, "Users", user.uid);
    //     const docsnap = await getDoc(docRef);

    //     if (docsnap.exists()) {
    //       //console.log(docsnap.data());
    //       setUserDetails(docsnap.data());
    //     } else {
    //       console.log("user is not logged in");
    //     }

    //   });

    // } catch (error) {
    //   console.error("Error fetching user details: ", error);
    // }

    try {
      auth.onAuthStateChanged(async (user) => {
        const docref = collection(db, "todos");
        //console.log(typeof auth.currentUser.uid);
        const q = query(
          docref,
          where("userId", "==", auth?.currentUser?.uid)
        );

        console.log(q)

        const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        // });

        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        });
        console.log(data)
        setarr_data(data)

      });
    } catch (error) {
      console.error(error);
    }

    
  };

  useEffect(() => {
    fetchuserdetails();
  }, [auth]);

  

  async function add_task() {
    //alert(`${formdata} is added into the databse`);

    setadding(true);
    //console.log(auth.lastNotifiedUid);

    const tasklist = await addDoc(collection(db, "todos"), {
      taskname: formdata,
      userId: auth.currentUser.uid,
    });
    fetchuserdetails();
    setadding(false);
  }
  
  return (
    <div className="container">
      <div className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pt-2">
        <div>
          <div className="form-outline">
            <input
              type="text"
              id="form1"
              className="form-control"
              placeholder="Enter a task here"
              value={formdata}
              onChange={(event) => {
                setformdata(event.target.value);
              }}
            />
          </div>
        </div>
        
        <div>
          {!adding ? (
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary"
              onClick={add_task}
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary"
            >
              Adding...
            </button>
          )}
          
          
          
        </div>
        
      </div>
      

      <table
        className="table text-white mb-0"
        
      >
        <thead>
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        {arr_data.map((item, index) => {
          return (
            <Task
              item={item}
              key={item.id}
              index={index}
              setarr_data={setarr_data}
              arr_data={arr_data}
            />
          );
        })}
      </table>
    </div>
  );
}
export default Profile;
