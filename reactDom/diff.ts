// import { ReactVNode } from "../react/index";
// import { _render, render } from "./index";

// function diff(element: HTMLElement, vnode: ReactVNode) {
//   if (
//     //如果无 element 则新增，如果有且节点类型不同则替换
//     !element ||
//     element.nodeName.toLowerCase() !== vnode.tag.toString().toLowerCase()
//   ) {
//     const newElement = _render(vnode) as HTMLElement;

//     if (element) {
//       [...element.children].map(newElement.appendChild); // 将原来的子节点移到新节点下

//       if (element.parentNode) {
//         element.parentNode.replaceChild(newElement, element); // 移除掉原来的DOM对象
//       }
//     }

//     return newElement;
//   } else {
//     diffAttributes(element, vnode);

//     if (
//       (vnode.children && vnode.children.length > 0) ||
//       (element.childNodes && element.childNodes.length > 0)
//     ) {
//       diffChildren(element, vnode.children);
//     }
//   }

//   return element;
// }

// function diffAttributes(element: HTMLElement, vnode: ReactVNode) {
//   const old = element.getAttributeNames().reduce((t, c) => {
//     t[c] = element.getAttribute(c);
//     return t;
//   }, {}); // 当前DOM的属性

//   const attrs = vnode.attrs; // 虚拟DOM的属性

//   // 如果原来的属性不在新的属性当中，则将其移除
//   for (let name in old) {
//     if (!(name in attrs)) {
//       element.removeAttribute(name);
//     }
//   }

//   // 更新新的属性值
//   for (let name in attrs) {
//     if (old[name] !== attrs[name]) {
//       element.removeAttribute(name);
//     }
//   }
// }

// function diffChildren(dom, vchildren) {
//   const domChildren = dom.childNodes;
//   const children = [];

//   const keyed = {};

//   // 将有key的节点和没有key的节点分开
//   if (domChildren.length > 0) {
//     for (let i = 0; i < domChildren.length; i++) {
//       const child = domChildren[i];
//       const key = child.key;
//       if (key) {
//         keyed[key] = child;
//       } else {
//         children.push(child);
//       }
//     }
//   }

//   if (vchildren && vchildren.length > 0) {
//     let min = 0;
//     let childrenLen = children.length;

//     for (let i = 0; i < vchildren.length; i++) {
//       const vchild = vchildren[i];
//       const key = vchild.key;
//       let child;

//       // 如果有key，找到对应key值的节点
//       if (key) {
//         if (keyed[key]) {
//           child = keyed[key];
//           keyed[key] = undefined;
//         }

//         // 如果没有key，则优先找类型相同的节点
//       } else if (min < childrenLen) {
//         for (let j = min; j < childrenLen; j++) {
//           let c = children[j];

//           if (c && isSameNodeType(c, vchild)) {
//             child = c;
//             children[j] = undefined;

//             if (j === childrenLen - 1) childrenLen--;
//             if (j === min) min++;
//             break;
//           }
//         }
//       }

//       // 对比
//       child = diff(child, vchild);

//       // 更新DOM
//       const f = domChildren[i];
//       if (child && child !== dom && child !== f) {
//         // 如果更新前的对应位置为空，说明此节点是新增的
//         if (!f) {
//           dom.appendChild(child);
//           // 如果更新后的节点和更新前对应位置的下一个节点一样，说明当前位置的节点被移除了
//         } else if (child === f.nextSibling) {
//           removeNode(f);
//           // 将更新后的节点移动到正确的位置
//         } else {
//           // 注意insertBefore的用法，第一个参数是要插入的节点，第二个参数是已存在的节点
//           dom.insertBefore(child, f);
//         }
//       }
//     }
//   }
// }

// export default diff;
