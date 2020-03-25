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
class Secant extends Component {
  constructor() {
    super();
    this.state = {
        fx: "",
        xnew: 0,
        showOutput: false,
        showGraph: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.Secant = this.Secant.bind(this);
}
Secant(xold,xnew) {
  fx = this.state.fx;
  var sum = parseFloat(0.000000);
  var i = 0;
  var data = []
 var xtemp
  
  data['x'] = []
  data['error'] = []
  data['iteration'] = []

  do {
      xnew.toFixed(6)
    xtemp = xnew.toFixed(6)  
    xnew = xnew-(this.func(xnew)/this.funcD())
    xold = xnew.toFixed(6);
    sum = this.error(xnew,xtemp)
      data['iteration'][i] = i;
      data['x'][i] = xnew.toFixed(6);
      data['error'][i] = Math.abs(sum).toFixed(6);
      console.log(Math.abs(sum))
      i++;
  } while (Math.abs(sum) > 0.000001);
  this.createTable(data['x'], data['error']);
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
funcD(){
    return (this.func(this.state.xold)-this.func(this.state.xnew))/(this.state.xold-this.state.xnew)
}
createTable( x, error) {
  dataT = []
  dataA = []
  for (var i = 0; i < x.length; i++) {
      dataT.push({
          iteration: i + 1,
          x: x[i],
          error: error[i],
      });
      dataA.push({
          x: x[i],
          y: this.func(x[i]).toFixed(6),
      });
  }
}

componentDidMount(){
  axios.get("http://localhost:9000/api/getsecant").then(res=>{
      console.log(res.data)
      console.log(res.data.data.Fx)
      this.setState({fx: res.data.data[0].Fx});
      this.setState({xold: res.data.data[0].Xold});
      this.setState({xnew: res.data.data[0].Xnew});

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
              
                  <h2 style={{ color: "black", fontWeight: "bold" }}>Secant</h2>
                  
                      <div
                          onChange={this.handleChange}
                          style={{ marginLeft: 240, marginTop: 50, width: 280 }}
                      >
                          <h2>Equation</h2><Input size="large" name="fx" style={{ width: 300 }}></Input>
                          <h2>Xold</h2><Input size="large" name="xold" style={{ width: 300 }}></Input><br /><br />                           
                          <h2>Xnew</h2><Input size="large" name="xnew" style={{ width: 300 }}></Input><br /><br />                           
                          <Button onClick={() => this.Secant(parseFloat(this.state.xold),parseFloat(this.state.xnew))
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

export default Secant;







