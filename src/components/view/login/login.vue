<template>
<div class="login" ref="cuiLogin">
	<div class="cui-login-box">
		<div class="cui-login-logo">
			<b>Cui</b>Admin
		</div>
		<div class="cui-login-box-body">
			<p class="cui-login-box-msg">请输入您的账号密码登录系统！</p>
			<Form ref="formLogin" :model="formLogin" label-position="top" :rules="ruleValidate" @keyup.enter.native="handleSubmit('formLogin')">
				<FormItem label="" prop="username">
					<Input type="text" v-model="formLogin.username" placeholder="请输入用户名" icon="ios-person-outline"></Input>
				</FormItem>
				<FormItem label="" prop="password">
					<Input type="password" v-model="formLogin.password" placeholder="请输入密码" icon="ios-lock-outline"></Input>
				</FormItem>
				<FormItem>
					<img :src="formLogin.verifyImg" alt="验证码" class="cui-verify-img" v-on:click="refreshVerify" title="点击获取">
				</FormItem>
				<FormItem label="" prop="verify">
					<Input type="text" v-model="formLogin.verify" placeholder="请输入验证码" icon="ios-code" ></Input>
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
import { TITLE } from '@/config/config' // 导入公共变量
import { mapMutations, mapActions } from 'vuex'
import { getVerify, login } from '@/api/login'
export default {
	name: 'login',
	data() {
		const validateUserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名！'))
            } else {
				login(value, this.formLogin.password, this.formLogin.verify).then((res) => {
					if(res.code == 10 && res.data.username) {
						callback(new Error(res.data.username))
					} else {
						callback()
					}
				})
            }
        }
		const validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码！'))
            } else {
				login(this.formLogin.username, value, this.formLogin.verify).then((res) => {
					if(res.code == 10 && res.data.password) {
						callback(new Error(res.data.password))
					} else {
						callback()
					}
				})
            }
        }
		const validateVerify = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码！'))
            } else {
				login(this.formLogin.username, this.formLogin.password, value).then((res) => {
					if(res.code == 10 && res.data.verify) {
						callback(new Error(res.data.verify))
						this.refreshVerify()
					} else {
						callback()
					}
				})
            }
        }
		return {
			formLogin: {
				username: '',
				password: '',
				verify: '',
				verifyImg: getVerify
			},
			ruleValidate: {
				username: [
					{ required: true, message: '请输入用户名！', trigger: 'blur' },
					{ min: 6, message: '用户名最短6个字符！', trigger: 'blur' },
					{ pattern: /^[A-Za-z0-9_-]+$/, message: '用户名只支持大小写英文字母,数字,下划线和破折号！', trigger: 'blur' },
					{ max: 20, message: '用户名最长20个字符！', trigger: 'blur' },
					{ validator: validateUserName, trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码！', trigger: 'blur' },
					{ min: 6, message: '密码最短6个字符！', trigger: 'blur' },
					{ pattern: /^[A-Za-z0-9_@!~-]+$/, message: '密码只支持大小写英文字母,数字和特殊符号(_@!~-)！', trigger: 'blur' },
					{ max: 25, message: '密码最长25个字符！', trigger: 'blur' },
					{ validator: validatePassword, trigger: 'blur' }
				],
				verify: [
					{ required: true, message: '请输入验证码！', trigger: 'blur' },
					{ length: 6, message: '请输入6个字符的验证码！', trigger: 'blur' },
					{ pattern: /^[A-Za-z0-9]+$/, message: '验证码只支持英文字母,数字！', trigger: 'blur' },
					{ validator: validateVerify, trigger: 'blur' }
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
		// 刷新验证码
		refreshVerify: function() {
			this.formLogin.verifyImg = getVerify
			if(this.formLogin.verify) {
				this.formLogin.verify = ''
			}
		},
		// 点击提交表单
		handleSubmit(name) {
			const that = this
			that.$refs[name].validate((valid) => {
				if (valid) {
					login(that.formLogin.username, that.formLogin.password, that.formLogin.verify).then((res) => {
						console.log(res)
					})
				}
			})
		}
	}
}
</script>
