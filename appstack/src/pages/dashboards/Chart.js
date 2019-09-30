import React from "react";

import ApexCharts from "react-apexcharts";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: []
    };

    this.options = {
      stroke: {
        width: 1
      },
      xaxis: {
        type: "datetime"
      },
      colors: ["#0cc2aa", "#fcc100", "#f44455", "#f44455", "#5fc27e", "#5b7dff"]
    };

  }

  componentDidMount() {
    // Trigger resize manually so chart doesn't fall off canvas
    window.dispatchEvent(new Event("resize"));
  }

  render() {
    const data = this.props.data;
    console.log(data);
    
    const type = this.props.type;
    const UA = data.map(({time, UA },key)=>{
      let x = time;
      let y = UA;
      return {x,y} 
    })
    console.log(UA);
    
    const UB = data.map(({time, UB },key)=>{
      let x = time;
      let y = UB;
      return {x,y} 
    })
    const UC = data.map(({time, UC },key)=>{
      let x = time;
      let y = UC;
      return {x,y} 
    })
    const PA = data.map(({time, PA },key)=>{
      let x = time;
      let y = PA;
      return {x,y} 
    })
    const PB = data.map(({time, PB },key)=>{
      let x = time;
      let y = PB;
      return {x,y} 
    })
    const PC = data.map(({time, PC },key)=>{
      let x = time;
      let y = PC;
      return {x,y} 
    })
    const IA = data.map(({time, IA },key)=>{
      let x = time;
      let y = IA;
      return {x,y} 
    })
    const IB = data.map(({time, IB },key)=>{
      let x = time;
      let y = IB;
      return {x,y} 
    })
    const IC = data.map(({time, IC },key)=>{
      let x = time;
      let y = IC;
      return {x,y} 
    })
    
    return (
      <Card className="flex-fill">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">SSS</CardTitle>
        </CardHeader>
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
                :
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
              }
              type="line"
              height="350"
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Chart;
