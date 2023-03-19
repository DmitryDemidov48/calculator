import store from "./store";
import React from "react";
import './App.css'
class App  extends React.Component {
  constructor() {
    super()
      this.state = {
        out: '0'
      }
      this.refOutput = React.createRef()
  }

    tapeNumber(value) {
      let currentValue = value
        let output = this.refOutput.current

        this.setState({
            out:currentValue
        })
        if (output.value === '0') {output.value = ''}
        output.value += currentValue
    }

    tapeOperation(value) {
        let output = this.refOutput.current

        if (value === 'CE') {
            output.value.length === 1 ? output.value = '0':
            output.value = output.value.substring(0, output.value.length - 1)
        }
        else if (value === 'C') {output.value = '0'}
        else if (value === '=') {
            try {
                output.value = eval(output.value)
            } catch {
                output.value = 'error'
                setTimeout(() =>{
                    output.value = '0'
                },1500)
            }
        }
    }
  render() {
    return (
        <div className="container">
          <div className="output">
            <input ref={this.refOutput} defaultValue={this.state.out}/>
          </div>
          <div className="buttons">
              {store.buttons.map((item, index) => <button
                  key={index}
                  onClick={() =>{this.tapeNumber(item.val)}}
              >{item.val}
              </button>)}
              {store.operation.map((item,index) => <button
                  key={index}
                  onClick={() =>{this.tapeOperation(item.val)}}
              >{item.val}
              </button>)}
          </div>
        </div>
    )
  }
}

export default App;
