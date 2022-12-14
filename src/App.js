
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { Route,Switch } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser : null
    }
  }
  unsubscribeFromAuth = null
  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        await userRef.onSnapshot(onSnapshot=>{
          this.setState({
            id: onSnapshot.id,
            ...onSnapshot.data()
          })
        })
        console.log(this.state);
      }
      this.setState({currentUser:userAuth})
    })
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
    return (
      <div className='App'>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/shop' component={ShopPage}/>
            <Route path='/sign'  component={SignInAndSignUp}/>
        </Switch>  
      </div>
    );
  }
}

export default App;
