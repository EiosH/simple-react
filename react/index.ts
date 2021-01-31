import ReactDom from "../reactDom/index";
import Component from "./component";

export type Tag = (props: object) => void;
export type ReactVNode = {
  tag: Tag | string;
  attrs: string[];
  children: ReactVNode[];
};

export type Attrs = string[];

export function createElement(
  tag: Tag,
  attrs: Attrs,
  ...children: ReactVNode[]
): ReactVNode {
  return {
    tag,
    attrs,
    children,
  };
}

export default { createElement, Component, ReactDom };
