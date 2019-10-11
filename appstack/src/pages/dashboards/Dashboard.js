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
      dataFault: {
        Fault: "00000000"
      },
      status: true,
      info: [],
      isLoaded: false,
      isLoaderAPI_EvaluationList: false,
      type: null,
      response: false,
      socket: true,
      from_date: "",
      to_date: "",
      endpoint: config_socket.ip,
    };
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSocket = this.handleChangeSocket.bind(this);
  }
  handleChangeType(type) {
    this.setState({ type: type });
  }
  handleSearch(from, to) {
    this.setState({ from_date: from, to_date: to })
    const that = this;
    api.getDataReport(from, to, (err, result) => {
      if (err) {
        Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
      } else {
        console.log(result);

        let element = [];
        let data = [...result];
        data.map((value, index) => {
          value.time = moment(value.time).format('DD/MM/YYYY h:mm:ss')
          element.push(value);
        });
        if (data.length !== 0)
          that.setState({ data_tables: element, data: result[0], data_charts: result, isLoaderAPI: true });
      }
    })
  }
  handleChangeSocket(socket) {
    if (socket === true) {
      this.setState({ socket: true });
    } else {
      this.setState({ socket: false });
    }
  }
  UNSAFE_componentWillMount() {
    const that = this;
    api.getData((err, result) => {
      if (err) {
        Notification("error", "Error", err.data === undefined ? err : err.data._error_message)
      } else {
        console.log(result);
        let element = [];
        let data = [...result];
        data.map((values, index) => {
          let value = { ...values }
          value.time = moment(value.time).format('DD/MM/YYYY h:mm:ss')
          element.push(value);
        });
        if (data.length !== 0)
          that.setState({ data_tables: element, data: result[0], data_charts: result, isLoaderAPI: true });
      }

    })
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

    socket.on('connect', function () {
      console.log("connected");
      that.setState({ status: true });
    });

    socket.on('disconnect', function () {
      console.log("disconect");
      that.setState({ status: true });
    });

    socket.on("substation_" + sub_id, function (value) {
      that.setState({ dataFault: value, data: value })

      if (that.state.socket === true) {
        that.setState({ data_charts: [...that.state.data_charts, value] })
        var length = that.state.data_charts.length;
        if (length >= 20) {
          that.state.data_charts.shift();
        }

        var value_table = Object.assign({}, value);
        var date = moment(value_table.time).format('DD/MM/YYYY h:mm:ss');
        value_table["time"] = date
        that.setState({ data_tables: [...that.state.data_tables, value_table] })
        var lengtht = that.state.data_tables.length;
        if (lengtht >= 20) {
          that.state.data_tables.shift();
        }
      }
    });
    socket.on('error', function (err) {
      console.log("Error: " + err.message);
    });

    this.setState({ info: utils.getStationInfo(), isLoaded: true });

  }

  render() {
    return (
      !this.state.isLoaded && this.state.data !== [] ? <p className="text-center">Loading...</p> :
        <Container fluid className="p-0">
          <Row>
            <Col lg="8" md="12" className="d-flex">
              <Statistics data={this.state.data} />
            </Col>
            <Col lg="4" md="2" className="d-md-block">
              <StationInformation data={this.state.info} dataFault={this.state.dataFault} status={this.state.status} />
            </Col>
          </Row>
          <Row>
            <Col lg="6" className="d-flex">
              <Tables data={this.state.data_tables} handleChangeType={this.handleChangeType} />
            </Col>
            <Col lg="6" className="d-flex">
              <Chart data={this.state.data_charts} type={this.state.type} handleSearch={this.handleSearch} handleChangeSocket={this.handleChangeSocket} />
            </Col>
          </Row>
        </Container>
    );
  }
}


export default Crypto;
