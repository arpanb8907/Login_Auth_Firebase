import { useContext, useEffect, useState } from "react";
import { db,auth } from "./firebase";

import {
  query,
  where,
  getDocs,
  addDoc,
  and,
  deleteDoc,
} from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

function Task(props) {
  const [isediting, setisediting] = useState(false);
  const [editinput, seteditinput] = useState("");
  //const { auth } = useContext(AuthContext);
  const [issaving, setIssaving] = useState(false);
  const [isdeleting, setIsdeleting] = useState(false);

  function handleditchange(e) {
    seteditinput(e.target.value);
  }

  function handleEdit() {
    setisediting(!isediting);
  }

  async function handleDelete() {
    // first delete from the firestore database
    setIsdeleting(true);
    const tasklist = doc(db, "todos", props.item.id);

    // await updateDoc(tasklist, {
    //   taskname: deleteField(),
    //   userId: deleteField(),
    // });

    // set ahe resultant array

    try {
      await deleteDoc(tasklist);
    } catch (error) {
      console.error("Error deleting the document", error);
    }

    props.setarr_data((prev) => {
      const arr = prev.filter((item, index) => index !== props.index);
      return arr;
    });
    setIsdeleting(false);
  }

  function modify_arr(tasklist) {
    props.setarr_data((prev) => {
      const arr = [...prev];

      arr[props.index].taskname = editinput;
      return arr;
    });

    //console.log(props.arr_data[props.index].taskname);
  }
  async function saveinput() {
    setIssaving(true);
    const tasklist = doc(db, "todos", props.item.id);
    //console.log(props.item.id);

    await updateDoc(tasklist, {
      taskname: editinput,
    });

    modify_arr(tasklist);
    setIssaving(false);
    //console.log(props.arr_data);

    if (isediting) setisediting(!isediting);
  }

  return (
    <tbody >
      <tr className="fw-normal">
        <td scope="col">
          <span>{props.item.taskname}</span>
        </td>
        <td scope="col">
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleEdit}
          >
            Edit
          </button>
        </td>

        {isediting && (
          <td>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Enter text"
                value={editinput}
                onChange={handleditchange}
              />
              {!issaving ? (
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-success"
                  onClick={saveinput}
                >
                  Save
                </button>
              ) : (
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-success"
                  //onClick={saveinput}
                >
                  Saving...
                </button>
              )}
            </div>
          </td>
        )}

        <td scope="col">
          {!isdeleting ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger"
              //onClick={handleDelete}
            >
              Deleting...
            </button>
          )}
        </td>
      </tr>
    </tbody>
  );
}

export default Task;