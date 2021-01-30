import React from "./react";
import ReactDom from "./react/reactDom";

function Welcome(props) {
  return <h1>Welcome, {props.name}</h1>;
}

class WelcomeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString(), index: 100 };
  }
  componentWillMount() {
    setInterval(() => {
      this.setState({ time: new Date().toLocaleTimeString() });
    }, 1000);
  }
  onClick() {
    this.setState({
      index: this.state.index++,
    });
  }
  render() {
    return (
      <h1>
        HelloClass <span>{this.props.name}</span>
        <span> {this.state.time}</span>
        <button onClick={() => this.onClick()}>{this.state.index}</button>
        {this.props.children}
      </h1>
    );
  }
}

const app = (
  <div>
    <WelcomeClass name="ezio" children={<Welcome name="cracker" />} />
  </div>
);

ReactDom.render(app, document.getElementById("root"));
