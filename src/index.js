import h from './mysnabbdom/h.js'
import patch from './mysnabbdom/patch.js';

const container = document.getElementById('container');
var myVode1 = h('h1', {}, '文字')

//btn.onclick = function() {
//    patch(container,myVode1)
//}
patch(container,myVode1)
