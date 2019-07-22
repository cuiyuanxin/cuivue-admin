<template>
		<header class="main-header">
    		<a href="index2.html" class="logo">
				<span class="logo-mini"><b>A</b>LT</span>
				<span class="logo-lg"><b>Admin</b>LTE</span>
    		</a>
    		<nav class="navbar navbar-static-top">
      			<a href="javascript:void(0);" class="sidebar-toggle" data-toggle="push-menu" role="button"></a>

      			<div class="navbar-custom-menu">
        			<ul class="nav navbar-nav">
          				<li class="dropdown user user-menu">
            				<a href="#" class="dropdown-toggle" data-toggle="dropdown">
              					<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
              					<span class="hidden-xs">Alexander Pierce</span>
            				</a>
            				<ul class="dropdown-menu">
              					<li class="user-header">
                					<img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
									<p>
										Alexander Pierce - Web Developer
										<small>Member since Nov. 2012</small>
									</p>
              					</li>
              					<li class="user-footer">
                					<div class="pull-left">
                  						<a href="#" class="btn btn-default btn-flat">Profile</a>
                					</div>
                					<div class="pull-right">
                  						<a href="#" class="btn btn-default btn-flat">Sign out</a>
                					</div>
              					</li>
            				</ul>
          				</li>
            			<a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
        			</ul>
      			</div>
    		</nav>
  		</header>            
    </div>
</template>
<script>
	export default {
		name: 'Main',
		data () {
			return {
				isCollapsed: false
			}
		},
		beforeCreate: function(){
			// console.log(this)
			// this.$refs.cuiBody.classList.add(['skin-blue', 'sidebar-mini'])
		},
		created: function(){
			// console.log(this)
			// this.$refs.cuiBody.classList.add(['skin-blue', 'sidebar-mini'])
		},
		computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
		mounted(){
			var body = document.querySelector('body');
			body.classList.add('skin-purple', 'sidebar-mini')
		},
		methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            }
        }
	}
</script>