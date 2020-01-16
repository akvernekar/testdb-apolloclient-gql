import React from 'react';
import CompanyList from './components/Company/CompanyList'
import CompanyAdd from './components/Company/CompanyAdd'
import DepartmentList from './components/Department/DepartmentList'
import DepartmentAdd from './components/Department/DepartmentAdd'
import TeamList from './components/Team/TeamList'
import TeamAdd from './components/Team/TeamAdd'
import UserList from './components/User/UserList'
import UserAdd from './components/User/UserAdd'
import UserEdit from './components/User/UserEdit'
import Register from './components/Register'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import {Link,Route,BrowserRouter} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'

export const client =new ApolloClient({
  uri:'http://localhost:4010/graphql',
  onError: (e) => { console.log('hgh',e) }
})


function App() {
  return (
    <div >
      <ApolloProvider client={client}>
      <BrowserRouter>
      {localStorage.getItem('user3')!==null &&
      <>
      <Link to="/company">Companys</Link> |
      <Link to="/department">Departments</Link> |
      <Link to="/team">Teams</Link> |
      <Link to="/user">Users</Link>  |
      <Link  to='/' onClick={()=>{localStorage.removeItem('user3')
window.location.href='/'}}>Logout</Link>
      
      </>
  }

<Route path="/register" component={Register} exact />
      <Route path="/" component={Login} exact/>

      <PrivateRoute path="/company" component={CompanyList} exact/>
      <PrivateRoute path="/company/add" component={CompanyAdd} exact/>
      <PrivateRoute path="/department" component={DepartmentList} exact/>
      <PrivateRoute path="/department/add" component={DepartmentAdd} exact/>
      <PrivateRoute exact path="/team" component={TeamList} />
      <PrivateRoute exact path="/team/add" component={TeamAdd}/>
      <PrivateRoute path="/user" component={UserList} exact/>
      <PrivateRoute path="/user/add" component={UserAdd} exact/>
      <PrivateRoute path="/user/edit/:id" component={UserEdit} exact/>
      
      
      </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
