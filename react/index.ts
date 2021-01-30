import ReactDom from "./reactDom";
import Component from "./component";

export type Tag = (props: object) => void | string;
export type ReactVNode =
  | {
      tag: Tag;
      attrs: string[];
      children: ReactVNode[];
    }
  | Exclude<Object, object>;

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
