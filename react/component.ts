import { renderComponent } from "../reactDom/index";
import { ReactVNode } from "./index";

type Props = {
  [k: string]: any;
};

export default class Component {
  state: {
    [k: string]: any;
  };
  props: Props;
  render: () => ReactVNode;
  componentWillMount: () => void;
  componentWillReceiveProps: (props: Props) => void;
  componentWillUpdate: () => void;
  setState(newState: Props) {
    this.state = { ...this.state, ...newState };
    renderComponent(this);
  }
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }

  element: HTMLElement;
}
