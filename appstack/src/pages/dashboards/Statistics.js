import React from "react";
import { Col, Card, CardBody, CardHeader, Row , Media} from "reactstrap";
import { Slack, TrendingUp, Zap } from "react-feather";
import { Droplet, Thermometer, Activity, ShoppingBag, AlertTriangle } from "react-feather";
class Statistics extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
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
              <h5 className="card-title mb-0">Volt</h5>
            </CardHeader>
            <CardBody>
              <Row >
                <Col xs="6">
                  <h3 className="font-weight-light ">
                  <Zap className="feather-md text-primary mb-1 mr-2"/>
                    UA
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.UA}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light">
                  <Zap className="feather-md text-warning mb-1 mr-2"/>
                    UB
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.UB}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light">
                  <Zap className="feather-md text-danger mb-1 mr-2"/>
                    UC
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.UC}</h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-warning float-right">A</span>
              <h5 className="card-title mb-0">Ample</h5>
            </CardHeader>
            <CardBody>
              <Row className="d-flex align-items-center">
                <Col xs="6">
                  <h3 className="font-weight-light ">
                  <TrendingUp className="feather-md text-primary mb-1 mr-2"/>
                    IA
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.IA}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light">
                  <TrendingUp className="feather-md text-warning mb-1 mr-2"/>
                    IB
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.IB}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light">
                  <TrendingUp className="feather-md text-danger mb-1 mr-2"/>
                    IC
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.IC}</h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-info float-right">W</span>
              <h5 className="card-title mb-0">Wattage</h5>
            </CardHeader>
            <CardBody>
              <Row className="d-flex align-items-center" md="6">
                <Col xs="6">
                  <h3 className="font-weight-light ">
                  <Slack className="feather-md text-primary mb-1 mr-2"/>
                    PA
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.PA}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light ">
                  <Slack className="feather-md text-warning mb-1 mr-2"/>
                    PB
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.PB}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light">
                  <Slack className="feather-md text-danger mb-1 mr-2"/>
                    PC
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.PC}</h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="3">
          <Card className="flex-fill">
            <CardHeader>
              <span className="badge badge-success float-right">W</span>
              <h5 className="card-title mb-0">Reactive power</h5>
            </CardHeader>
            <CardBody >
              <Row className="d-flex align-items-center">
                <Col xs="6">
                  <h3 className="font-weight-light ">
                  <Slack className="feather-md text-primary mb-1 mr-2"/>
                    QA
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.QA}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light">
                    <Slack className="feather-md text-warning mb-1 mr-2"/>
                      QB
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.QB}</h3>
                </Col>
                <Col xs="6">
                  <h3 className="font-weight-light">
                    <Slack className="feather-md text-danger mb-1 mr-2"/>
                      QC
                  </h3>
                </Col>
                <Col xs="6" className="text-center">
                  <h3 >{data.QC}</h3>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row >
      <Col md="6" xl >
        <Card className="flex-fill">
          <CardBody>
            <Media>
              <div className="d-inline-block mr-3">
                <Droplet className="feather-lg text-primary" />
              </div>
              <Media body>
                <h3 className="mb-2">{this.props.data.hum} %</h3>
                <div className="mb-0">Humidity</div>
              </Media>
            </Media>
          </CardBody>
        </Card>
      </Col>
      <Col md="6" xl >
        <Card className="flex-fill" >
          <CardBody>
            <Media>
              <div className="d-inline-block mr-3">
                <Thermometer className="feather-lg text-warning" />
              </div>
              <Media body>
                <h3 className="mb-2">{data.temp} °C</h3>
                <div className="mb-0">Temperature</div>
              </Media>
            </Media>
          </CardBody>
        </Card>
      </Col>
      <Col md="6" xl >
        <Card className="flex-fill">
          <CardBody >
            <Media>
              <div className="d-inline-block mr-3">
                <Activity className="feather-lg text-success" />
              </div>
              <Media body>
                <h3 className="mb-2">{data.freq} Hz</h3>
                <div className="mb-0">Frequency</div>
              </Media>
            </Media>
          </CardBody>
        </Card>
      </Col>
      <Col md="6" xl >
        <Card className="flex-fill">
          <CardBody>
            <Media>
              <div className="d-inline-block mr-3">
                <ShoppingBag className="feather-lg text-danger" />
              </div>
              <Media body>
                <h3 className="mb-2">{data.oil} Hz</h3>
                <div className="mb-0">Oil</div>
              </Media>
            </Media>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </div>
    );
  }
}


export default Statistics;
