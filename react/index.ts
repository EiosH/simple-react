import ReactDom ,{renderComponent} from "../reactDom/index";

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

const status = [];
let cur = 0;


export function useState (initialState ?: any){
  const that = this;
  const currentIndex = cur;

  function setState(newState){
    setTimeout(()=>{
      cur = 0;
      if(typeof newState === "function"){
        newState = newState(status[currentIndex])
      }
      status[currentIndex] = newState;
      renderComponent(that)
    })
  }

  const state = status[currentIndex] ?? initialState;
  status[currentIndex] = state
  cur += 1;
  return [state, setState]
}


export function useEffect (callback: ()=>void | (()=>void) , dep:any[]){
  const currentIndex = cur;
  const {dep: newDep , destroy: lastDestroy} = status[currentIndex] || {}

  let changed = false
  let init = !newDep

  newDep?.forEach((item,index)=>{
    if(item !== dep[index]){
      changed = true
      return;
    }
  })

  if(changed || init){
    lastDestroy?.()
    setTimeout(()=>{
      const destroy = callback()
      status[currentIndex] = {dep : [...dep] , destroy}
    })
  }

  cur++;
}


export function useLayoutEffect (callback: ()=>void | (()=>void) , dep:any[]){
  const currentIndex = cur;
  const {dep: newDep , destroy: lastDestroy} = status[currentIndex] || {}

  let changed = false
  let init = !newDep

  newDep?.forEach((item,index)=>{
    if(item !== dep[index]){
      changed = true
      return;
    }
  })


  if(changed || init){
    lastDestroy?.()
     Promise.resolve().then(()=>{
      const destroy = callback()
      status[currentIndex] = {dep : [...dep] , destroy}
    })
  }
  cur++;
}


export function  useMemo (callback: ()=> any , dep:any[]){
  const currentIndex = cur;

  const {dep: newDep , memo: lastMemo} = status[currentIndex] || {}
  let changed = false
  let init = !newDep

  newDep?.forEach((item,index)=>{
    if(item !== dep[index]){
      changed = true
      return;
    }
  })

  let memo = lastMemo;
  if(changed || init){
    memo = callback()
    status[currentIndex] = {memo ,dep }
  }
  cur++;
  return memo
}


export function  useCallback (callback: ()=> any , dep:any[]){
  const currentIndex = cur;

  const {dep: newDep , memo: lastMemo} = status[currentIndex] || {}
  let changed = false
  let init = !newDep

  newDep?.forEach((item,index)=>{
    if(item !== dep[index]){
      changed = true
      return;
    }
  })

  let memo = lastMemo;

  if(changed || init){
    memo = callback
    status[currentIndex] = {memo ,dep }
  }

  cur++;
  return memo
}



export default { createElement, Component, ReactDom };
