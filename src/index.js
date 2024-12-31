import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js';

const container = document.getElementById('container');
// var myVode1 = h('h1', {}, '文字')
var myVode1 = h('ul', {}, [
    h('li', {}, [
        h('ol', {}, [
            h('li', {}, 'A'),
            h('li', {}, 'B'),
            h('li', {}, 'C')
        ])
    ]),
    h('li', {}, 'B'),
    h('li', {}, 'C')
]);
//btn.onclick = function() {
//    patch(container,myVode1)
//}
patch(container,myVode1)
