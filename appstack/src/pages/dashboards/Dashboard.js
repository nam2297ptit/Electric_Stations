import React from "react";
import { Container, Row, Col } from "reactstrap";
import socketIOClient from "socket.io-client";
import Chart from "./Chart";
import Tables from "./Tables";
import Statistics from "./Statistics";
import StationInformation from "./StationInformation";
import moment from 'moment'
import Notification from "../../components/Notification";
const config_socket = require("../../config/config").config_socket;
const utils = require("../../utils/utils");
const api = require("./api/api");
class Crypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      data_tables: [],
      data_charts: [],
      info: [],
      isLoaded: false,
      isLoaderAPI_EvaluationList: false,
      type: null,
      response: false,
      endpoint: config_socket.ip
    };
    this.handleChangeType = this.handleChangeType.bind(this);
  }
  handleChangeType(type) {
    this.setState({ type: type });
  }
  componentWillMount() {
    // const that = this;
    // api.getData((err, result)=>{       
    // if(err){
    //     Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
    // } else {
    //     let element = [];
    //     let data = [...result];
    //     data.map((value,index) => {
    //       element.push(value);
    //     });
    //     that.setState({data_tables: element ,data: result[0],data_charts: result, isLoaderAPI: true});
    //     }
    // })
  }

  componentDidMount() {
    const that = this;
    const { endpoint } = this.state;
    const sub_id = utils.getStationInfo().sub_id;
    const socket = socketIOClient(endpoint, {
      query: {
        token: utils.getAuthToken(),
        sub_id: sub_id
      }
    });
    socket.on("substation_" + sub_id, function (value) {

      that.setState({ data: value, data_charts: [...that.state.data_charts, value] })
      var length = that.state.data_charts.length;
      if (length >= 51) {
        that.state.data_charts.unshift();
      }

      var value_table = Object.assign({}, value);
      var date = moment(value_table.time).format('DD/MM/YYYY h:mm:ss a');
      value_table["time"] = date
      that.setState({ data_tables: [...that.state.data_tables, value_table] })
      var lengtht = that.state.data_tables.length;
      if (lengtht >= 51) {
        that.state.data_tables.unshift();
      }
    });
    socket.on('error', function (err) {
    });
    this.setState({ info: utils.getStationInfo(), isLoaded: true });
  }

  render() {
    return (
      !this.state.isLoaded ? <p className="text-center">Loading...</p> :
        <Container fluid className="p-0">
          <Row>
            <Col lg="8" xl="8" className="d-flex">
              <Statistics data={this.state.data} />
            </Col>
            <Col lg="4" xl="4" >
              <StationInformation data={this.state.info} />
            </Col>
          </Row>
          <Row>
            <Col lg="6" className="d-flex">
              <Tables data={this.state.data_tables} handleChangeType={this.handleChangeType} />
            </Col>
            <Col lg="6" className="d-flex">
              <Chart data={this.state.data_charts} type={this.state.type} />
            </Col>
          </Row>
        </Container>
    );
  }
}


export default Crypto;
