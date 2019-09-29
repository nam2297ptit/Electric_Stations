import React from "react";
import { Link } from "react-router-dom";
import classnames from 'classnames';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle, CardText, Button,
  Row, Col, 
  Nav, NavItem, NavLink,
  TabContent, TabPane,
} from "reactstrap";
import {
  Tabs, Tab
} from "react-bootstrap";
import {
  Briefcase,
  Home,
  MapPin
} from "react-feather";
import Map from "./Map";
class StationInformation extends React.Component {
  constructor(props){
    super(props);
    const {data} = this.props;
    this.state = {
        data: data,
        activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);
  }
  
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    const data = this.state.data;
    return (
      <React.Fragment>
        <Tabs defaultActiveKey="info"  >
          <Tab eventKey="info" title="Station information"> 
            <Card className="flex-fill w-100"  style={{ height: 280, width: "100%" }}>
              <CardBody className="my-0">
                <h3 className="text-center">{data.sub_id}</h3>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <Home width={20} height={20} className="mr-1" /> Loại máy{" "}
                    <Link to="#">{data.machine}</Link>
                  </li>
                  <li className="mb-2">
                    <Briefcase width={20} height={20} className="mr-1" />Công suất định mức{" "}
                    <Link to="#">{data.power}</Link>
                  </li>
                  <li className="mb-2">
                    <MapPin width={20} height={20} className="mr-1" />Địa chỉ{" "}
                    <Link to="#">{data.address}</Link>
                  </li>
                  <li className="mb-2">
                    <MapPin width={20} height={20} className="mr-1" />Người quản lí{" "}
                    <Link to="#">{data.manager}</Link>
                  </li>               
                </ul>
              </CardBody>
            </Card>  
          </Tab>
          <Tab eventKey="map" title="Map">
              <Map data={data}/>
          </Tab>
        </Tabs>
       
      </React.Fragment>

    );
  }
}

export default StationInformation;
