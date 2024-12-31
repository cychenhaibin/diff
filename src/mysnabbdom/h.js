import vnode from "./vnode";

// 编写一个低配版本的h函数，这个函数必须接受三个参数，缺一不可
// 相当于他的重载功能较弱
// 调用的时候必须是下面的三种之一：
// h('div', {}, '文字')
// h('div', {}, [])
// h('div', {}, h())
export default function(sel, data, c){
    // 检查参数个数
    if(arguments.length != 3){
        throw new Error('h函数必须是三个参数')
    }
    // 检查参数c的类型
    if(typeof c == 'string' || typeof c == 'number'){
        // 现在调用的是h函数形态1
        return vnode(sel, data, undefined, c, undefined)
    }else if(Array.isArray(c)) {
        // 现在调用的是h函数形态2
        let children = [];
        for(let i = 0;i < c.length;i++){
            // 检查c[i]必须是一个对象，如果不满足
            if(!(typeof c[i] == 'object' && c.hasOwnProperty('sel'))) {
                console.log(!(typeof c[i] == 'object' && c.hasOwnProperty('sel')))
                console.log(c)
            }
                // throw new Error('传入的数组中有项不是h函数')
            // 这里不用执行c[i]，因为你的测试语句中已经有了执行
            // 此时只需要收集就可以了
            children.push(c[i])
        }
        // 循环结束了，就说明children收集完毕了，此时可以返回虚拟节点了
        return vnode(sel, data, children, undefined, undefined)
    }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
        // 现在调用的是h函数形态3
        // 传入的c是唯一的children
        let children = [c]
    }else{
        throw new Error('传入的类型不对')
    }
}