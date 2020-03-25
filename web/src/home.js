import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon,Input, InputNumber } from 'antd';
var i,NUMBER_OF_INPUTS,myElements
class Home extends Component {
  _createOnChangeFunction = (inputIndex) => {
    return () => {
      // The magic of closures helps you out here
      console.log(`INPUT ${inputIndex} CHANGED`);
    }
  }
  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value 
    });
  }
  render() {
    myElements = [];
    for(i = 0; i < NUMBER_OF_INPUTS; i++) {
      myElements.push(<input type='checkbox' value={i} onChange={this._createOnChangeFunction(i)} />);
    }
    return (       
      <Layout style={{ minHeight: '100vh' }}>        
         <h2>Test</h2>
         <div onChange={this.handleChange}
                          style={{ marginLeft: 240, marginTop: 50, width: 280 }}>
         <h2>Equation</h2><InputNumber size="large" name="NUMBER_OF_INPUTS" style={{ width: 300 }}></InputNumber>
         </div>
         <div>
        {myElements}
      </div>
        </Layout>
    );
  }
}

export default Home;







