import  {React,ReactDom} from "./react";


function Welcome( props ) {
    return <h1>Hello, {props.name}</h1>;
}

class WelcomeClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: new Date().toLocaleTimeString()}
    }
    componentWillMount(){
        setInterval(()=>{
            this.setState({time: new Date().toLocaleTimeString()})
        },500)
    }
    render() {
        return <h1>HelloClass, <span>{this.props.age}</span> <span> {this.state.time}</span></h1>;
    }
}


const element = (
    <div className="ss">
        <Welcome name="you" />
        <WelcomeClass age="12"/>
        hello <span>world!  <strong>by  </strong> </span>
    </div>
);



ReactDom.render(element, document.getElementById("root"))


