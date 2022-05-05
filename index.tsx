import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useLayoutEffect
} from "./react/index";
import ReactDOM from "./reactDom/index";

function Welcome(props) {
  const [a, setA] = useState.call(this, 1);
  const [b, setB] = useState.call(this, 1);
  const [test, setTest] = useState.call(this, "HELLO");
  const [test1, setTest1] = useState.call(this, "HELLO");

  const memo = useMemo(() => {
    return a + b;
  }, [a]);

  const renderBigA = useCallback(() => {
    return a * 100;
  }, [a]);

  useEffect(() => {
    setA(b);

    return () => {
      console.log("b end");
    };
  }, [b]);

  useEffect(() => {
    setTest("PPPPP");
  }, []);

  useLayoutEffect(() => {
    setTest1("PPPPP");
  }, []);

  return (
    <h1>
      Welcome, {props.name}
      <h2>{test}</h2>
      <h2>{test1}</h2>
      <h2
        onclick={() => {
          setA(a + 1);
        }}
      >
        {a}
      </h2>
      <h2
        onclick={() => {
          setB(b => b + 1);
        }}
      >
        {b}
      </h2>
      <h2>memo {memo}</h2>
      <h2>callback {renderBigA()}</h2>
    </h1>
  );
}

class WelcomeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString(), index: 100 };
  }

  componentWillMount() {
    // setInterval(() => {
    //   this.setState({ time: new Date().toLocaleTimeString() });
    // }, 10000);
  }

  handleOnClick() {
    for (let i = 0; i < 10000; i++) {
      this.setState(state => {
        return {
          index: state.index + 1
        };
      });
    }
  }

  render() {
    return (
      <h1 class="sss">
        {/*HelloClass <span>{this.props.name}</span>*/}
        {/*<span>{this.state.time}</span>*/}
        {/*<br />*/}
        <button onClick={() => this.handleOnClick()}>{this.state.index}</button>
        {/*{this.props.children}*/}
      </h1>
    );
  }
}

const app = (
  <div>
    <WelcomeClass name="ezio" />
    {/*<WelcomeClass name="ezio" children={<Welcome name="cracker"/>}/>*/}
  </div>
);

ReactDOM.render(app, document.getElementById("root"));
