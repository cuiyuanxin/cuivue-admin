<template>
	<div>
    	1223454354
  	</div>
</template>

<script>
	export default {
		name: 'login',
		data () {
			return {

			}
		},
		mounted () {
			//
		}
	}
</script>


<template>
    <div class="login">
        <div class="login-box">
            <div class="login-logo">
                <b>雅思</b>能力测评小程序
            </div>
            <div class="login-box-body">
                <p class="login-box-msg">请输入您的账号密码登录系统！</p>
                <form method="post" id="cuiForm" ref="cuiForm" @submit.prevent="onSubmit">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control" name="username" v-model.trim="username" placeholder="请输入用户名" v-focus data-vv-as="用户名" data-vv-delay="500">
                        <span class="fa fa-user form-control-feedback"></span>
                    </div>
                    <div class="form-group has-feedback">
                        <input type="password" class="form-control" name="password" v-model.trim="password" placeholder="请输入密码" data-vv-as="密码" data-vv-delay="500">
                        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <button type="submit" class="btn btn-primary cui_btn">登 录</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                username: '',
                password: ''
            }
        },
        created: function () {
            $('body').addClass('login-page');
        },
        mounted: function () {
            var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
            var container;
            var camera, scene, renderer;
            var particles, particle, count = 0;
            var mouseX = 0, mouseY = -350;
            var windowHalfX = window.innerWidth / 2;
            var windowHalfY = window.innerHeight / 2;
            init();
            animate();

            function init() {
                container = document.createElement( 'div' );
                container.setAttribute('style', 'position: absolute;top: 30px;z-index: -1;');

                $('.login').append( container );

                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 1000;
                scene = new THREE.Scene();
                particles = new Array();

                var PI2 = Math.PI * 2;
                var material = new THREE.ParticleCanvasMaterial( {
                    color: 0xc4c4c4,
                    program: function ( context ) {
                        context.beginPath();
                        context.arc( 0, 0, 1, 0, PI2, true );
                        context.fill();
                    }

                });

                var i = 0;
                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
                    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                        particle = particles[ i ++ ] = new THREE.Particle( material );
                        particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                        particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                        scene.add( particle );
                    }
                }

                renderer = new THREE.CanvasRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );

                container.appendChild( renderer.domElement );

                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

                window.addEventListener( 'resize', onWindowResize, false );
            }

            function onWindowResize() {
                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            function onDocumentMouseMove( event ) {
                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;
            }

            function onDocumentTouchStart( event ) {
                if ( event.touches.length === 1 ) {
                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            }

            function onDocumentTouchMove( event ) {
                if ( event.touches.length === 1 ) {
                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;
                }
            }

            function animate() {
                requestAnimationFrame( animate );
                render();
            }

            function render() {
                camera.position.x += ( mouseX - camera.position.x ) * .05;
                camera.position.y += ( - mouseY - camera.position.y ) * .05;
                camera.lookAt( scene.position );
                var i = 0;
                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
                    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                        particle = particles[ i++ ];
                        particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                        particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
                    }
                }
                renderer.render( scene, camera );
                count += 0.1;
            }
        },
        methods: {
            // 点击提交表单
            onSubmit(event) {
                let _this = this;
                if (!_this.username || !_this.password) {
                    layer.msg('请输入账号或密码！', {time: 3000, icon:5});
                } else {
                    let formData = {
                        username: _this.username,
                        password: _this.password
                    };
                    _this.$post(_this.$api.loginApi, formData).then((response) => {
                        if(response.code === 800) {
                            layer.msg(response.msg, {time: 3000, icon:5});
                        } else if(response.code === 0) {
                            // 数据保存
                            sessionStorage.setItem('login-token', JSON.stringify(response.data));
                            sessionStorage.setItem('username', _this.username);
                            _this.$store.commit('setToken', response.data.token);
                            _this.$store.commit('setLoginTime', response.data.time);
                            _this.$store.commit('setUsername', _this.username);
                            layer.msg(response.msg, function() {
                                _this.$router.push('/');
                            });
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    

</style>

