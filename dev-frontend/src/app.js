var React = require('react')
var ReactDom = require('react-dom')

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './app.css'
import HomePage from '../pageComps/homePage.js'
import DeathRollPage from '../pageComps/deathRollPage.js'
import DeathBoxPage from '../pageComps/deathBoxPage.js'
import Chat from '../pageComps/chat.js'

class App extends React.Component{

    openLink = (link) =>{
        const a = document.createElement('a');
        a.setAttribute('hidden','');
        a.setAttribute('href', link);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    openLinkNewTab = (link) =>{
        window.open(link, "_blank")
    }

    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <Route exact path='/death-roll'>
                        <DeathRollPage/>
                    </Route>
                    <Route exact path='/death-box'>
                        <DeathBoxPage/>
                    </Route>
                    <Route exact path='/chat'>
                        <Chat/>
                    </Route>
                    <Route path='/'>
                        <h1>404 Here</h1>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

ReactDom.render(<App/>,document.getElementById("app"))
