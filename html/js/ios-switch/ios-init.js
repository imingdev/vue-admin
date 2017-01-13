
var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

elems.forEach(function(html) {
    var switchery = new Switchery(html);

});

// Colored switches
var blue = document.querySelector('.js-switch-blue');
var switchery = new Switchery(blue, { color: '#41b7f1' });

var pink = document.querySelector('.js-switch-pink');
var switchery = new Switchery(pink, { color: '#ff7791' });

var teal = document.querySelector('.js-switch-teal');
var switchery = new Switchery(teal, { color: '#3cc8ad' });

var red = document.querySelector('.js-switch-red');
var switchery = new Switchery(red, { color: '#db5554' });

var yellow = document.querySelector('.js-switch-yellow');
var switchery = new Switchery(yellow, { color: '#fec200' });

