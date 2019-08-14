<template>
<div class="header">
	<ul class="header-left">
		<li>
			<a @click="handleNavToggle" type="text" :class="['icon sider-nav-toggle', collapsed ? 'collapsed' : '']">
				<IconFont type="outdent" /></a>
		</li>
		<li>
			<router-link class="logo" to="/">cuivue-admin</router-link>
		</li>
	</ul>
	<ul class="header-right">
		<!-- 通知 -->
		<!-- <li>
				<a type="text" class="icon notification"><IconFont type="notification" /></a>
			</li> -->
		<!-- 消息 -->
		<!-- <li>
				<a type="text" class="icon message"><IconFont type="message" /></a>
			</li> -->
		<!-- 全屏 -->
		<li>
			<a type="text" class="icon fullscreen">
				<IconFont :type="fullscreen ? 'fullscreen' : 'fullscreen-exit'" @click.native="handleChange" /></a>
			<!-- <div v-if="showFullScreenBtn" class="full-screen-btn-con">
				<Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
					<Icon @click.native="handleChange" :type="value ? 'md-contract' : 'md-expand'" :size="23"></Icon>
				</Tooltip>
			</div> -->
		</li>
		<!-- 用户 -->
		<li>
			<a type="text" class="user">
				<Dropdown @on-click="handleClick" trigger="click" placement="bottom-end">
					<Avatar :src="userAvator" class="user-dropdown-avator" />
					<span class="user-text">{{userName}}</span>
					<DropdownMenu slot="list">
                        <DropdownItem name="nickname" disabled>
							{{userName}}
                        </DropdownItem>
						<DropdownItem name="profile" divided>
							<IconFont type="user" /> 个人中心
                        </DropdownItem>
						<DropdownItem name="password">
							<IconFont type="key" /> 修改密码
                        </DropdownItem>
						<DropdownItem name="setting">
							<IconFont type="setting" /> 个人设置
                        </DropdownItem>
						<DropdownItem name="logout" divided>
							<IconFont type="logout" /> 退出登录
                        </DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</a>
		</li>
		<!-- 快速设置 -->
		<!-- <li>
				<a type="text" class="icon setting" @click="handleControlToggle"><IconFont type="setting" /></a>
			</li> -->
	</ul>
</div>
</template>

<script>
import IconFont from '@/components/public/icon-font'
import { mapMutations, mapActions } from 'vuex'
export default {
	name: 'Header',
	components: {
		IconFont
	},
	data() {
		return {
			open: false,
            fullscreen: true
		}
	},
	computed: {

	},
	props: {
		collapsed: Boolean
	},
	methods: {
		...mapActions([
			// 'handleLogout'
		]),
		...mapMutations([
			// 'setControlOpen'
		]),
		handleNavToggle() {
			this.$emit('on-toggle', !this.collapsed)
		},
		handleClick(name) {
			// switch (name) {
			// 	case 'logout':
			// 	this.handleLogout().then(() => {
			// 		this.$router.push({
			// 		name: 'login'
			// 		})
			// 	})
			// 	break
			// }
		},
		handleControlToggle() {
			this.open = !this.open
			this.setControlOpen(this.open)
		},
		handleFullscreen() {
			let main = document.body
			if (!this.fullscreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen()
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen()
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen()
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen()
				}
                this.fullscreen = true
			} else {
				if (main.requestFullscreen) {
					main.requestFullscreen()
				} else if (main.mozRequestFullScreen) {
					main.mozRequestFullScreen()
				} else if (main.webkitRequestFullScreen) {
					main.webkitRequestFullScreen()
				} else if (main.msRequestFullscreen) {
					main.msRequestFullscreen()
				}
                this.fullscreen = false
			}
		},
		handleChange() {
			this.handleFullscreen()
		}
	},
	computed: {
		userAvator() {
			return this.$store.state.user.avatorImgPath
		},
		userName() {
			return this.$store.state.user.username
		}
	}
}
</script>
