import React, { Component } from "react";
import { Row, Col, Input, Button } from "reactstrap";
import classes from "./Admin.module.css";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc, collection, Timestamp } from "firebase/firestore";
import District from "./JSON/District";
import { ProgressBar } from "react-bootstrap";
import Spinner from "./Spinner/Spinner";
import { Link } from "react-router-dom";

// json import
const districts = District.Districts;
const userCollectionRef = collection(db, "Restaurant");

export default class Admin extends Component {
  state = {
    Progresspercent: 0,
  };

  //React ONCHANGE SET STATE
  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log("Log", state);
  };

  upload = (e) => {
    const file = e.target?.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ Progresspercent: progress });
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.setState({ imageUrl: downloadURL });
          console.log("downloadURL", downloadURL);
        });
      }
    );
  };

  storeData = async () => {
    // this.setState({ loading: true });
    if (!this.state.Name) {
      return alert("Please enter Restaurant the Name");
    }
    if (!this.state.District) {
      return alert("Please Select District");
    }
    if (!this.state.Location) {
      return alert("Please enter Restaurant Location");
    }
    if (!this.state.Type) {
      return alert("Please Select Restaurant Type");
    }
    if (!this.state.Price) {
      return alert("Please Select Price");
    }
    if (!this.state.Bedroom) {
      return alert("Please Select Bedroom Details");
    }
    if (!this.state.Other) {
      return alert("Please Select Other Facility");
    }

    if (!this.state.Contact) {
      return alert("Please Enter the Contact number");
    }

    if (!this.state.imageUrl) {
      return alert("Please Upload Restaurant Image");
    } else {
      await setDoc(doc(userCollectionRef), {
        time: Timestamp.fromDate(new Date()),
        name: this.state.Name,
        district: this.state.District,
        location: this.state.Location,
        type: this.state.Type,
        price: this.state.Price,
        bedroom: this.state.Bedroom,
        contact: this.state.Contact,
        otherFacility: this.state.Other,
        imageUrl: this.state.imageUrl,
      }).then(alert("Uploaded!"));
      this.setState({ loading: false });
    }
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <div className="container">
        <div className="button-container">
          <Button>
            <Link to="/List">Show All Data</Link>
          </Button>
        </div>
        <div className={classes.Admincontainer}>
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
                    onChange={this.handleChange}
                    value={this.state.Name}
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
                    onChange={this.handleChange}
                    value={this.state.District}
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
                    name="Contact"
                    onChange={this.handleChange}
                    value={this.state.Contact}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs lg="12">
              <div class="form-group row">
                <label class="col-sm-4 col-form-label-required">
                  Contact Number
                </label>
                <div class="col-sm-5">
                  <Input
                    type="number"
                    name="Location"
                    onChange={this.handleChange}
                    value={this.state.Location}
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
                    onChange={this.handleChange}
                    value={this.state.Type}
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
                    value={this.state.Price}
                    onChange={this.handleChange}
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
                    <option name="More then 1000 USD">
                      More then 1000 USD
                    </option>
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
                    value={this.state.Bedroom}
                    onChange={this.handleChange}
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
                    value={this.state.Other}
                    onChange={this.handleChange}
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
                <label class="col-sm-4 col-form-label-required">
                  upload image
                </label>
                <div class="col-sm-5">
                  <Input type="file" onChange={this.upload} />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs lg="4"></Col>
            <Col xs lg="5">
              <ProgressBar
                now={this.state.Progresspercent}
                label={`${this.state.Progresspercent}%`}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs lg="12">
              <div class="form-group row">
                <div class="col-sm-4" />
                <div class="col-sm-5">
                  <Button onClick={this.storeData}>Save</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
