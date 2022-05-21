import React, { useEffect, Component, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Input, Button } from "reactstrap";
// import classes from ".../Components/Admin.module.css";
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
  updateDoc,
} from "firebase/firestore";
import District from "../Components/JSON/District";
import { ProgressBar } from "react-bootstrap";
import Spinner from "../Components/Spinner/Spinner";
import { Link } from "react-router-dom";

// json import
const districts = District.Districts;

export default function Update() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const userCollectionRef = collection(db, "Restaurant");
  const [name, setName] = useState();
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [other, setOther] = useState("");
  const [contact, setContact] = useState("");

  // REACT JS - USE EFFECT FUNCTION
  useEffect(() => {
    getData();
    console.log(id);
  }, []);

  // FIREBASE - GET USER FROM FIRESTORE
  const getData = async () => {
    setLoading(true);
    const q = query(collection(db, "Restaurant"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id.startsWith(id)) {
        setName(doc.data().name);
        setDistrict(doc.data().district);
        setLocation(doc.data().location);
        setType(doc.data().type);
        setPrice(doc.data().price);
        setBedroom(doc.data().bedroom);
        setOther(doc.data().otherFacility);
        setContact(doc.data().contact);
        // console.log(doc.data().location);
      }
      setLoading(false);
    });
  };

  const update = async () => {
    const taskDocRef = doc(db, "Restaurant", id);
    try {
      await updateDoc(taskDocRef, {
        name: name,
        district: district,
        location: location,
        type: type,
        price: price,
        bedroom: bedroom,
        contact: contact,
        otherFacility: other,
      });
      alert("Updated");
    } catch (err) {
      // alert(err);
      console.log(err);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="button-container">Update Data</div>
      <div>
        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                Restaurant Name
              </label>
              <div class="col-sm-5">
                <Input
                  type="text"
                  name="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                Restaurant District
              </label>
              <div class="col-sm-5">
                <Input
                  type="select"
                  name="District"
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                  value={district}
                >
                  <option name="">--Choose here--</option>

                  {districts.map((location) => {
                    return (
                      <option key={location.id} name={location.name}>
                        {location.name}
                      </option>
                    );
                  })}
                </Input>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                Restaurant Location
              </label>
              <div class="col-sm-5">
                <Input
                  type="text"
                  name="Location"
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  value={location}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                Restaurant Number
              </label>
              <div class="col-sm-5">
                <Input
                  type="text"
                  name="Contact"
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  value={contact}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                Restaurant type
              </label>
              <div class="col-sm-5">
                <Input
                  type="select"
                  name="Type"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  value={type}
                >
                  <option name="">--Choose here--</option>
                  <option name="Luxury">Luxury</option>
                  <option name="Semi Luxury">Semi Luxury</option>
                  <option name="Non Ac">Non Ac</option>
                </Input>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                Restaurant Price per night
              </label>
              <div class="col-sm-5">
                <Input
                  type="select"
                  name="Price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                >
                  <option name="">--Choose here--</option>

                  <option name="10 USD">10 USD</option>
                  <option name="25 USD">25 USD</option>
                  <option name="50 US">50 USD</option>
                  <option name="100 USD">100 USD</option>
                  <option name="150 USD">150 USD</option>
                  <option name="200 USD">200 USD</option>
                  <option name="500 USD">500 USD</option>
                  <option name="750 USD">750 USD</option>
                  <option name="More then 1000 USD">More then 1000 USD</option>
                </Input>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                bedroom Type
              </label>
              <div class="col-sm-5">
                <Input
                  type="select"
                  name="Bedroom"
                  value={bedroom}
                  onChange={(e) => {
                    setBedroom(e.target.value);
                  }}
                >
                  <option name="">--Choose here--</option>

                  <option name="Single Bed">Single Bed</option>
                  <option name="Double Bed">Double Bed</option>
                  <option name="Family Bed">Family Bed</option>
                </Input>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <label class="col-sm-4 col-form-label-required">
                Other Facility
              </label>
              <div class="col-sm-5">
                <Input
                  type="select"
                  name="Other"
                  value={other}
                  onChange={(e) => {
                    setOther(e.target.value);
                  }}
                >
                  <option name="">--Choose here--</option>

                  <option name="">Other Facility</option>
                  <option name="With food">With food</option>
                  <option name="Without food">Without food</option>
                  <option name="Pool">Pool</option>
                </Input>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs lg="12">
            <div class="form-group row">
              <div class="col-sm-4" />
              <div class="col-sm-5">
                <Button onClick={update}>Update</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
