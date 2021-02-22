function fontSize() {
    const view_width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    // const view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
    const _html = document.getElementsByTagName('html')[0];
    if (view_width > 768) {
        _html.style.fontSize = 100 * 768 / 375 + 'px'
    } else if (view_width < 375) {
        // _html.style.fontSize = 100 + 'px'
        _html.style.fontSize = 100 * view_width / 375 + 'px'
    } else {
        _html.style.fontSize = view_width * 100 / 375 + 'px';
    }
}
fontSize();
window.onresize = function() {
    fontSize();
}

// window.onload = function() { // 阻止双击放大 
//     var lastTouchEnd = 0;
//     document.addEventListener('touchstart', function(event) {
//         if (event.touches.length > 1) {
//             event.preventDefault();
//         }
//     });
//     document.addEventListener('touchend', function(event) {
//         var now = (new Date()).getTime();
//         if (now - lastTouchEnd <= 300) {
//             event.preventDefault();
//         }
//         lastTouchEnd = now;
//     }, false);
//     // 阻止双指放大 
//     document.addEventListener('gesturestart', function(event) {
//         event.preventDefault();
//     });
// }

// document.body.addEventListener('touchmove', function(e) {
//     e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
// }, {
//     passive: false
// });