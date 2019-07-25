<template>
    <div class="layout wrapper">
        <Header class="layout-header-bar main-header">
            <!-- <a href="index2.html" class="logo"> -->
                <!-- <span class="logo-mini"><b>A</b>LT</span> -->
                <!-- <span class="logo-lg"><b>Admin</b>LTE</span> -->
            <!-- </a> -->
            <Menu mode="horizontal" theme="dark">
                <!-- <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon> -->
                <!-- <a href="javascript:void(0);" class="sidebar-toggle" role="button">
                  
                </a> -->
                <div class="layout-logo logo">
                    <a href="index2.html">
                        <!-- <span class="logo-mini"><b>A</b>LT</span> -->
                        <span class="logo-lg"><b>Admin</b>LTE</span>
                    </a>
                </div>
                <div class="layout-nav navbar navbar-static-top">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="24" class="sidebar-toggle"></Icon>
                    <div class="navbar-custom-menu">
                        <div class="nav navbar-nav">
                            <Dropdown trigger="custom" :visible="visible" class="user user-menu">
                                <a href="javascript:void(0)" @click="handleOpen">
                                    <img src="../../../static/images/user2-160x160.jpg" class="user-image" alt="User Image">
                                    <span class="hidden-xs">Alexander Pierce</span>
                                </a>
                                <DropdownMenu slot="list">
                                    <p>常用于各种自定义下拉内容的场景。</p>
                                    <div style="text-align: right;margin:10px;">
                                        <Button type="primary" @click="handleClose">关闭</Button>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </Menu>
        </Header>
        <Layout>
            <Sider breakpoint="md" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>Option 1</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="ios-search"></Icon>
                        <span>Option 2</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-settings"></Icon>
                        <span>Option 3</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    Content
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<style scoped>
    
    /* .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    } */
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>

<script>
    export default {
        name: 'Main',
        data () {
            return {
                isCollapsed: false,
                visible: false
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
            },
            handleOpen () {
                this.visible = true;
            },
            handleClose () {
                this.visible = false;
            }
        }
    }
</script>