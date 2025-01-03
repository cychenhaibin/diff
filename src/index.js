import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js';

const container = document.getElementById('container');
const btn = document.getElementById('btn');
// var myVode1 = h('h1', {}, '文字')
var myVode1 = h('section', {}, '文字');
patch(container,myVode1)

// 创建新节点
const myVode2 = h('section', {}, [
    h('p', {}, 'A'),
    h('p', {}, 'B'),
    h('p', {}, 'C')
])

btn.onclick = function() {
    patch(myVode1,myVode2);
}