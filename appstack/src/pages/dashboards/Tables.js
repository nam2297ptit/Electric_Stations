import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row, Col,
  Input
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from 'moment'
function valueFormatter(cell, row, rowIndex) {
  console.log(row);
  
}
const VoltColumns = [
  {
    dataField: "time",
    text: "Time",
    sort: true,
    classes: (cell, row, rowIndex, colIndex) => {
      if (rowIndex % 2 === 0) return 'demo-row-even';
      return (
        <span>
        <strong style={ { color: 'red' } }>$ { cell } NTD(Sales!!)</strong>
      </span>
      );
    }
  },
  {
    dataField: "UA",
    text: "UA",
    sort: true
  },
  {
    dataField: "UB",
    text: "UB",
    sort: true
  },
  {
    dataField: "UC",
    text: "UC",
    sort: true
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
    sort: true
  },
  {
    dataField: "IB",
    text: "IB",
    sort: true
  },
  {
    dataField: "IC",
    text: "IC",
    sort: true
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
class MyExportCSV  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick= this.handleClick.bind(this);
  }
  handleClick(){
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
          data = {data}
          columns={
            this.state.type === "volt"
            ?
            VoltColumns
            :
            this.state.type === "ample"
            ?
            AmpleColumns
            :
            WattageColumns
          }
                    
          exportCSV
        >
          {props => (
            <div>
              <CardHeader>
                <div classtime="float-right pull-right">
                  <MyExportCSV {...props.csvProps} />
                </div>
                <CardTitle tag="h5">
                  <Row>
                    <Col xs="4" className="mt-1">
                        <Input type="select" onChange={this.handleChangeType} value={this.state.type}>
                            <option value="volt">Volt</option>
                            <option value="ample">Ample</option>
                            <option value="wattage">Wattage</option>
                        </Input>
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody>
              <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  bordered={false}
                  pagination={paginationFactory({
                    sizePerPage: 5,
                    sizePerPageList: [5, 10, 25, 50]
                  })}
                  noDataIndication="Table is Empty"
                  hover
                  
                  
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
