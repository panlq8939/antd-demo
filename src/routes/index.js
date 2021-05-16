// 路由配置

// 导入组件
import {
    Dashboard,
    Login,
    ArticleList,
    ArticleEdit,
    Settings,
    NotFound
} from '../views'

export const mainRouter = [{ // 不需要登入就可访问的页面
    pathname: '/login',
    component: Login,
},{
    pathname: '/404',
    component: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: 'DashboardOutlined',
    isNav: true
},{
    pathname: '/admin/article',
    component: ArticleList,
    exect: true, //对于有相同部分的,短的路径,需要配置exect,否则无法匹配到
    title: '文章列表',
    icon: 'UnorderedListOutlined',
    isNav: true
},{
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    isNav: true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
}]