// 函数的功能很简单，就是把传入的5个参数组合成对象返回
export default function(sel, data, children, text, elm){
    const key = data.key;
    return {
        sel: sel, 
        data: data, 
        children: children, 
        text: text, 
        elm: elm,
        key: key
    }
}