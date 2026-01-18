import React, { Component } from 'react'
import Navbar from "../components/Navbar";
import PropertiesList from "../components/PropertiesList";
export default class propertiespage extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <PropertiesList/>
      </div>
    )
  }
}
