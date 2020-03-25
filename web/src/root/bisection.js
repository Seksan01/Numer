  import React, { Component } from 'react';
  import '../App.css';
  import {  Input, Button, Table ,Layout} from 'antd';
  import {  compile } from 'mathjs'
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
  import axios from 'axios'
  var dataT = []
  var dataA = []
  const columns = [
      {
          title: "Iteration",
          dataIndex: "iteration",
          key: "iteration"
      },
      {
          title: "Xl",
          dataIndex: "xl",
          key: "xl"
      },
      {
          title: "Xr",
          dataIndex: "xr",
          key: "xr"
      },
      {
          title: "X",
          dataIndex: "x",
          key: "x"
      },
      {
          title: "Error",
          key: "error",
          dataIndex: "error"
      }
  ];
var fx = " ";
  class Bisection extends Component {
    constructor() {
      super();
      this.state = {
          fx: "",
          xl: 0,
          xr: 0,
          showOutput: false,
          showGraph: false,
      }
      this.handleChange = this.handleChange.bind(this);
      this.bisection = this.bisection.bind(this);
  }
  bisection(xl,xr) {
    fx = this.state.fx;
    var xm = 0;
    var sum = parseFloat(0.000000);
    var i = 0;
    var data = []
    var xlold
    var xrold
    data['xl'] = []
    data['xr'] = []
    data['x'] = []
    data['error'] = []
    data['iteration'] = []

    do {
         xlold = xl;
         xrold = xr;
        xm = (xl + xr) / 2;
        if (this.func(xm) * this.func(xr) < 0) {
            if (this.func(xm) * this.func(xl) > 0) {
            sum = this.error(xm, xl);
            xl = xm;}
        }
        else {
            if (this.func(xm) * this.func(xl) < 0) {
            sum = this.error(xm, xr);
             xr = xm;  
            }  
        }
        data['iteration'][i] = i;
        data['xl'][i] = xlold.toFixed(6);
        data['xr'][i] = xrold.toFixed(6);
        data['x'][i] = xm.toFixed(6);
        data['error'][i] = Math.abs(sum).toFixed(6);
        i++;
    } while (Math.abs(sum) > 0.000001);
    this.createTable(data['xl'], data['xr'], data['x'], data['error']);
    this.setState({
        showOutput: true,
        showGraph: true
    })
}
error(xnew, xold) {
    return Math.abs((xnew - xold) / xnew);
}
func(X) {  
    let scope = { x: parseFloat(X) }; //แปลงค่า string หรือตัวแปรให้เป็น Number
    var variable = compile(this.state.fx);
  
    return variable.eval(scope); //eval compile 'String'
}
createTable(xl, xr, x, error) {
    dataT = []
    dataA = []
    for (var i = 0; i < xl.length; i++) {
        dataT.push({
            iteration: i + 1,
            xl: xl[i],
            xr: xr[i],
            x: x[i],
            error: error[i],
        });
        dataA.push({
            iteration: i + 1,
            x: x[i],
            y: this.func(x[i]).toFixed(6),
        });
    }
}

componentDidMount(){
    axios.get("http://localhost:9000/api/getbisection").then(res=>{
        console.log(res.data)
        console.log(res.data.data.Fx)
        this.setState({fx: res.data.data[0].Fx});
        this.setState({xl: res.data.data[0].XL});
        this.setState({xr: res.data.data[0].XR});
        console.log(res.data.data[0].Fx)
        console.log(res.data.data[0].XL)
        console.log(res.data.data[0].XR)
    })
}

handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value 
    });
}

    render() {
      return (
        <Layout style={{ minHeight: '100vh' }}>
                
                    <h2 style={{ color: "black", fontWeight: "bold" }}>Bisection</h2>
                    
                        <div
                            onChange={this.handleChange}
                            style={{ marginLeft: 240, marginTop: 50, width: 280 }}
                        >
                            <h2>Equation</h2><Input size="large" name="fx" style={{ width: 300 }}></Input>
                            <h2>Xl</h2>
                            <Input size="large" name="xl" style={{ width: 300 }}></Input>
                            <h2>Xr</h2><Input size="large" name="xr" style={{ width: 300 }}></Input><br /><br />  
                            <Button onClick={() => this.componentDidMount()
                            }
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Api</Button><br /><br />                         
                            <Button onClick={() => this.bisection(parseFloat(this.state.xl),parseFloat(this.state.xr))
                            }
                                style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button><br /><br />
                        </div>
                        {this.state.showGraph &&
                        <div>
                           
                                <LineChart
                                    width={950}
                                     height={400}
                                    data={dataA}
                                     margin={{ top: 30, bottom: 10 }}
                                    style={{ backgroundColor: "#fff" }}
                                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" />
                                <YAxis
                                type="number"
                                 dataKey="y"
                                 domain={["auto", "auto"]}
                                 allowDataOverflow="true"
                                />
                                <Tooltip />
                                <Legend />
                                <Line type="linear" dataKey="y" stroke="#8884d8" />
                                </LineChart>
                           
                        </div>
                        }
                        {this.state.showOutput &&
                            <div
                                title={"Output12"}
                                bordered={true}
                                style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                                id="output12"
                            >
                                <br /><br /> <Table style={{ width: 800 }} columns={columns} dataSource={dataT} pagination={{ pageSize: 10 }} >

                                </Table>
                            </div>
                        }

                   
                

            </Layout>
      );
    }
  }

  export default Bisection;
  




  

