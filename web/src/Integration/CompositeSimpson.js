import React, { Component } from 'react';
import '../App.css';
import {  Input, Button ,Layout} from 'antd';
import {  compile,derivative,create,all } from 'mathjs'
import axios from 'axios'
const mathjs = create(all)
const mathInt = require('mathjs-simple-integral')
mathjs.import(mathInt)
var y, errors, exact;
var fx = " ";
class CompositeSimpson extends Component {
  constructor() {
    super();
    this.state = {
        fx: "",
        h: 0,
        d: 0,
        x: 0,
        showOutput: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.CompositeSimpson = this.CompositeSimpson.bind(this);
}
CompositeSimpson(b,a,n) {
  fx = this.state.fx;
  var ans = 0
  var e = 0
  var x =a
  var i
  var h = (b - a) / n
  for (i = 0; i <= n; i++) {
      if (i === 0 || i === n) {
          ans += this.func(x);
      } else {
        if(i%2===1){
          ans += 4 * this.func(x);
        }
        else{
          ans += 2 * this.func(x);
        }
         
      }
      x += h
  }
  ans *= h / 3
  y = ans
  const inte = mathjs.integral(this.state.fx,'x')
  const intes = inte.toString();
  exact = mathjs.parse(intes).evaluate({x:b})-mathjs.parse(intes).evaluate({x:a})
  errors = this.error(exact,ans)
    console.log(ans)
    console.log(inte)


      
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


componentDidMount(){
  axios.get("http://localhost:9000/api/getinte").then(res=>{
    console.log(res.data)
        console.log(res.data.data.Fx)
      this.setState({fx: res.data.data[0].Fx});
      this.setState({b: res.data.data[0].upper});
      this.setState({a: res.data.data[0].lower});
      this.setState({n: res.data.data[0].n});
      console.log(res.data.data[0].Fx)
        console.log(res.data.data[0].upper)
        console.log(res.data.data[0].lower)
        console.log(res.data.data[0].n)

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
              
                  <h2 style={{ color: "black", fontWeight: "bold" }}>CompositeSimpson</h2>
                  
                      <div
                          onChange={this.handleChange}
                          style={{ marginLeft: 240, marginTop: 50, width: 280 }}
                      >
                          <h2>Equation</h2><Input size="large" name="fx" style={{ width: 300 }}></Input>
                          <h2>Upper</h2><Input size="large" name="b" style={{ width: 300 }}></Input><br /><br />
                          <h2>Lower</h2><Input size="large" name="a" style={{ width: 300 }}></Input><br /><br />                           
                          <h2>N</h2><Input size="large" name="n" style={{ width: 300 }}></Input><br /><br />                           
                          <Button onClick={() => this.CompositeSimpson(parseFloat(this.state.b),parseFloat(this.state.a),parseFloat(this.state.n))
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

export default CompositeSimpson;







