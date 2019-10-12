<template>
<Card>
	<div class="search-bar">
		<Row>
			<Col :md="6">
			<ButtonGroup size="small">
				<Button type="info" icon="md-add" @click="create">添加</Button>
				<!-- <Button type="error">删除</Button> -->
			</ButtonGroup>
			</Col>
			<!-- <Col :md="6">Col</Col>
            <Col :md="12">Col</Col> -->
		</Row>
		<!-- <div class="left">
			<Input clearable placeholder="用户名" class="search-input" v-model="searchData.usreName" />
			<Input clearable placeholder="邮箱" class="search-input" v-model="searchData.email" />
			<ButtonGroup class="ml5">
				<Button type="primary" icon="md-search" @click="search">查询</Button>
				<Button icon="md-close" @click="clear">清空</Button>
			</ButtonGroup>
		</div>
		<div class="right">
			<ButtonGroup class="mr5">
				<Button type="primary" icon="md-add" @click="add">新增</Button>
				<Button type="error" icon="md-close" @click="batchDel">删除</Button>
			</ButtonGroup>
		</div> -->
	</div>
	<Table border :columns="columns" :data="data" size="small"></Table>

	<Modal title="添加用户" v-model="modal" :closable="false" :mask-closable="false">
		<Form ref="userForm" :model="formData" :rules="userRules" label-position="top">
			<FormItem label="用户名" prop="username">
				<Input type="text" v-model="formData.username" />
			</FormItem>
			<FormItem label="密码" prop="password">
				<Input :type="passType" v-model="formData.password" :icon="passClass" @on-click="passShow"/>
			</FormItem>
			<FormItem label="手机号码" prop="mobile">
				<Input type="text" v-model="formData.mobile" />
			</FormItem>
			<FormItem label="邮箱" prop="email">
				<Input type="text" v-model="formData.email" />
			</FormItem>
			<FormItem label="真实姓名" prop="realname">
				<Input type="text" v-model="formData.realname" />
			</FormItem>
			<FormItem label="昵称" prop="nickname">
				<Input type="text" v-model="formData.nickname" />
			</FormItem>
			<FormItem label="状态">
				<RadioGroup v-model="formData.status">
					<Radio label="1">启用</Radio>
					<Radio label="0">禁用</Radio>
					<Radio label="2">锁定</Radio>
				</RadioGroup>
			</FormItem>
		</Form>
		<div slot="footer">
			<Button @click="cancel('userForm')">取消</Button>
			<Button type="primary" @click="save('userForm')">保存</Button>
		</div>
	</Modal>
</Card>
</template>

<script>
// import moment from 'moment'
// import IconFont from '@/components/public/icon-font'
import { mapActions } from 'vuex'
// import { getUsers } from '@/api/user'
export default {
	name: 'User',
	data() {
		return {
			columns: [
				{ type: 'selection', width: 60, align: 'center' },
				{ title: '编号', width: 70, key: 'id' },
				{ title: '用户名', width: 100, key: 'username' },
				{ title: '昵称', width: 100, key: 'nickname' },
				{ title: '真实姓名', width: 100, key: 'realname' },
				{
					title: '性别',
					width: 70,
					key: 'sex',
					align: 'center',
					render: (h, params) => {
						const row = params.row
						const color = row.sex === 1 ? 'green' : 'blue'
						const text = row.sex === 1 ? '男' : '女'
						return h('Tag', {
							props: { color: color }
						}, text)
					}
				},
				{
					title: '出生日期',
					width: 100,
					key: 'birthday',
					align: 'center',
					render: (h, params) => {
						return h('div', moment().format('YYYY-MM-DD'))
					}
				},
				{ title: '邮箱', width: 200, key: 'email' },
				{ title: '备注', key: 'remark' },
				{
					title: '操作',
					key: 'action',
					fixed: 'right',
					width: 110,
					render: (h, params) => {
						var that = this
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									icon: 'md-checkbox-outline',
									size: 'small'
								},
								style: {
									fontSize: '14px',
									marginRight: '5px'
								},
								on: {
									click() {
										that.edit(params.row)
									}
								}
							}, ''),
							h('Button', {
								props: {
									type: 'error',
									icon: 'md-trash',
									size: 'small'
								},
								style: {
									fontSize: '14px'
								},
								on: {
									click() {
										that.del(params.row)
									}
								}
							}, '')
						])
					}
				}
			],
			data: [],
			searchData: {
				usreName: '',
				email: ''
			},
			modal: false,
			selectRows: [],
			// 密码显示/关闭
			passType: 'password',//icon-xiaoyanjing-zheng
			passClass: 'iconfont icon-xiaoyanjing-bi',
			formData: {
				id: 0,
				username: '',
				password: '',
				mobile: '',
				email: '',
				realname: '',
				nickname: '',
				status: '1'
			},
			userRules: {
				username: [
					{ required: true, message: '请输入用户名！', trigger: 'blur' },
					{ min: 6, message: '用户名最短6个字符！', trigger: 'blur' },
					{ pattern: /^[A-Za-z0-9_-]+$/, message: '用户名只支持大小写英文字母,数字,下划线和破折号！', trigger: 'blur' },
					{ max: 20, message: '用户名最长20个字符！', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码！', trigger: 'blur' },
					{ min: 6, message: '密码最短6个字符！', trigger: 'blur' },
					{ pattern: /^[A-Za-z0-9_@!~-]+$/, message: '密码只支持大小写英文字母,数字和特殊符号(_@!~-)！', trigger: 'blur' },
					{ max: 25, message: '密码最长25个字符！', trigger: 'blur' }
				],
				mobile: [
					{ required: true, message: '请输入手机号码！', trigger: 'blur' },
					{ length: 11, message: '请输入11位手机号码！', trigger: 'blur' },
					{ pattern: /^1[3-9][0-9]\d{8}$/, message: '手机号格式不正确！', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮箱地址！', trigger: 'blur' },
					{ pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '邮箱格式不正确！', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		...mapActions([
			'handleSave'
		]),
		getTableData() {
			var that = this
			getUsers(1, '', '').then(res => {
				that.data = res.data
			})
		},
		search() {
			this.getTableData()
		},
		clear() {
			this.searchData.usreName = ''
			this.searchData.email = ''
			this.getTableData()
		},
		create() {
			this.modal = true
		},
		edit(user) {
			this.modal = true
			this.formData.userId = user.userId
			this.formData.userName = user.userName
			this.formData.realName = user.realName
			this.formData.sex = user.sex.toString()
			this.formData.birthday = user.birthday
			this.formData.email = user.email
			this.formData.remark = user.remark
		},
		del(user) {
			this.$Modal.confirm({
				title: '系统提示',
				content: '确定要删除【' + user.userName + '】？',
				onOk: () => {}
			})
		},
		batchDel() {
			if (this.selectRows.length === 0) {
				this.$Message.warning('请选择要删除的记录')
				return
			}
			this.$Modal.confirm({
				title: '系统提示',
				content: '确定要删除选择的记录？',
				onOk: () => {}
			})
		},
		// 清空表单字段
		reset(name) {
			this.$refs[name].resetFields()
			this.formData.id = 0
			this.formData.username = ''
			this.formData.password = ''
			this.formData.mobile = ''
			this.formData.email = ''
			this.formData.realname = ''
			this.formData.nickname = ''
			this.formData.status = '1'
		},
		// 取消表单
		cancel(name) {
			// 关闭模态窗口
			this.modal = false
			// 清空表单字段
			this.reset(name)
		},
		// 提交表单
		save(name) {
			const that = this

			that.$refs[name].validate((valid) => {
				if (valid) {
					const formData = that.formData

					that.handleSave(formData).then(res => {
						// that.getUserInfo().then(res => {
						// 	this.$router.push({
						// 		name: HOME_PAGE_NAME
						// 	})
						// })
					})
					// that.reset(name)
					// that.modal = false
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		passShow() {
			this.passType = this.passType === 'password' ? 'text' : 'password'
			this.passClass = this.passType === 'password' ? 'iconfont icon-xiaoyanjing-bi' : 'iconfont icon-xiaoyanjing-zheng'
		}
	},
	mounted() {
		// this.getTableData()
	}
}
</script>
