import { renderComponent } from "./reactDom";
import { ReactVNode } from "./index";

type Props = {
  [k: string]: any;
};

export default class Component {
  state: {
    [k: string]: any;
  };
  props: Props;
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }
  setState(newState: Props) {
    this.state = { ...this.state, ...newState };
    renderComponent(this);
  }
  render: () => ReactVNode;
  element: Element;
  componentWillMount: () => void;
  componentWillReceiveProps: (props: Props) => void;
  componentWillUpdate: () => void;
}
