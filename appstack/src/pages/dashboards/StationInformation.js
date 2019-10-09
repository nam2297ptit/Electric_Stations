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
            <Card className="flex-fill w-100" style={{ height: 270, width: "100%" }}>
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
                    <h4><Home width={18} height={18} className="mr-1" /> Loại máy:{" "}<Link to="#">{data.machine}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><Briefcase width={18} height={18} className="mr-1" /> Công suất định mức:{" "}<Link to="#">{data.power}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><MapPin width={18} height={18} className="mr-1" /> Địa chỉ:{" "}<Link to="#">{data.address}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><User width={18} height={18} className="mr-1" /> Người quản lí:{" "}<Link to="#">{data.manager}</Link></h4>
                  </li>
                  <li className="mb-2">
                    <h4><Phone width={18} height={18} className="mr-1" /> Số điện thoại:{" "}<Link to="#">{data.phone_number}</Link></h4>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card className="flex-fill pt-2 pb-2" >
              <CardBody className="d-flex justify-content-center">
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(0, 1) === "1" ? "red" : "#3fd932"} />
                </Media>
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(1, 2) === "1" ? "red" : "#3fd932"} />
                </Media>
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(2, 3) === "1" ? "red" : "#3fd932"} />
                </Media>
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(3, 4) === "1" ? "red" : "#3fd932"} />
                </Media>
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(4, 5) === "1" ? "red" : "#3fd932"} />
                </Media>
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(5, 6) === "1" ? "red" : "#3fd932"} />
                </Media>
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(6, 7) === "1" ? "red" : "#3fd932"} />
                </Media>
                <Media className="d-inline ml-1 mr-1" xs="4">
                  <Square className="feather-md" fill={dataFault.fault.slice(7, 8) === "1" ? "red" : "#3fd932"} />
                </Media>
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
                        <Square className="feather-md mb-1" fill="orange" />{">="}<Link to="#">{0.3 * data.current_high.toFixed(0)} A</Link>
                      </label>
                      <label className="ml-4">
                        <Square className="feather-md mb-1" fill="red" />{">="}<Link to="#">{0.7 * data.current_high.toFixed(0)} A</Link>
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
                  <li className="mb-2">
                    <h4>
                      <Row>
                        <Col>
                          <label>
                            {"1. "} <Square className="feather mb-1" fill="red" />{"Mortor"}
                          </label>
                        </Col>
                        <Col>
                          <label>
                            {"2. "} <Square className="feather mb-1" fill="red" />{"Oil Sensor"}
                          </label>
                        </Col>
                        <Col>
                          <label>
                            {"3. "} <Square className="feather mb-1" fill="red" />{"DHT11"}
                          </label>
                        </Col>
                      </Row>
                    </h4>
                  </li>
                  <li className="mb-2">
                    <h4>
                      <Row>
                        <Col>
                          <label>
                            {"4. "} <Square className="feather mb-1" fill="red" />{"Sim"}
                          </label>
                        </Col>
                        <Col>
                          <label>
                            {"5. "} <Square className="feather mb-1" fill="red" />{"Contact 1"}
                          </label>
                        </Col>
                        <Col>
                          <label>
                            {"6. "} <Square className="feather mb-1" fill="red" />{"Contact 2"}
                          </label>
                        </Col>
                      </Row>
                    </h4>
                  </li>
                  <li className="mb-2">
                    <h4>
                      <Row>
                        <Col>
                          <label>
                            {"7. "} <Square className="feather mb-1" fill="red" />{"Memory"}
                          </label>
                        </Col>
                        <Col>
                          <label>
                            {"8. "} <Square className="feather mb-1" fill="red" />{"IC"}
                          </label>
                        </Col>
                        <Col>
                        </Col>
                      </Row>
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
