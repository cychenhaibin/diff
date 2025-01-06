import patchVnode from "./patchVnode";
import createElement from "./createElement";
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
    return a.sel == b.sel && a.key == b.key;
}

export default function updateChildren(parentElm, oldCh, newCh) {
    // 旧前
    let oldStartIdx = 0;
    // 新前
    let newStartIdx = 0;
    // 旧后
    let oldEndIdx = oldCh.length - 1;
    // 新后
    let newEndIdx = newCh.length - 1;
    // 旧前节点
    let oldStartVnode = oldCh[0];
    // 新前节点
    let newStartVnode = newCh[0];
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx];
    // 新后节点
    let newEndVnode = newCh[newEndIdx];

    // 开始while
    while(oldStartIdx <= newEndIdx && newStartIdx <= newEndIdx){
        console.log(0,oldStartVnode, newEndVnode);
        // 新前和旧前
        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            console.log('新前和旧前')
            patchVnode(oldStartVnode, newStartVnode);
            // 旧前和新前命中指针后移
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后和旧后
            console.log('新后和旧后')
            patchVnode(oldEndVnode, newEndVnode);
            // 新后和旧后命中指针前移
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后和旧前
            console.log('新后和旧前')
            patchVnode(oldStartVnode, newEndVnode);
            // 当③命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧后的后面
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            // 更新 oldStartVnode 和 newEndVnode 的指针
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前和旧后
            console.log('新前和旧后')
            patchVnode(oldEndVnode, newStartVnode);
            // 当④命中的时候，此时要移动节点，移动新前指向的这个节点到老节点的旧前的前面
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
    }
}