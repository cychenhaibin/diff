// 真正创建节点
// 将vNode创建为DOM,插入到pivot这个元素之前
export default function(vnode, pivet) {
    // 目的是把虚拟节点Vnode插入到标杆pivot前
    // 创建一个DOM节点，这个节点现在还是孤儿节点
    let domNode = document.createElement(vnode.sel);
    // 有子节点还是文本
    if(vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
        // 它内部是文字
        domNode.innerText = vnode.text;
        // 将孤儿节点上树，让标杆节点的父元素调用insertBefore方法，将新的孤儿节点插入
        pivet.parentNode.insertBefore(domNode, pivet);
    }
};
