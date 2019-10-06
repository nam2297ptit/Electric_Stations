import React from "react";
import { Col, Card, CardBody, CardHeader, Row, Media } from "reactstrap";
import { Slack, TrendingUp, Zap } from "react-feather";
import { Droplet, Thermometer, Activity, Square, AlertTriangle } from "react-feather";
class Statistics extends React.Component {
  constructor(props) {
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
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Zap className="feather-md text-primary mb-1 mr-2" color="lightblue" />
                      UA
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.UA}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Zap className="feather-md text-warning mb-1 mr-2" color="lightblue" />
                      UB
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.UB}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Zap className="feather-md text-danger mb-1 mr-2" color="lightblue" />
                      UC
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.UC}</h4>
                  </Media>
                </Media>
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
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <TrendingUp className="feather-md text-primary mb-1 mr-2" color="lightblue" />
                      IA
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.IA}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <TrendingUp className="feather-md text-warning mb-1 mr-2" color="lightblue" />
                      IB
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.IB}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <TrendingUp className="feather-md mb-1 mr-2" color="lightblue" />
                      IC
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.IC}</h4>
                  </Media>
                </Media>
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
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      PA
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.PA}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      PB
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.PB}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      PC
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.PC}</h4>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col sm="3">
            <Card className="flex-fill">
              <CardHeader>
                <span className="badge badge-success float-right">VAR</span>
                <h5 className="card-title mb-0">Reactive power</h5>
              </CardHeader>
              <CardBody>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md  mb-1 mr-2" color="lightblue" />
                      QA
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.QA}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      QB
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.QB}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      QC
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.QC}</h4>
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
                <h5 className="card-title mb-0">Cos</h5>
              </CardHeader>
              <CardBody>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      CosA
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.cosA}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      CosB
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.cosB}</h4>
                  </Media>
                </Media>
                <Media>
                  <div className="d-inline-block mr-3">
                    <h4 className="font-weight-light ">
                      <Slack className="feather-md mb-1 mr-2" color="lightblue" />
                      CosC
                    </h4>
                  </div>
                  <Media body>
                    <h4 className="mb-1 text-right">{data.cosC}</h4>
                  </Media>
                </Media>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Row>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill">
                  <CardBody className="pt-3 pb-2">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Droplet className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <Media body>
                          <h4>{data.hum} %</h4>
                          <h7 className="mt-1">Humidity</h7>
                        </Media>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill p-0">
                  <CardBody className="pt-3 pb-2">
                    <Media>
                      <Thermometer className="feather-lg" color="lightblue" />
                      <Media body>
                        <h4>{data.temp} °C</h4>
                        <h7 className="mt-1">Temperature</h7>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill">
                  <CardBody className="pt-3 pb-2">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Thermometer className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <h4>{data.oil} °C</h4>
                        <h7 className="mt-1">Oil Temperature</h7>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="pb-1 pr-3">
                <Card className="flex-fill">
                  <CardBody className="pt-3 pb-2">
                    <Media>
                      <div className="d-inline-block mr-3">
                        <Activity className="feather-lg" color="lightblue" />
                      </div>
                      <Media body>
                        <h4>{data.freq} Hz</h4>
                        <h7 className="mt-1">Frequency</h7>
                      </Media>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col md="8" className="mb-1 pr-3 ">
                <Card className="flex-fill pt-1 pb-1" >
                  <CardBody className="d-flex justify-content-center">
                    <Media className="d-inline ml-3 mr-3" xs="4">
                      <Square className="feather-md" fill="#3fd932" />
                    </Media>
                    <Media className="d-inline ml-3 mr-3" xs="4">
                      <Square className="feather-md" fill="#cddb27" />
                    </Media>
                    <Media className="d-inline ml-3 mr-3" xs="4">
                      <Square className="feather-md" fill="#e6eb05" />
                    </Media>
                    <Media className="d-inline ml-3 mr-3" xs="4">
                      <Square className="feather-md" fill="#ff9900" />
                    </Media>
                    <Media className="d-inline ml-3 mr-3" xs="4">
                      <Square className="feather-md" fill="#ff1f00" />
                    </Media>
                    <Media className="d-inline ml-3 mr-3" xs="4">
                      <Square className="feather-md" fill="#ff1f00" />
                    </Media>
                    <Media className="d-inline ml-3 mr-3" xs="4">
                      <Square className="feather-md" fill="#ff1f00" />
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
{/* <Card className="flex-fill pt-1 pb-1" >
<CardBody>
  <Media className="d-inline" xs="4">
    <Square className="feather-md" fill="#3fd932" />
    <h7 className="mt-1 ml-2">Normal</h7>
  </Media>
  <Media className="d-inline ml-2" xs="4">
    <Square className="feather-md" fill="#cddb27" />
    <h7 className="mt-1 ml-2">Hight</h7>
  </Media>
  <Media className="d-inline ml-2" xs="4">
    <Square className="feather-md" fill="#e6eb05" />
    <h7 className="mt-1 ml-2">Attention</h7>
  </Media>
  <Media className="d-inline ml-2" xs="4">
    <Square className="feather-md" fill="#ff9900" />
    <h7 className="mt-1 ml-2">Warning</h7>
  </Media>
  <Media className="d-inline ml-2" xs="4">
    <Square className="feather-md" fill="#ff1f00" />
    <h7 className="mt-1 ml-2">Danger</h7>
  </Media>
</CardBody>
</Card> */}

export default Statistics;
