import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row, Col,
  Input,
  DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown
} from "reactstrap";
import "./Tables.css";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment'
const utils = require("../../utils/utils");

const All = [
  {
    dataField: "time",
    text: "Time",
    sort: true,
  },

  {
    dataField: "UA",
    text: "UA",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low } = utils.getStationInfo();
      if (cell <= volt_low) {
        return { color: "red" };
      }
      else if (cell >= volt_high) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "UB",
    text: "UB",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low } = utils.getStationInfo();
      if (cell <= volt_low) {
        return { color: "red" };
      }
      else if (cell >= volt_high) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "UC",
    text: "UC",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low } = utils.getStationInfo();
      if (cell <= volt_low) {
        return { color: "red" };
      }
      else if (cell >= volt_high) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "IA",
    text: "IA",
    sort: true,
    style: function callback(cell) {
      const { current_high } = utils.getStationInfo();
      if (cell >= current_high * 30 / 100 && cell <= current_high * 70 / 100) {
        return { color: "orange" };
      }
      else if (cell > current_high * 70 / 100) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "IB",
    text: "IB",
    sort: true,
    style: function callback(cell) {
      const { current_high } = utils.getStationInfo();
      if (cell >= current_high * 30 / 100 && cell <= current_high * 70 / 100) {
        return { color: "orange" };
      }
      else if (cell > current_high * 70 / 100) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "IC",
    text: "IC",
    sort: true,
    style: function callback(cell) {
      const { current_high } = utils.getStationInfo();
      if (cell >= current_high * 30 / 100 && cell <= current_high * 70 / 100) {
        return { color: "orange" };
      }
      else if (cell > current_high * 70 / 100) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "PA",
    text: "PA",
    sort: true
  },
  {
    dataField: "PB",
    text: "PB",
    sort: true
  },
  {
    dataField: "PC",
    text: "PC",
    sort: true
  },
  {
    dataField: "QA",
    text: "QA",
    sort: true
  },
  {
    dataField: "QB",
    text: "QB",
    sort: true
  },
  {
    dataField: "QC",
    text: "QC",
    sort: true
  },
  {
    dataField: "cosA",
    text: "CosA",
    sort: true
  },
  {
    dataField: "cosB",
    text: "CosB",
    sort: true
  },
  {
    dataField: "cosC",
    text: "CosC",
    sort: true
  },
  {
    dataField: "hum",
    text: "Humidity",
    sort: true
  },
  {
    dataField: "temp",
    text: "Temperature",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low, current_high, temp_high, oil_high } = utils.getStationInfo();
      if (cell >= temp_high + 10 && cell < temp_high + 20) {
        return { color: "orange" };
      }
      else if (cell >= temp_high + 20 && cell < temp_high + 30) {
        return { color: "orangered" };
      }
      else if (cell > temp_high + 30) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "oil",
    text: "Oil Temperature",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low, current_high, temp_high, oil_high } = utils.getStationInfo();
      if (cell >= oil_high + 10 && cell < oil_high + 20) {
        return { color: "orange" };
      }
      else if (cell >= oil_high + 20 && cell < oil_high + 30) {
        return { color: "orangered" };
      }
      else if (cell > oil_high + 30) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "freq",
    text: "Frequency",
    sort: true
  },
  {
    dataField: "Pgiao",
    text: "Pgiao",
    sort: true
  },

];

const VoltColumns = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "UA",
    text: "UA",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low } = utils.getStationInfo();
      if (cell <= volt_low) {
        return { color: "red" };
      }
      else if (cell >= volt_high) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "UB",
    text: "UB",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low } = utils.getStationInfo();
      if (cell <= volt_low) {
        return { color: "red" };
      }
      else if (cell >= volt_high) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "UC",
    text: "UC",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low } = utils.getStationInfo();
      if (cell <= volt_low) {
        return { color: "red" };
      }
      else if (cell >= volt_high) {
        return { color: "red" };
      }
    },
  }
];

const AmpleColumns = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "IA",
    text: "IA",
    sort: true,
    style: function callback(cell) {
      const { current_high } = utils.getStationInfo();
      if (cell >= current_high * 30 / 100 && cell <= current_high * 70 / 100) {
        return { color: "orange" };
      }
      else if (cell > current_high * 70 / 100) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "IB",
    text: "IB",
    sort: true,
    style: function callback(cell) {
      const { current_high } = utils.getStationInfo();
      if (cell >= current_high * 30 / 100 && cell <= current_high * 70 / 100) {
        return { color: "orange" };
      }
      else if (cell > current_high * 70 / 100) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "IC",
    text: "IC",
    sort: true,
    style: function callback(cell) {
      const { current_high } = utils.getStationInfo();
      if (cell >= current_high * 30 / 100 && cell <= current_high * 70 / 100) {
        return { color: "orange" };
      }
      else if (cell > current_high * 70 / 100) {
        return { color: "red" };
      }
    },
  }
];

const WattageColumns = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "PA",
    text: "PA",
    sort: true
  },
  {
    dataField: "PB",
    text: "PB",
    sort: true
  },
  {
    dataField: "PC",
    text: "PC",
    sort: true
  }
];

const ReactiveColumns = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "QA",
    text: "QA",
    sort: true
  },
  {
    dataField: "QB",
    text: "QB",
    sort: true
  },
  {
    dataField: "QC",
    text: "QC",
    sort: true
  }
];

const SensorsColumns = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "hum",
    text: "Humidity",
    sort: true
  },
  {
    dataField: "temp",
    text: "Temperature",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low, current_high, temp_high, oil_high } = utils.getStationInfo();
      if (cell >= temp_high + 10 && cell < temp_high + 20) {
        return { color: "orange" };
      }
      else if (cell >= temp_high + 20 && cell < temp_high + 30) {
        return { color: "orangered" };
      }
      else if (cell > temp_high + 30) {
        return { color: "red" };
      }
    },
  },
  {
    dataField: "oil",
    text: "Oil Temperature",
    sort: true,
    style: function callback(cell) {
      const { volt_high, volt_low, current_high, temp_high, oil_high } = utils.getStationInfo();
      if (cell >= oil_high + 10 && cell < oil_high + 20) {
        return { color: "orange" };
      }
      else if (cell >= oil_high + 20 && cell < oil_high + 30) {
        return { color: "orangered" };
      }
      else if (cell > oil_high + 30) {
        return { color: "red" };
      }
    },
  }
];

const FrequencyColumns = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "freq",
    text: "Frequency",
    sort: true
  },
  {
    dataField: "Pgiao",
    text: "Pgiao",
    sort: true
  }
];

class MyExportCSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onExport();
  };

  render() {
    return (
      <div>
        <button className="btn btn-secondary mt-2 float-right" onClick={this.handleClick.bind(this)}>
          Export
        </button>
      </div>
    );
  }
};

// class DateTimePicker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleFromChange = this.handleFromChange.bind(this);
//     this.handleToChange = this.handleToChange.bind(this);
//     this.state = {
//       from: new Date(moment().startOf('year').format('L')),
//       to: new Date(moment().endOf('year').format('L')),
//     };
//   }

//   handleFromChange(from) {
//     this.setState({ from });
//     this.props.handerSetDueDate(from, null);
//     console.log(from);

//   }
//   handleToChange(to) {
//     this.setState({ to }, this.showFromMonth);
//     this.props.handerSetDueDate(null, to);
//   }
//   render() {
//     const { from, to } = this.state;
//     const modifiers = { start: from, end: to };
//     return (
//       <div className="InputFromTo" >
//         <UncontrolledDropdown >
//           <DropdownToggle caret color="light">
//             Phase: {moment(from).format('L')} - {moment(to).format('L')} {' '}
//           </DropdownToggle>
//           <DropdownMenu>
//             <DropdownItem header>
//               Start time: {' '}
//               <DayPickerInput
//                 inputProps={{ style: { width: 100 } }}
//                 value={from}
//                 placeholder="From"
//                 formatDate={formatDate}
//                 parseDate={parseDate}
//                 dayPickerProps={{
//                   selectedDays: [from, { from, to }],
//                   disabledDays: { after: to },
//                   toMonth: to,
//                   modifiers,
//                   numberOfMonths: 1,
//                   onDayClick: () => this.to.getInput().focus(),
//                 }}
//                 onDayChange={this.handleFromChange}
//               />
//             </DropdownItem>
//             <DropdownItem header>
//               End Time: {' '}
//               <DayPickerInput
//                 ref={el => (this.to = el)}
//                 inputProps={{ style: { width: 100 } }}
//                 value={to}
//                 placeholder="To"
//                 formatDate={formatDate}
//                 parseDate={parseDate}
//                 dayPickerProps={{
//                   selectedDays: [from, { from, to }],
//                   disabledDays: { before: from },
//                   modifiers,
//                   month: from,
//                   fromMonth: from,
//                   numberOfMonths: 1,
//                 }}
//                 onDayChange={this.handleToChange}
//               />
//             </DropdownItem>
//           </DropdownMenu>
//         </UncontrolledDropdown>
//       </div>
//     );
//   }
// }

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "volt",
      isLoaded: false,
      data: []
    };
    this.handleChangeType = this.handleChangeType.bind(this);
  }


  handleChangeType(event) {
    this.setState({
      type: event.target.value
    })
    this.props.handleChangeType(event.target.value);
  }


  render() {
    const data = this.props.data;
    return (
      <Card>
        <ToolkitProvider
          keyField="time"
          data={data}
          columns={
            this.state.type === "all" ? All :
              this.state.type === "volt" ? VoltColumns :
                this.state.type === "ample" ? AmpleColumns :
                  this.state.type === "wattage" ? WattageColumns :
                    this.state.type === "reactive" ? ReactiveColumns :
                      this.state.type === "frequency" ? FrequencyColumns :
                        SensorsColumns
          }
          exportCSV
        >
          {props => (
            <div>
              <CardHeader>
                <div classtime="float-right pull-right">
                  <MyExportCSV {...props.csvProps} />
                </div>
                {/* <DateTimePicker handerSetDueDate={this.handerSetDueDate} /> */}
                <CardTitle tag="h5">
                  <Row>
                    <Col xs="4" className="mt-1">
                      <Input type="select" onChange={this.handleChangeType} value={this.state.type}>
                        <option value="all">All</option>
                        <option value="volt">Volt</option>
                        <option value="ample">Ample</option>
                        <option value="wattage">Wattage</option>
                        <option value="reactive">Reactive Power</option>
                        <option value="frequency">Frequency & Pgiao</option>
                        <option value="sensors">Sensors</option>
                      </Input>
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody className={this.state.type === "all" ? "tables" : ""}>
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  bordered={false}
                  pagination={paginationFactory({
                    sizePerPage: 5,
                    sizePerPageList: [5, 10, 25, 50],

                  })}
                  noDataIndication="Table is Empty"
                  hover
                  wrapperClasses="table-responsive"
                  scrollY="auto"
                />
              </CardBody>
            </div>
          )}
        </ToolkitProvider>
      </Card>
    );
  }
}


export default Tables;
