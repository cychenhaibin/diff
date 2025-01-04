import createElement from "./createElement";
export default function patchVnode(oldVnode, newVnode) {
    // 判断新旧vnode是否同一个对象（内存中）
    if (oldVnode === newVnode) return;
    // 判断新vnode有没有text属性
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
        console.log('新Vnode有text属性')
        if (newVnode.text == oldVnode.text) {
            return;
        } else {
            // 如果新虚拟节点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的elm中即可.如果老的elm中是children,也会消失掉
            oldVnode.elm.innerText = newVnode.text;
        }
    } else {
        console.log('新Vnode没有text属性')
        // 判断老的有没有children
        if (oldVnode.children != undefined && oldVnode.children.length > 0){
            // 老的有children,此时是最复杂的情况。新老都有children
            // 所有未处理的节点的开头
            let un = 0;
            for (let i = 0; i < newVnode.children.length; i++) {
                let ch = newVnode.children[i];
                // 再次遍历，看看oldVnode中有没有节点和他是same的
                let isExist = false;
                for (let j = 0; j < oldVnode.children.length; j++) {
                    if (oldVnode.children[j].sel == ch.sel && ch.sel && oldVnode.children[j].key == ch.key) {
                        isExist = true;
                    }
                }
                if (!isExist) {
                    console.log(ch);
                    let dom = createElement(ch);
                    ch.elm = dom;
                    if (un < oldVnode.children.length) {
                        oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm);
                    } else {
                        oldVnode.elm.appendChild(dom);
                    }
                } else {
                    // 让处理的节点指针下移
                    un++;
                }
            }
        } else {
            // 老的没有children,新的有
            // 清空老的节点的内容
            oldVnode.elm.innerHTML = '';
            // 遍历新的vnode子节点，创建DOM上树
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom);
            }
        }
    }
}