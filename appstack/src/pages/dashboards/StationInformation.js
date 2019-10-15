import React from "react";
import { Link } from "react-router-dom";
import {
  Card, CardBody,
  Media,
  Col, Row,
} from "reactstrap";
import {
  Tabs, Tab
} from "react-bootstrap";
import {
  Briefcase, Home, MapPin, Square, User, Paperclip, Phone
} from "react-feather";
import Map from "./Map";

class StationInformation extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
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
    const { data } = this.state;
    const { dataFault } = this.props;
    return (
      <React.Fragment>
        <Tabs defaultActiveKey="info"  >
          <Tab eventKey="info" title="Station information">
            <Card className="flex-fill w-100" style={{ height: 260, width: "100%" }}>
              <CardBody className="my-0">
                <div className="d-flex justify-content-center">
                  <label >
                    <h1 className="text-center">{data.name}</h1>
                  </label>
                  <label className=" float-right mt-1" xs="4">
                    <Media className="d-inline ml-1 mt-2" xs="4">
                      <Square className="feather-md" fill={this.props.status === false ? "red" : "#3fd932"} />
                    </Media>
                  </label>
                </div>

                <ul className="list-unstyled ml-2">
                  <li className="mb-2">
                    <h4><Paperclip width={18} height={18} className="mr-1" /> ID:{" "}<Link to="#">{data.sub_id}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><Home width={18} height={18} className="mr-1" /> Type of machine:{" "}<Link to="#">{data.machine}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><Briefcase width={18} height={18} className="mr-1" /> Rated power:{" "}<Link to="#">{data.power}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><MapPin width={18} height={18} className="mr-1" /> Address:{" "}<Link to="#">{data.address}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><User width={18} height={18} className="mr-1" /> Manager:{" "}<Link to="#">{data.manager}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><Phone width={18} height={18} className="mr-1" /> Phone number:{" "}<Link to="#">{data.phone_number}</Link></h4>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card className="flex-fill py-0" >
              <CardBody>
                <Row>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(0, 1) === "1" ? "red" : "#3fd932"} />
                    {" Meter"}
                  </Col>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(1, 2) === "1" ? "red" : "#3fd932"} />
                    {" Oil Sensor"}
                  </Col>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(2, 3) === "1" ? "red" : "#3fd932"} />
                    {" DHT11"}
                  </Col>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(3, 4) === "1" ? "red" : "#3fd932"} />
                    {" Sim"}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(4, 5) === "1" ? "red" : "#3fd932"} />
                    {" Contact 1"}
                  </Col>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(5, 6) === "1" ? "red" : "#3fd932"} />
                    {" Contact 2"}
                  </Col>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(6, 7) === "1" ? "red" : "#3fd932"} />
                    {" Memory"}
                  </Col>
                  <Col>
                    <Square className="feather-md" fill={dataFault.Fault.slice(7, 8) === "1" ? "red" : "#3fd932"} />
                    {" IC"}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Tab>
          <Tab eventKey="map" title="Map">
            <Map data={data} />
          </Tab>
          <Tab eventKey="fault" title="Fault">
            <Card className="flex-fill w-100 mb-0" >
              <CardBody className="my-0">
                <h1 className="text-center">Faults</h1>
                <ul className="list-unstyled ml-2">
                  <li className="mb-1">
                    <h4>Volt High: <Square className="feather-md mb-1" fill="red" />{">="}<Link to="#">{data.volt_high} V</Link></h4>
                  </li>
                  <li className="mb-1">
                    <h4>Volt Low: <Square className="feather-md mb-1" fill="red" />{"<="}<Link to="#">{data.volt_low} V</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4>Current High: {" "}
                      <label>
                        <Square className="feather-md mb-1" fill="orange" />{">="}<Link to="#">{(0.3 * data.current_high).toFixed(0)} A</Link>
                      </label>
                      <label className="ml-4">
                        <Square className="feather-md mb-1" fill="red" />{">="}<Link to="#">{(0.7 * data.current_high).toFixed(0)} A</Link>
                      </label>
                    </h4>
                  </li>
                  <li className="mb-2">
                    <h4>Temperature: {" "}
                      <label>
                        <Square className="feather-md mb-1" fill="yellow" />{">="}<Link to="#">{10 + data.temp_high} °C</Link>
                      </label>
                      <label className="ml-4">
                        <Square className="feather-md mb-1" fill="orange" />{">="}<Link to="#">{20 + data.temp_high} °C</Link>
                      </label>
                      <label className="ml-4">
                        <Square className="feather-md mb-1" fill="red" />{">="}<Link to="#">{30 + data.temp_high} °C</Link>
                      </label>
                    </h4>
                  </li>
                  <li className="mb-2">
                    <h4>Oil Temperature: {" "}
                      <label>
                        <Square className="feather-md mb-1" fill="yellow" />{">="}<Link to="#">{10 + data.oil_temp_high} °C</Link>
                      </label>
                      <label className="ml-4">
                        <Square className="feather-md mb-1" fill="orange" />{">="}<Link to="#">{20 + data.oil_temp_high} °C</Link>
                      </label>
                      <label className="ml-4">
                        <Square className="feather-md mb-1" fill="red" />{">="}<Link to="#">{30 + data.oil_temp_high} °C</Link>
                      </label>
                    </h4>
                  </li>

                </ul>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </React.Fragment>
    );
  }
}

export default StationInformation;
