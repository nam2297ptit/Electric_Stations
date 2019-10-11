import React from "react";
import { Col, Card, CardBody, CardHeader, Row, Media } from "reactstrap";
import { Slack, TrendingUp, Zap, Cpu, Clock } from "react-feather";
import { Droplet, Thermometer, Activity } from "react-feather";
import moment from 'moment'
import "./Statistics.css";
const utils = require("../../utils/utils");
function convertToClassName(data, ID) {
  const { volt_high, volt_low, current_high, temp_high, oil_high } = utils.getStationInfo();
  /*----U----*/
  if (data <= volt_low && ID === "UA") {
    return "U_red";
  }
  else if (data >= volt_high && ID === "UA") {
    return "U_red";
  }
  else if (data <= volt_low && ID === "UB") {
    return "U_red";
  }
  else if (data >= volt_high && ID === "UB") {
    return "U_red";
  }
  else if (data <= volt_low && ID === "UC") {
    return "U_red";
  }
  else if (data >= volt_high && ID === "UC") {
    return "U_red";
  }
  /*----I----*/
  else if (data >= current_high * 30 / 100 && data <= current_high * 70 / 100 && ID === "IA") {
    return "I_orange";
  }
  else if (data > current_high * 70 / 100 && ID === "IA") {
    return "I_red";
  }
  else if (data >= current_high * 30 / 100 && data <= current_high * 70 / 100 && ID === "IB") {
    return "I_orange";
  }
  else if (data > current_high * 70 / 100 === "IB") {
    return "I_red";
  }
  else if (data >= current_high * 30 / 100 && data <= current_high * 70 / 100 && ID === "IC") {
    return "I_orange";
  }
  else if (data > current_high * 70 / 100 === "IC") {
    return "I_red";
  }
  /*----Temperature----*/
  else if (data >= oil_high + 10 && data < oil_high + 20 && ID === "oil") {
    return "oil_yellow";
  }
  else if (data >= oil_high + 20 && data < oil_high + 30 && ID === "oil") {
    return "oil_orange";
  }
  else if (data > oil_high + 30 && ID === "oil") {
    return "oil_red";
  }
  else if (data >= temp_high + 10 && data < temp_high + 20 && ID === "temp") {
    return "temp_yellow";
  }
  else if (data >= temp_high + 20 && data < temp_high + 30 && ID === "temp") {
    return "temp_orange";
  }
  else if (data > temp_high + 30 && ID === "temp") {
    return "temp_red";
  }
}
class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate() {
    if (this.props.data === []) {
      return false
    }
    return true
  }
  render() {
    const data = this.props.data;

    return (
      <div className="w-100">
        <Row>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader>
                <span className="badge badge-primary float-right">V</span>
                <h5 className="card-title mb-0">Voltage</h5>
              </CardHeader>
              <CardBody>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Zap className="feather-md text-primary mb-1 mr-2 " color="lightblue" />
                      UA
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center " + convertToClassName(data.UA, "UA")}>{data.UA}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Zap className="feather-md text-warning mb-1 mr-2" color="lightblue" />
                      UB
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center text-center " + convertToClassName(data.UB, "UB")}>{data.UB}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Zap className="feather-md text-danger mb-1 mr-2" color="lightblue" />
                      UC
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center " + convertToClassName(data.UC, "UC")}>{data.UC}</h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader>
                <span className="badge badge-warning float-right">A</span>
                <h5 className="card-title mb-0">Current</h5>
              </CardHeader>
              <CardBody>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <TrendingUp className="feather-md text-primary mb-1 mr-2" color="lightblue" />
                      IA
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center " + convertToClassName(data.IA, "IA")}>{data.IA}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <TrendingUp className="feather-md text-warning mb-1 mr-2" color="lightblue" />
                      IB
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center " + convertToClassName(data.IB, "IB")}>{data.IB}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <TrendingUp className="feather-md mb-1 mr-2" color="lightblue" />
                      IC
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center " + convertToClassName(data.IC, "IC")}>{data.IC}</h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader>
                <span className="badge badge-info float-right">kW</span>
                <h5 className="card-title mb-0">Wattage</h5>
              </CardHeader>
              <CardBody>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      PA
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.PA}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      PB
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.PB}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      PC
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.PC}</h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader>
                <span className="badge badge-success float-right">kVA</span>
                <h5 className="card-title mb-0">Reactive power</h5>
              </CardHeader>
              <CardBody>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md  mb-1 mr-2" color="lightblue" />
                      QA
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.QA}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      QB
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.QB}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      QC
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.QC}</h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader>
                <span className="badge badge-info float-right">Radius</span>
                <h5 className="card-title mb-0">Cos φ</h5>
              </CardHeader>
              <CardBody>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      CosA
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.CosA / 100}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      CosB
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.CosB / 100}</h3>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h3 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      CosC
                    </h3>
                  </div>
                  <Media body>
                    <h3 className={"mb-1 text-center "}>{data.CosC / 100}</h3>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Row>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill">
                  <CardBody className="pt-3 pb-1">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Droplet className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <Media body>
                          <h3>{data.Humi} %</h3>
                          <h6 className="mt-1">Humidity</h6>
                        </Media>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill p-0">
                  <CardBody className="pt-3 pb-1">
                    <Media>
                      <Thermometer className="feather-lg" color="lightblue" />
                      <Media body>
                        <h3 className={convertToClassName(data.Temp, "temp")}>{data.Temp} °C</h3>
                        <h6 className="mt-1">Temperature</h6>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill">
                  <CardBody className="pt-3 pb-1">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Thermometer className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <h3 className={convertToClassName(data.Oil, "oil")}>{data.Oil} °C</h3>
                        <h6 className="mt-1">Oil Temperature</h6>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill">
                  <CardBody className="pt-3 pb-1">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Activity className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <h3>{data.Freq} Hz</h3>
                        <h6 className="mt-1">Frequency</h6>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill">
                  <CardBody className="pt-3 pb-1">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Cpu className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <h3>{data.Pgiao} kWh</h3>
                        <h6 className="mt-1">Energy Consumption</h6>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" className="mb-2 pr-3 ">
                <Card className="flex-fill">
                  <CardBody className="pt-2 pb-2 mt-2">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Clock className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <h5><strong>{moment(data.time).format('DD/MM/YYYY h:mm:ss')}</strong></h5>
                        <h6 className="mt-2">Time Update</h6>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

      </div>
    );
  }
}

export default Statistics;
