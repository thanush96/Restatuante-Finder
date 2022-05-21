import React, { Component } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Input } from "reactstrap";
import District from "../Components/JSON/District";
import SearchResult from "../Components/SearchResult";
import { db, storage } from "../firebase";
import {
  doc,
  setDoc,
  collection,
  Timestamp,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import classes from "./Dashboard.module.css";
import Spinner from "../Components/Spinner/Spinner";
// import Badge from "react-bootstrap/Badge";

const districts = District.Districts;
const userCollectionRef = collection(db, "Restaurant");

class Dashboard extends Component {
  state = {
    data: [],
  };

  getData = async () => {
    this.setState({ loading: true });
    let myData = [];
    // let q = query(userCollectionRef);
    let q = query(userCollectionRef, orderBy("time", "desc"));
    if (this.state.District) {
      q = query(q, where("district", "==", this.state.District));
    }

    if (this.state.Type) {
      q = query(q, where("type", "==", this.state.Type));
    }

    if (this.state.Price) {
      q = query(q, where("price", "==", this.state.Price));
    }

    if (this.state.Bedroom) {
      q = query(q, where("bedroom", "==", this.state.Bedroom));
    }
    if (this.state.Other) {
      q = query(q, where("otherFacility", "==", this.state.Other));
    }

    const data = await getDocs(q).then(function (data) {
      myData.push(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    this.setState({ data: myData[0] });
    console.log("Fetched data", myData);
    this.setState({ loading: false });
  };

  componentDidMount() {
    this.getData();
  }

  //React ONCHANGE SET STATE
  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    this.getData();
    // console.log("LOG", state);
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <section className="searchPage">
        <div className="searchPageInfo">
          <h4 className="h4">
            {this.state.data.length} - Places to stay near you
          </h4>
          <div className={classes.searchPageButtonsContainer}>
            <Input
              type="select"
              name="District"
              onChange={this.handleChange}
              value={this.state.District}
            >
              <option value="">All Location</option>

              {districts.map((location) => {
                return (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                );
              })}
            </Input>
            <Input
              type="select"
              name="Type"
              value={this.state.Type}
              onChange={this.handleChange}
            >
              <option value="">All Type</option>
              <option name="Luxury">Luxury</option>
              <option name="Semi Luxury">Semi Luxury</option>
              <option name="Non Ac">Non Ac</option>
            </Input>
            <Input
              type="select"
              name="Price"
              value={this.state.Price}
              onChange={this.handleChange}
            >
              <option value="">Any Price USD</option>
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
            <Input
              type="select"
              name="Bedroom"
              value={this.state.Bedroom}
              onChange={this.handleChange}
            >
              <option value="">Any Bedroom Type</option>
              <option name="Single Bed">Single Bed</option>
              <option name="Double Bed">Double Bed</option>
              <option name="Family Bed">Family Bed</option>
            </Input>
            <Input
              type="select"
              name="Other"
              value={this.state.Other}
              onChange={this.handleChange}
            >
              <option value="">Other Facility</option>
              <option name="With food">With food</option>
              <option name="Without food">Without food</option>
              <option name="Pool">Pool</option>
            </Input>
          </div>
        </div>

        <section className="searchResults">
          <article className="searchResult">
            <ul class="cards">
              {this.state.data.map((item) => {
                // return <SearchResult key={item.id} {...item} />;
                return (
                  <li class="cards_item" key={item.id}>
                    <div class="card">
                      <div class="card_image">
                        <img src={item.imageUrl} />
                      </div>
                      <div class="card_content">
                        <h2 class="card_title">
                          {item.name} | {item.type} | {item.district}
                        </h2>
                        <p class="card_text">${item.price}</p>
                        <button class="btn card_btn">
                          Contact us :{item.contact}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        </section>
      </section>
    );
  }
}
export default Dashboard;
