import {renderComponent} from "../reactDom/index";
import {ReactVNode} from "./index";

type Props = {
    [k: string]: any;
};

type State = {
    [k: string]: any;
};

export default class Component {
    state: State;
    props: Props;
    render: () => ReactVNode;
    componentWillMount: () => void;
    componentWillReceiveProps: (props: Props) => void;
    componentWillUpdate: () => void;
    renderFlag = false;

    flush() {
        this.renderFlag = true;
        setTimeout(() => {
            renderComponent(this);
            this.renderFlag = false
        })
    }

    setState(newState: (State) => State | State) {
        if (typeof newState === "function") {
            newState = newState(this.state)
        }
        this.state = {...this.state, ...newState};

        if (this.renderFlag === false) {
            this.flush();
        }
    }

    constructor(props = {}) {
        this.state = {} as State;
        this.props = props;
    }

    element: HTMLElement;
}
