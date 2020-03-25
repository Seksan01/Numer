import React, { Component } from 'react';
import '../App.css';
import {  Input, Button ,Layout} from 'antd';
import {  compile,derivative } from 'mathjs'
import axios from 'axios'
var y, errors, exact;
var fx = " ";
class Backwardh2 extends Component {
  constructor() {
    super();
    this.state = {
        fx: "",
        x: 0,
        h: 0,
        d: 0,
        showOutput: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.Backwardh2 = this.Backwardh2.bind(this);
}
Backwardh2(d,h,x) {
  fx = this.state.fx;

  
      if(d===1){
        y = (3*this.func(x) - 4*this.func(x-(1*h)) + this.func(x-(2*h))) / (2*h)
      }
      else if(d===2){
        y = (2*this.func(x) - 5*this.func(x-(1*h)) + 4*this.func(x-(2*h)) - this.func(x-(3*h))) / Math.pow(h, 2)
      }
      else if(d===3){
        y = (5*this.func(x) - 18*this.func(x-(1*h)) + 24*this.func(x-(2*h)) - 14*this.func(x-(3*h)) + 3*this.func(x-(3*h))) / (2*Math.pow(h, 3))
      }
      else if(d===4){
        y = (3*this.func(x) - 14*this.func(x-(1*h)) + 26*this.func(x-(2*h)) - 24*this.func(x-(3*h)) + 11*this.func(x-(4*h)) - 2*this.func(x-(5*h))) / Math.pow(h, 4)
      }
    console.log(y)
    console.log(x)
    exact = this.funcD(x)
    errors = this.error(exact,y).toFixed(6);

      
  this.setState({
      showOutput: true,
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
funcD(X){
    
    
        return derivative(this.state.fx,'x').eval({x: X});
    
}


componentDidMount(){
  axios.get("http://localhost:9000/api/getdiff").then(res=>{
      this.setState({fx: res.data.data[0].Fx});
      this.setState({d: res.data.data[0].d});
      this.setState({h: res.data.data[0].h});
      this.setState({x: res.data.data[0].x});
      console.log(res.data.data[0].Fx)
        console.log(res.data.data[0].d)
        console.log(res.data.data[0].h)
        console.log(res.data.data[0].x)

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
              
                  <h2 style={{ color: "black", fontWeight: "bold" }}>Backwardh2</h2>
                  
                      <div
                          onChange={this.handleChange}
                          style={{ marginLeft: 240, marginTop: 50, width: 280 }}
                      >
                          <h2>Equation</h2><Input size="large" name="fx" style={{ width: 300 }}></Input>
                          <h2>D</h2><Input size="large" name="d" style={{ width: 300 }}></Input><br /><br />
                          <h2>h</h2><Input size="large" name="h" style={{ width: 300 }}></Input><br /><br />                           
                          <h2>X</h2><Input size="large" name="x" style={{ width: 300 }}></Input><br /><br />                           
                          <Button onClick={() => this.Backwardh2(parseFloat(this.state.d),parseFloat(this.state.h),parseFloat(this.state.x))
                          }
                              style={{  marginLeft: 90 ,color:'#ffffff',background:'#12406A'}}>Submit</Button><br /><br />
                      </div>
                      {this.state.showOutput &&
                          <div
                              title={"Output12"}
                              bordered={true}
                              style={{ width: "50%", float: "inline-start", marginBlockStart: "2%" }}
                              id="output12"
                          >
                              <br /><br /> <p style={{fontSize: "24px", fontWeight: "bold"}}>
                              Ans = {y}<br/>
                                Real = {exact}<br/>
                                Error = {errors}<br/>
                            </p>
                          </div>
                      }

                 
              

          </Layout>
    );
  }
}

export default Backwardh2;







