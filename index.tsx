import React from "./react/index";
import ReactDOM from "./reactDom/index";

function Welcome(props) {
    return <h1>Welcome, {props.name}</h1>;
}

class WelcomeClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: new Date().toLocaleTimeString(), index: 100};
    }

    componentWillMount() {
        // setInterval(() => {
        //   this.setState({ time: new Date().toLocaleTimeString() });
        // }, 10000);
    }

    handleOnClick() {
        for (let i = 0; i < 10000; i++) {
            this.setState((state => {
                return {
                    index: state.index + 1
                }
            }));
        }

    }

    render() {
        return (
            <h1 class="sss">
                HelloClass <span>{this.props.name}</span>
                <span> {this.state.time}</span>
                <br/>
                <button onClick={() => this.handleOnClick()}>{this.state.index}</button>
                {this.props.children}
            </h1>
        );
    }
}

const app = (
    <div>
        <WelcomeClass name="ezio" children={<Welcome name="cracker"/>}/>
    </div>
);

ReactDOM.render(app, document.getElementById("root"));
