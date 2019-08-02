<template>
<div class="login" ref="cuiLogin">
	<div class="cui-login-box">
		<div class="cui-login-logo">
			<b>Cui</b>Admin
		</div>
		<div class="cui-login-box-body">
			<p class="cui-login-box-msg">请输入您的账号密码登录系统！</p>
			<Form ref="formLogin" :model="formLogin" label-position="top" :rules="ruleValidate">
				<FormItem label="" prop="username">
					<Input v-model="formLogin.username" placeholder="请输入用户名" icon="ios-person-outline"></Input>
				</FormItem>
				<FormItem label="" prop="password">
					<Input v-model="formLogin.password" placeholder="请输入密码" icon="ios-lock-outline"></Input>
				</FormItem>
				<FormItem>
					<Button type="primary" long @click="handleSubmit('formLogin')">登 录</Button>
				</FormItem>
			</Form>
		</div>
	</div>
	<canvas id="canvas" class="cui-login-background"></canvas>
</div>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			formLogin: {
				username: '',
				password: ''
			},
			ruleValidate: {
				username: [
					{ required: true, message: '请输入用户名！', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码！', trigger: 'blur' }
				]
			}
		}
	},
	created: function() {

	},
	mounted() {
		const that = this

		//定义画布宽高和生成点的个数
		var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight,
			POINT = 35

		var canvas = document.getElementById('canvas')
		canvas.width = WIDTH,
			canvas.height = HEIGHT
		var context = canvas.getContext('2d')
		context.strokeStyle = 'rgba(210,214,222,1)', context.strokeWidth = 1, context.fillStyle = 'rgba(210,214,222,1)'
		var circleArr = []

		//线条：开始xy坐标，结束xy坐标，线条透明度
		function Line(x, y, _x, _y, o) {
			this.beginX = x,
				this.beginY = y,
				this.closeX = _x,
				this.closeY = _y,
				this.o = o
		}
		//点：圆心xy坐标，半径，每帧移动xy的距离
		function Circle(x, y, r, moveX, moveY) {
			this.x = x,
				this.y = y,
				this.r = r,
				this.moveX = moveX,
				this.moveY = moveY
		}
		//生成max和min之间的随机数
		function num(max, _min) {
			var min = arguments[1] || 0;
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
		// 绘制原点
		function drawCricle(cxt, x, y, r, moveX, moveY) {
			var circle = new Circle(x, y, r, moveX, moveY)
			cxt.beginPath()
			cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
			cxt.closePath()
			cxt.fill()
			return circle
		}
		//绘制线条
		function drawLine(cxt, x, y, _x, _y, o) {
			var line = new Line(x, y, _x, _y, o)
			cxt.beginPath()
			cxt.strokeStyle = 'rgba(0,0,0,' + o + ')'
			cxt.moveTo(line.beginX, line.beginY)
			cxt.lineTo(line.closeX, line.closeY)
			cxt.closePath()
			cxt.stroke()

		}
		//初始化生成原点
		function init() {
			circleArr = [];
			for (var i = 0; i < POINT; i++) {
				circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10) / 40, num(10, -10) / 40))
			}
			draw()
		}

		//每帧绘制
		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height)
			for (var i = 0; i < POINT; i++) {
				drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r)
			}
			for (var i = 0; i < POINT; i++) {
				for (var j = 0; j < POINT; j++) {
					if (i + j < POINT) {
						var A = Math.abs(circleArr[i + j].x - circleArr[i].x),
							B = Math.abs(circleArr[i + j].y - circleArr[i].y)
						var lineLength = Math.sqrt(A * A + B * B)
						var C = 1 / lineLength * 7 - 0.009
						var lineOpacity = C > 0.03 ? 0.03 : C
						if (lineOpacity > 0) {
							drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity)
						}
					}
				}
			}
		}

		//调用执行
		window.onload = function() {
			init();
			setInterval(function() {
				for (var i = 0; i < POINT; i++) {
					var cir = circleArr[i]
					cir.x += cir.moveX
					cir.y += cir.moveY
					if (cir.x > WIDTH) cir.x = 0
					else if (cir.x < 0) cir.x = WIDTH
					if (cir.y > HEIGHT) cir.y = 0
					else if (cir.y < 0) cir.y = HEIGHT

				}
				draw()
			}, 16)
		}
	},
	methods: {
		// 点击提交表单
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			})
		}
		// onSubmit(event) {
		// 	let _this = this;
		// 	if (!_this.username || !_this.password) {
		// 		layer.msg('请输入账号或密码！', {time: 3000, icon:5});
		// 	} else {
		// 		let formData = {
		// 			username: _this.username,
		// 			password: _this.password
		// 		};
		// 		_this.$post(_this.$api.loginApi, formData).then((response) => {
		// 			if(response.code === 800) {
		// 				layer.msg(response.msg, {time: 3000, icon:5});
		// 			} else if(response.code === 0) {
		// 				// 数据保存
		// 				sessionStorage.setItem('login-token', JSON.stringify(response.data));
		// 				sessionStorage.setItem('username', _this.username);
		// 				_this.$store.commit('setToken', response.data.token);
		// 				_this.$store.commit('setLoginTime', response.data.time);
		// 				_this.$store.commit('setUsername', _this.username);
		// 				layer.msg(response.msg, function() {
		// 					_this.$router.push('/');
		// 				});
		// 			}
		// 		});
		// 	}
		// }
	}
}
</script>
