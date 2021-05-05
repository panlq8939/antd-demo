// 组件统一导出

// import Dashboard from './Dashboard'
// import Login from './Login'
// import ArticleList from './Article'
// import ArticleEdit from './Article/edit.js'
// import Settings from './Settings'
// import NotFound from './NotFound'

import Loadable from 'react-loadable';
import Loading from '../components/loading'

const Dashboard = Loadable({
    loader: ()=> import ('./Dashboard'),
    loading: Loading
})

const Login = Loadable({
    loader: ()=> import ('./Login'),
    loading: Loading
})

const ArticleList = Loadable({
    loader: ()=> import ('./Article'),
    loading: Loading
})

const ArticleEdit = Loadable({
    loader: ()=> import ('./Article/edit.js'),
    loading: Loading
})

const Settings = Loadable({
    loader: ()=> import ('./Settings'),
    loading: Loading
})

const NotFound = Loadable({
    loader: ()=> import ('./NotFound'),
    loading: Loading
})

export{
    Dashboard,
    Login,
    ArticleList,
    ArticleEdit,
    Settings,
    NotFound
}