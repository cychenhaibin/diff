import patchVnode from "./patchVnode";
import createElement from "./createElement";
// 判断是否是同一个虚拟节点
function checkSameVnode(a, b) {
    if (!a || !b) return false;
    return a.sel && b.sel && a.sel == b.sel && a.key == b.key;
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
        console.log(0,oldStartVnode, newStartVnode);
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
        } else {
            // 都没有找到
            // 当没有找到匹配节点时，处理剩余的新节点
            if (newStartIdx <= newEndIdx) {
                const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
                for(let i = newStartIdx; i <= newEndIdx; i++){
                    // insertBefore方法可以自动识别null，如果null就会自动排到队尾去，和appendChild是一致了
                    // newCh[i]现在还没有真正的dom,所以要调用createElement()函数变为dom
                    parentElm.insertBefore(createElement(newCh[i]), before);
                }
                break; // 处理完剩余新节点后退出循环
            }

        }
    }
    // 处理剩余的旧节点，进行删除操作
    if (oldStartIdx <= oldEndIdx) {
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
            parentElm.removeChild(oldCh[i].elm);
        }
    }
}
