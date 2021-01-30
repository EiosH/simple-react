import { renderComponent } from "./reactDom";

export default class Component {
  constructor(props = {}) {
    this.state = {};
    this.props = props;
  }
  setState(stateChange) {
    Object.assign(this.state, stateChange);
    const vdom = this;

    renderComponent(this);
  }
}
