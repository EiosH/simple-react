import Component from "./component";

export function render(vnode, container) {
  return container.append(_render(vnode));
}

function _render(vnode) {
  if (!vnode) return;

  if (!(vnode instanceof Object)) {
    return vnode;
  } else if (typeof vnode.tag === "function") {
    const component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.element;
  }

  const element = document.createElement(vnode.tag);

  vnode.attrs && addAttrs(vnode, element);

  vnode.children.forEach((child) => {
    render(child, element);
  });

  return element;
}

function addAttrs(vnode, element) {
  Object.keys(vnode.attrs).forEach((key) => {
    const value = vnode.attrs[key];
    element.setAttribute(key, value);
  });
}

function createComponent(component, props) {
  let instance;
  if (component.prototype && component.prototype.render) {
    instance = new component(props);
  } else {
    instance = new Component(props);
    instance.constructor = component;
    instance.render = function () {
      return this.constructor(props);
    };
  }

  return instance;
}

function setComponentProps(component, props) {
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;

  renderComponent(component);
}

export function renderComponent(component) {
  let element;

  const renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  element = _render(renderer);

  if (component.element && component.element.parentNode) {
    component.element.parentNode.replaceChild(element, component.element);
  }

  component.element = element;
  element._component = component;
}

export default {
  render,
};
