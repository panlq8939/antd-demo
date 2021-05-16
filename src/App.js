import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRouter } from './routes'
import { Frame } from './components'

const menus = adminRouter.filter(item => item.isNav)

function App() {
  return (
    <Frame menus={menus}>
      <Switch>
        {
          adminRouter.map(route => { // 页面级别的权限路由
            return (
              <Route
                exact
                key={route.pathname}
                path={route.pathname}
                render={(routeProps) => {
                  return <route.component {...routeProps} />
                }}
              />
            )
          })
        }
        <Redirect to={adminRouter[0].pathname} from='/admin' exact />
        <Redirect to='/404' />
      </Switch>
    </Frame>
  )
}

export default App;
