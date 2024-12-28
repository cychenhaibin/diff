import vnode from './vnode.js';
import createElement from "./createElement";
export default function(oldVnode, newVnode) {
    // 判断传入的第一个参数，是DOM节点还是虚拟节点？
    // 判断是否有选择器
    if(oldVnode.sel == '' || oldVnode.sel == undefined){
        // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }

    // 判断oldVnode和newVnode是不是同一个节点
    // 判断key和选择器是否是同一个
    if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel){

    } else {
        createElement(newVnode, oldVnode.elm);
    }
};
