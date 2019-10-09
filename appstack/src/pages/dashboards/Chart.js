import React from "react";

import ApexCharts from "react-apexcharts";

import {
  Card, CardBody, CardHeader, CardTitle,
  DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown, Input,
  Row, Col
} from "reactstrap";
import { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput';
class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: new Date(moment().startOf('year').format('L')),
      to: new Date(moment().endOf('year').format('L')),
    };
  }

  handleFromChange(from) {
    this.setState({ from });
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    if (this.state.from !== "") {
      this.props.handerSetDueDateKPI(this.state.from, to);
    }
  }
  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo" >
        <UncontrolledDropdown >
          <DropdownToggle caret color="light">
            Phase: {moment(from).format('L')} - {moment(to).format('L')} {' '}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>
              Start time: {' '}
              <DayPickerInput
                inputProps={{ style: { width: 100 } }}
                value={from}
                placeholder="From"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { after: to },
                  toMonth: to,
                  modifiers,
                  numberOfMonths: 1,
                  onDayClick: () => this.to.getInput().focus(),
                }}
                onDayChange={this.handleFromChange}
              />
            </DropdownItem>
            <DropdownItem header>
              End Time: {' '}
              <DayPickerInput
                ref={el => (this.to = el)}
                inputProps={{ style: { width: 100 } }}
                value={to}
                placeholder="To"
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  selectedDays: [from, { from, to }],
                  disabledDays: { before: from },
                  modifiers,
                  month: from,
                  fromMonth: from,
                  numberOfMonths: 1,
                }}
                onDayChange={this.handleToChange}
              />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: [],
      socket: true,
      type: "realtime",
    };
    this.handerSetDueDateKPI = this.handerSetDueDateKPI.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.options = {
      stroke: {
        width: 3
      },
      yaxis: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        show: true,
        labels: {
          format: 'h:mm:ss'
        },
        tickAmount: 'dataPoints',
      },
      colors: ["#0cc2aa", "#fcc100", "#f44455", "#BD10E0", "#5fc27e", "#5b7dff", "#c6eb34", "#34ebb7", "#34ebb7", "#36403d", "#f3ff05", "#8e9be8", "#aaabb3", "#f08f07", "#f0ece6"]
    };
  }

  componentDidMount() {
    // Trigger resize manually so chart doesn't fall off canvas
    window.dispatchEvent(new Event("resize"));
  }
  handerSetDueDateKPI(from, to) {
    this.props.handleSearch(from, to);
  }
  handleChangeType(event) {
    this.setState({
      type: event.target.value
    })
    if (event.target.value === "report") {
      this.props.handleChangeSocket(false);
    }
    else {
      this.props.handleChangeSocket(true);
    }
  }
  render() {
    const data = this.props.data;
    const type = this.props.type;
    const UA = data.map(({ time, UA }, key) => {
      let x = time;
      let y = UA;
      return { x, y }
    })

    const UB = data.map(({ time, UB }, key) => {
      let x = time;
      let y = UB;
      return { x, y }
    })
    const UC = data.map(({ time, UC }, key) => {
      let x = time;
      let y = UC;
      return { x, y }
    })
    const PA = data.map(({ time, PA }, key) => {
      let x = time;
      let y = PA;
      return { x, y }
    })
    const PB = data.map(({ time, PB }, key) => {
      let x = time;
      let y = PB;
      return { x, y }
    })
    const PC = data.map(({ time, PC }, key) => {
      let x = time;
      let y = PC;
      return { x, y }
    })
    const IA = data.map(({ time, IA }, key) => {
      let x = time;
      let y = IA;
      return { x, y }
    })
    const IB = data.map(({ time, IB }, key) => {
      let x = time;
      let y = IB;
      return { x, y }
    })
    const IC = data.map(({ time, IC }, key) => {
      let x = time;
      let y = IC;
      return { x, y }
    })
    const QA = data.map(({ time, QA }, key) => {
      let x = time;
      let y = QA;
      return { x, y }
    })
    const QB = data.map(({ time, QB }, key) => {
      let x = time;
      let y = QB;
      return { x, y }
    })
    const QC = data.map(({ time, QC }, key) => {
      let x = time;
      let y = QC;
      return { x, y }
    })
    const cosA = data.map(({ time, QA }, key) => {
      let x = time;
      let y = cosA;
      return { x, y }
    })
    const cosB = data.map(({ time, QB }, key) => {
      let x = time;
      let y = cosB;
      return { x, y }
    })
    const cosC = data.map(({ time, QC }, key) => {
      let x = time;
      let y = cosC;
      return { x, y }
    })
    const hum = data.map(({ time, hum }, key) => {
      let x = time;
      let y = hum;
      return { x, y }
    })
    const temp = data.map(({ time, temp }, key) => {
      let x = time;
      let y = temp;
      return { x, y }
    })
    const oil = data.map(({ time, oil }, key) => {
      let x = time;
      let y = oil;
      return { x, y }
    })
    const freq = data.map(({ time, freq }, key) => {
      let x = time;
      let y = freq;
      return { x, y }
    })
    const Pgiao = data.map(({ time, Pgiao }, key) => {
      let x = time;
      let y = Pgiao;
      return { x, y }
    })

    return (
      <Card className="flex-fill">
        <CardHeader>
          <Row>
            {
              this.state.type === "realtime"
                ?
                <Col>
                  <CardTitle tag="h5" className="mb-0 mt-2 ml-1">Evaluation Chart</CardTitle>
                </Col>
                :
                <Col>
                  <DateTimePicker className=" d-inline" handerSetDueDateKPI={this.handerSetDueDateKPI} />
                </Col>

            }
            <Col xs="3">
              <Input type="select" value={this.state.type} onChange={this.handleChangeType} >
                <option value="realtime">RealTime</option>
                <option value="report">Report</option>
              </Input>
            </Col>
          </Row>


        </CardHeader >
        <CardBody>
          <div className="chart">
            <ApexCharts
              options={this.options}
              series={
                type === "volt" ?
                  [
                    {
                      name: "UA",
                      data: UA
                    },
                    {
                      name: "UB",
                      data: UB
                    },
                    {
                      name: "UC",
                      data: UC
                    }
                  ]
                  : type === "ample" ?
                    [
                      {
                        name: "IA",
                        data: IA
                      },
                      {
                        name: "IB",
                        data: IB
                      },
                      {
                        name: "IC",
                        data: IC
                      }
                    ]
                    : type === "wattage" ?
                      [
                        {
                          name: "PA",
                          data: PA
                        },
                        {
                          name: "PB",
                          data: PB
                        },
                        {
                          name: "PC",
                          data: PC
                        }
                      ]
                      : type === "reactive" ?
                        [
                          {
                            name: "QA",
                            data: QA
                          },
                          {
                            name: "QB",
                            data: QB
                          },
                          {
                            name: "QC",
                            data: QC
                          }
                        ]
                        : type === "sensors" ?
                          [
                            {
                              name: "Humidity",
                              data: hum
                            },
                            {
                              name: "Temperature",
                              data: temp
                            },
                            {
                              name: "Oil Temperature",
                              data: oil
                            }
                          ]
                          : type === "frequency" ?
                            [
                              {
                                name: "Frequency",
                                data: freq
                              },
                              {
                                name: "Pgiao",
                                data: Pgiao
                              }
                            ]
                            :
                            [
                              {
                                name: "UA",
                                data: UA
                              },
                              {
                                name: "UB",
                                data: UB
                              },
                              {
                                name: "UC",
                                data: UC
                              },
                              {
                                name: "IA",
                                data: IA
                              },
                              {
                                name: "IB",
                                data: IB
                              },
                              {
                                name: "IC",
                                data: IC
                              },
                              {
                                name: "PA",
                                data: PA
                              },
                              {
                                name: "PB",
                                data: PB
                              },
                              {
                                name: "PC",
                                data: PC
                              },
                              {
                                name: "QA",
                                data: QA
                              },
                              {
                                name: "QB",
                                data: QB
                              },
                              {
                                name: "QC",
                                data: QC
                              },
                              {
                                name: "CosA",
                                data: cosA
                              },
                              {
                                name: "CosB",
                                data: cosB
                              },
                              {
                                name: "CosC",
                                data: cosC
                              }
                            ]
              }
              type="line"
              height="400"
            />
          </div>
        </CardBody>
      </Card >
    );
  }
}

export default Chart;
