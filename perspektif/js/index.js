(function(){

    var gui = new dat.GUI();

    var wrapper = document.getElementById('wrapper');
    var container = document.getElementById('container');
    var ground = document.getElementById('ground');


    var containerStyle = container.style;
    var groundStyle = ground.style;
    var groundTransform;

    var winWidth;
    var winHeight;

    var tx = 0;
    var ty = 0;
    var mx = 0; // mouse x
    var my = 0; // mouse y

    var transformStyle = Modernizr.prefixed('transform');

    var config = {
        useWebkitMask: true,
        reset: function(){
            config.groundOffsetX = 50
            config.groundOffsetY = 30
            config.farTransparency = 0.7
            config.nearPercentage = 40
            config.useWebkitMask = true
        }
    }


    function init(){

        /* INITIALIZE STUFF HERE */
        groundTransform = new PerspectiveTransform(ground, 1200, 303);



        onWebkitMaskUpdate();
        window.onresize = onResize;
        onResize();
        render();
        window.onmousemove = onMouseMove;
    }

    function onMouseMove(e){
        tx = e.pageX / winWidth * 2 - 1;
        ty = e.pageY / winHeight * 2 - 1;
    }

    function onResize(){
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
    }

    function onWebkitMaskUpdate(){
        groundStyle.webkitMask = config.useWebkitMask ? '-webkit-linear-gradient(top,  rgba(0,0,0,' + config.farTransparency + ') 0%,rgba(0,0,0,1) ' + config.nearPercentage  +'%)' : 'none';
    }

    function render(){
        requestAnimationFrame(render);
        /* RENDER STUFF HERE */
        mx += (tx - mx) * .05;
        my += (ty - my) * .05;

        containerStyle[transformStyle] = 'perspective(500px) scale3d(2,2,1)rotateY(' + (mx * 8) + 'deg) rotateX(' + (-my * 7) + 'deg) translateZ(-500px) ';
        groundTransform.bottomLeft.x = (mx - 1) *  config.groundOffsetX;
        groundTransform.bottomLeft.y = 303 + my * config.groundOffsetY;
        groundTransform.bottomRight.x = 1200 + (mx + 1) * config.groundOffsetX;
        groundTransform.bottomRight.y = 303 + my * config.groundOffsetY;
        groundTransform.update();
    }





    return init;

}())();