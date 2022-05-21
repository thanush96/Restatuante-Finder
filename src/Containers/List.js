import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  Timestamp,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import Spinner from "../Components/Spinner/Spinner";
import { async } from "@firebase/util";

export default function Index() {
  const [show, setShow] = useState(false);
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userCollectionRef = collection(db, "Restaurant");

  // react modal function
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // FIREBASE - GET USER FROM FIRESTORE
  const getData = async () => {
    setLoading(true);
    let q = query(userCollectionRef, orderBy("time", "desc"));
    const data = await getDocs(q).then(function (data) {
      setMyData(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    });
  };

  // REACT JS - USE EFFECT FUNCTION
  useEffect(() => {
    getData();
  }, []);

  const deleteFunction = async (id) => {
    await deleteDoc(doc(db, "Restaurant", id));
    alert("Deleted");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>District</th>
          <th>Type</th>
          <th>Price $</th>
          <th>Bedroom</th>
          <th>Contact</th>
          <th>Other</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {myData.map((data, index) => {
          return (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.district}</td>
              <td>{data.type}</td>
              <td>{data.price}</td>
              <td>{data.bedroom}</td>
              <td>{data.contact}</td>
              <td>{data.otherFacility}</td>
              <td>
                <img
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                  src={data.imageUrl}
                />
              </td>

              <td>
                <button>
                  <Link to={`/update/${data.id}`}>EDIT</Link>
                </button>

                <button>
                  <Link onClick={() => deleteFunction(data.id)}>DELETE</Link>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
