import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js';

const container = document.getElementById('container');
const btn = document.getElementById('btn');
// var myVode1 = h('h1', {}, '文字')
var myVode1 = h('section', {}, [
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'C'}, 'C')
]);
patch(container,myVode1)

// 创建新节点
const myVode2 = h('section', {}, [
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'M'}, 'M'),
    h('p', {key: 'N'}, 'N'),
    h('p', {key: 'C'}, 'C'),
    h('p', {key: 'P'}, 'P'),
    h('p', {key: 'Q'}, 'Q')
]);

btn.onclick = function() {
    patch(myVode1,myVode2);
}