import { ReactVNode, Attrs } from "../react/index";

import Component from "../react/component";

export function render(vnode: ReactVNode, container: HTMLElement) {
  return container.append(_render(vnode));
}

function _render(vnode: ReactVNode) {
  if (!vnode) return;

  if (!(vnode instanceof Object)) {
    return vnode;
  } else if (typeof vnode.tag === "function") {
    const component = createComponent(vnode.tag, vnode.attrs);

    setComponentProps(component, vnode.attrs);

    return component.element;
  }

  const element = document.createElement(vnode.tag);

  vnode.attrs && handleAddAttrs(vnode, element);

  vnode.children.forEach((child) => {
    render(child, element);
  });

  return element;
}

function handleAddAttrs(vnode: ReactVNode, element: Element) {
  Object.keys(vnode.attrs).forEach((key) => {
    const value = vnode.attrs[key];
    if (key.slice(0, 2) === "on") {
      document.addEventListener(key.slice(2).toLocaleLowerCase(), function (e) {
        // 兼容性处理
        var event = e || window.event;
        var target = event.target || event.srcElement;
        // 判断是否匹配目标元素
        if (target === element) {
          value();
        }
      });
    } else {
      element.setAttribute(key, value);
    }
  });
}

function createComponent(component: (props: object) => void, props: Attrs) {
  let instance: Component;
  if (component.prototype && component.prototype.render) {
    instance = new component(props);
  } else {
    instance = new Component(props);

    instance.constructor = component.bind(instance);

    instance.render = function () {
      return this.constructor(props);
    };
  }

  return instance;
}

function setComponentProps(component: Component, props) {
  if (!component.element) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;

  renderComponent(component);
}

export function renderComponent(component: Component) {

  const renderer = component.render();

  if (component.element && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  let element = _render(renderer);

  if (component.element && component.element.parentNode) {
    component.element.parentNode.replaceChild(element, component.element);
  }

  component.element = element;
}

export default {
  render,
};
