import React from 'react'
import { Route,  Switch } from 'react-router-dom'
import './style.scss'
import Header from '../header/Header'
import Home from '../../pages/home/Home'
import About from '../../pages/about/About'
import Detail from '../../pages/detail/Detail'
import Publish from '../../pages/admin/Publish'
import Edit from '../../pages/admin/Publish'
import AdminList from '../../pages/admin/List'
import Login from '../../pages/admin/Login'

export default function Frame () {
  return (
    <div className="page-frame">
      <div className="header" mode="horizontal">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/about" component={About}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/admin/publish" component={Publish}></Route>
          <Route path="/admin/list" component={AdminList}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
        {/* <Router></Router> */}
      </div>
    </div>
  )
}

// export default class home extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {};
//   }

//   render () {
//     return (
//       <div className="page-frame">
//         <div className="header" mode="horizontal">
//           <Header></Header>
//           <Switch>
//             <Route exact path="/" component={Home}></Route>
//             <Route path="/home" component={Home}></Route>
//             <Route path="/about" component={About}></Route>
//             <Route path="/detail/:id" component={Detail}></Route>
//             <Route path="/admin" component={Admin}></Route>
//             <Route path="/login" component={Login}></Route>
//           </Switch>
//           {/* <Router></Router> */}
//         </div>
//       </div>
//     )
//   }
// }

