import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRouter } from './routes'

function App() {
  return (
    <div className="App">
      <div>这里是公共部分</div>
      <Switch>
        {
          adminRouter.map(route =>{ // 页面级别的权限路由
            return (
              <Route 
                exact 
                key={route.pathname} 
                path={route.pathname} 
                render={(routeProps) => {
                  return <route.component {...routeProps}/>
                }} 
              />
            )
          })
        }
        <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
        <Redirect to='/404' />        
      </Switch>
    </div>
  )
}

export default App;
