function createElement(tag, attrs, ...children) {
    return {
        tag, attrs, children
    }
}

function render(vnode, domContainer) {

    if (!vnode || !domContainer) return
    if (typeof vnode === "string") {
        domContainer.append(vnode)
    }
    else {
        let dom;
        if(typeof vnode.tag === "function"){
            if(vnode.tag.prototype && vnode.tag.prototype.render){
                const  instance = new vnode.tag(Object.assign({},vnode.attrs))
                vnode = instance.render()
                instance.componentWillMount()
            }else {
                vnode = vnode.tag(Object.assign({},vnode.attrs))
            }
        }
         dom = document.createElement(vnode.tag)
        if (vnode.attrs) {
            Object.keys(vnode.attrs).forEach(key => {
                const value = vnode.attrs[key];
                dom.setAttribute(key, value);
            });
        }
        domContainer.appendChild(dom)

        vnode.children.forEach(child => {
            render(child, dom)
        })
    }
}

class Component {
    constructor( props = {} ) {
        this.state = {};
        this.props = props;
    }
    setState( stateChange ) {
        // 将修改合并到state

        Object.assign( this.state, stateChange );
        const  vdom = this
        console.log(vdom)
        // vdom.children.forEach(child => {
        //     ReactDom.render(child, document.createElement(vdom.tag))
        // })
    }
}



export const React = {
    createElement,
    Component
}

export const ReactDom = {
    render(node, container){
        container.innerHTML = '';
        render(node, container)
    },
    reRender(){
        ReactDom.render()
    }
}