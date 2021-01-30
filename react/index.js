import ReactDom from "./reactDom";
import Component from "./component";

export function createElement(tag, attrs, ...children) {
  return {
    tag,
    attrs,
    children,
  };
}

export default { createElement, Component, ReactDom };
