import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js';

const container = document.getElementById('container');
const btn = document.getElementById('btn');
// var myVode1 = h('h1', {}, '文字')
var myVode1 = h('section', {}, [
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'Q'}, 'Q'),
    h('p', {key: 'C'}, 'C'),
    h('p', {key: 'D'}, 'D'),
    h('p', {key: 'E'}, 'E'),
]);
patch(container,myVode1)

// 创建新节点
const myVode2 = h('section', {}, [
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'Q'}, 'Q'),
    h('p', {key: 'E'}, 'E'),

    h('p', {key: 'F'}, 'F'),
    h('p', {key: 'G'}, 'G'),
]);

btn.onclick = function() {
    patch(myVode1,myVode2);
}
