import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import shortid from "shortid";
import Confetti from 'react-confetti'

var React = require('react')

class DeathRollPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            gamePhase : 0,
            teams:{
                team1: '',
                team2: ''
            },
            drinks: 0,
            coinSide: '',
            activeTeam:{
                name: '',
                color: ''
            },
            notActiveTeam:{
                name: '',
                color: ''
            },
            wager: 1,
            spinVal: 0,
            max:10,
            start:10,
            windowWidth:0,
            windowHeight:0,
            rollEnabled: false,
            buttonDisabled: '',
            popAnimation: '',
            beerHeight: '100vh',
            notBeerHeight: '0vh',
            count: '0',
            hideAnimation:''
        }
        this.keyList = {
            nameFlipper: '',
            frontName: '',
            backName: '',
            numberFlipper: ''
        }
        this.reloadNameFlipperAnimation = true;
        this.reloadNumberPopAnimation = false;
        this.startVal = 0
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
      
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }

    setGamePhase = () =>{
        var gamePhaseVar = this.state.gamePhase
        var team1Var = this.state.teams.team1
        var team2Var = this.state.teams.team2
        var activeTeamVar = ''
        var activeTeamColorVar = ''
        var notActiveTeamVar = ''
        var notActiveTeamColorVar = ''
        var maxVal = 0

        if(gamePhaseVar<7){
            if(gamePhaseVar == 1 && team1Var == ''){
                team1Var = 'Team 1'
            }
            if(gamePhaseVar == 1 && team2Var == ''){
                team2Var = 'Team 2'
            }
            if(gamePhaseVar == 2 && this.state.coinSide == 'heads'){
                activeTeamVar = this.state.teams.team1
                activeTeamColorVar = '#3348FF'
                notActiveTeamVar = this.state.teams.team2
                notActiveTeamColorVar = '#bb0000'
                maxVal = this.state.wager*10
            }
            if(gamePhaseVar == 2 && this.state.coinSide == 'tails'){
                activeTeamVar = this.state.teams.team2
                activeTeamColorVar = '#bb0000'
                notActiveTeamVar = this.state.teams.team1
                notActiveTeamColorVar = '#3348FF'
                maxVal = this.state.wager*10
            }
            if(gamePhaseVar == 4){
                this.setBeerHeight();
            }
            gamePhaseVar=gamePhaseVar+1
        }else{
            gamePhaseVar=1
        }

        this.setState({
            gamePhase:gamePhaseVar,
            teams:{
                team1:team1Var,
                team2:team2Var
            },
            activeTeam:{
                name:activeTeamVar,
                color:activeTeamColorVar
            },
            notActiveTeam:{
                name: notActiveTeamVar,
                color: notActiveTeamColorVar
            },
            max: maxVal,
            start: maxVal
        })
    }

    handleChange = (event) => {
        if (event.target.id == 'team1Name'){
            this.setState({
                teams: {
                    team1:event.target.value,
                    team2:this.state.teams.team2
                }
            });
        }
        if (event.target.id == 'team2Name'){
            this.setState({
                teams: {
                    team1:this.state.teams.team1,
                    team2:event.target.value
                }
            });
        }
        if (event.target.id == 'wagerid'){
            this.setState({
                wager:event.target.value
            });
        }
        console.log(this.state)
    }

    flipCoin = () =>{
        var flipResult = Math.random();
        this.setState({
            coinSide: ''
        })
        setTimeout(()=>{
            if(flipResult <= 0.5){
                this.setState({
                    coinSide: 'heads'
                })
            }
            else{
                this.setState({
                    coinSide: 'tails'
                })
            }
        }, 100);
    }

    roll = () =>{
        var rollResult = Math.floor(Math.random() * (this.state.max))+1;

        if (rollResult != 1){
            var notActiveTeamVar = this.state.activeTeam.name;
            var notActiveTeamColorVar = this.state.activeTeam.color;
            var activeTeamVar = this.state.notActiveTeam.name;
            var activeTeamColorVar = this.state.notActiveTeam.color;

            this.startVal = this.state.max
            this.reloadNumberPopAnimation = true
            this.setState({
                start:this.state.max,
                max:rollResult,
                activeTeam:{
                    name: activeTeamVar,
                    color: activeTeamColorVar
                },
                notActiveTeam:{
                    name: notActiveTeamVar,
                    color: notActiveTeamColorVar
                },
                buttonDisabled: 'submitButtonDisabled',
                popAnimation: ''
            })
        }else{
            this.reloadNumberPopAnimation = false
            this.reloadNameFlipperAnimation = false
            this.setState({
                start:this.state.max,
                max:rollResult,
                gamePhase: 4,
                hideAnimation: 'hideAnimation 5s both',
                rollEnabled: true,
                buttonDisabled: 'submitButtonDisabled',
                popAnimation: ''
            })
        }
    }

    getId = (key) => {
        var id = shortid.generate();
        if (this.reloadNameFlipperAnimation == true && key.includes('nameFlipper')){
            this.keyList[key] = id
        }else if(key.includes('nameFlipper') == false){
            this.keyList[key] = id
        }
        return this.keyList[key];
    };

    numberPop = () => {
        if (this.reloadNumberPopAnimation == true){
            this.reloadNameFlipperAnimation = false
            this.setState({
                start: this.state.max,
                popAnimation: 'pop 0.5s both',
                buttonDisabled: ''
            })
            this.reloadNameFlipperAnimation = true
            this.reloadNumberPopAnimation = false
        }
    }

    rollTime = () => {
        var time = Math.floor((this.startVal/this.state.max)*1.5)
        if(time<1){
            time = 1
        }else if(time > 5){
            time = 5
        }
        return(time)
    }

    setBeerHeight = () =>{
        var timeleft = (this.state.wager)+2
        var trigger = false
        var timeOriginal = ((timeleft-2)/10)+2
        timeleft = ((timeleft-2)/10)+2
        var timer = setInterval(()=>{
            console.log('--------')
            console.log(timeleft);
            if(timeleft < 0){
                clearInterval(timer);
                this.setGamePhase();
            }
            if(timeOriginal-timeleft > 2 && trigger==false){
                this.setGamePhase();
                trigger = true
            }
            console.log(timeOriginal)
            console.log(100-(((timeleft+1)/(timeOriginal-2))*100)+'vh')
            this.setState({
                notBeerHeight: 100-(((timeleft+1)/(timeOriginal-2))*100)+'vh',
                beerHeight: (((timeleft+1)/(timeOriginal-2))*100)+'vh',
                count: timeleft+1
            })
            timeleft -= 1;
        }, 1000);
    }

    reset = (e) => {
        console.log(e.target.id)
        if(e.target.id == 'Same'){
            this.setState({
                gamePhase : 2,
                drinks: 0,
                coinSide: '',
                activeTeam:{
                    name: '',
                    color: ''
                },
                notActiveTeam:{
                    name: '',
                    color: ''
                },
                wager: 1,
                spinVal: 0,
                max:10,
                start:10,
                windowWidth:0,
                windowHeight:0,
                rollEnabled: false,
                buttonDisabled: '',
                popAnimation: '',
                beerHeight: '100vh',
                notBeerHeight: '0vh',
                count: '0',
                hideAnimation:''
            });
            this.keyList = {
                nameFlipper: '',
                frontName: '',
                backName: '',
                numberFlipper: ''
            }
            this.reloadNameFlipperAnimation = true;
            this.reloadNumberPopAnimation = false;
            this.startVal = 0
        }else{
            this.setState({
                gamePhase : 1,
                teams:{
                    team1: '',
                    team2: ''
                },
                drinks: 0,
                coinSide: '',
                activeTeam:{
                    name: '',
                    color: ''
                },
                notActiveTeam:{
                    name: '',
                    color: ''
                },
                wager: 1,
                spinVal: 0,
                max:10,
                start:10,
                windowWidth:0,
                windowHeight:0,
                rollEnabled: false,
                buttonDisabled: '',
                popAnimation: '',
                beerHeight: '100vh',
                notBeerHeight: '0vh',
                count: '0',
                hideAnimation:''
            });
            this.keyList = {
                nameFlipper: '',
                frontName: '',
                backName: '',
                numberFlipper: ''
            }
            this.reloadNameFlipperAnimation = true;
            this.reloadNumberPopAnimation = false;
            this.startVal = 0
        }
    }

    render(){
        return(
            <div className='flex-column flex_spaceCenter flex_stretch' style={{'textAlign':'center'}}>

                {this.state.gamePhase == 0 &&
                    <div className='flex-column flex_spaceCenter flex_stretch'>
                        <h2>Instructions</h2>
                        <div key='1'>1. Two people or teams choose to face off</div>
                        <div key='1'>2. A coinflip happens to determine who chooses the wager</div>
                        <div key='1'>3. The person/team makes a wager of a certain number of drinks, that number is multiplied by 10 and becomes the upperbound of the first death roll in the game</div>
                        <div key='1'>4. Once the initial roll finishes, the number from the initial roll becomes the upper bound for the next roll</div>
                        <div key='1'>5. The above process repeats until one team rolls a 1 and loses</div>
                        <button 
                        onClick={this.setGamePhase}
                        className='submitButton'>
                            I certify that I understand the game deathroll and will drink responsibly while playing
                        </button>
                    </div>
                }

                {this.state.gamePhase == 1 &&
                    <div>
                        <h2>Enter the Team Name</h2>
                        <p>Team 1 Name</p>
                        <input id ='team1Name' type='text' value={this.state.teams.team1} onChange={this.handleChange}></input>
                        <p>Team 2 Name</p>
                        <input id ='team2Name' type='text' value={this.state.teams.team2} onChange={this.handleChange}></input>
                        <button onClick={this.setGamePhase} className='submitButton'>Submit</button>
                    </div>
                }

                {this.state.gamePhase == 2 &&
                    <div className='flex-row'>
                        <div className='flex-column' style={{flex:1}}>
                            <h2>The blue team is</h2>
                            <p style={{'color':'#3348FF'}}>{this.state.teams.team1}</p>
                        </div>
                        <div className='flex-column' style={{flex:2}}>
                            <a id="coin" className={this.state.coinSide} onClick={this.flipCoin}>
                                <div className="side-a"></div>
                                <div className="side-b"></div>
                            </a>
                        </div>
                        <div className='flex-column' style={{flex:1}}>
                            <h2>The red team is</h2>
                            <p style={{'color':'#bb0000'}}>{this.state.teams.team2}</p>
                        </div>
                    </div>
                }
                {this.state.gamePhase==2 && this.state.coinSide == 'tails' &&
                    <div className='coinText' style={{'textAlign':'center'}}>
                        <h2 className='coinText'>{this.state.teams.team1+" will wager the following amount of drinks"}</h2>
                        <input id='wagerid' type='text' pattern="[0-9]*" maxLength='2' value={this.state.wager} onChange={this.handleChange}></input>
                        <button onClick={this.setGamePhase} className='submitButton'>Submit</button>
                    </div>
                }
                {this.state.gamePhase==2 && this.state.coinSide == 'heads' &&
                    <div className='coinText' style={{'textAlign':'center'}}>
                        <h2>{this.state.teams.team2+" will wager the following amount of drinks"}</h2>
                        <input id='wagerid' type='text' pattern="[0-9]*" maxLength='2' value={this.state.wager} onChange={this.handleChange}></input>
                        <button onClick={this.setGamePhase} className='submitButton'>Submit</button>
                    </div>
                }

                {(this.state.gamePhase == 3||this.state.gamePhase == 4) &&
                    <div style={{'animation':this.state.hideAnimation}}>
                        <CountUp 
                            key={this.getId('numberFlipper')}
                            style={{'fontSize': '3rem', 'fontWeight': '600', 'fontFamily': 'Raleway, sans-serif', 'color':this.state.rollColor, 'animation':this.state.popAnimation, 'margin':'25px'}}
                            start = {this.state.start}
                            end={this.state.max}
                            duration={this.rollTime()}
                            decimals={0}
                            onEnd={this.numberPop}
                        >
                        </CountUp>
                        <div className='flex-row flex_spaceCenter'>
                            <div key={this.getId('nameFlipper')} className='flip-text' style={{'display':'block', 'margin':'25px'}}>
                                <div key={this.getId('front_nameFlipper')} id='backFace' className='teamNameFace backFace' style={{'background':this.state.notActiveTeam.color, 'zIndex':20}}>
                                    <div>{this.state.notActiveTeam.name}</div>
                                </div>
                                <div key={this.getId('back_nameFlipper')} id='frontFace' className='teamNameFace frontFace' style={{'background':this.state.activeTeam.color, 'zIndex':10}}>
                                    <div>{this.state.activeTeam.name}</div>
                                </div>
                            </div>
                        </div>
                        <button className={'submitButton ' + this.state.buttonDisabled} onClick={this.roll} disabled={this.state.rollEnabled} style={{'width':'200px'}}>Roll</button>
                    </div>
                }

                {this.state.gamePhase == 4 &&
                    <div>
                        <Confetti
                            width={this.windowWidth}
                            height={this.windowHeight}/>
                        <h2>Team {this.state.notActiveTeam.name} Loses</h2>
                        <h2>Is your team ready to drink?</h2>
                        <button className='submitButton' onClick={this.setGamePhase}>Ready to Drink</button>
                    </div>
                }

                {this.state.gamePhase == 5 &&
                    <div className = "demo">
                        <div className = "demo__colored-blocks">
                            <div className = "demo__colored-blocks-rotater">
                            <div className = "demo__colored-block"></div>
                            <div className = "demo__colored-block"></div>
                            <div className = "demo__colored-block"></div>
                            </div>
                            <div className = "demo__colored-blocks-inner"></div>
                            <div className = "demo__text">Ready</div>
                        </div>
                        <div className = "demo__inner">
                            <svg className = "demo__numbers" viewBox="0 0 100 100">
                            <defs>
                                <path className = "demo__num-path-1" d="M40,28 55,22 55,78"/>
                                <path className = "demo__num-join-1-2" d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"/>
                                <path className = "demo__num-path-2" d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"/>
                                <path className = "demo__num-join-2-3" d="M28,69 Q25,44 34.4,27.4"/>
                                <path className = "demo__num-path-3" d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"/>
                            </defs>
                            <path className = "demo__numbers-path" 
                                    d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19 
                                    Q25,44 34.4,27.4
                                    l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73 
                                    a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83 
                                    l0,-61 L40,28" />
                            </svg>
                        </div>
                    </div>
                }

                {this.state.gamePhase == 6 &&
                    <div>
                        <div className = 'countDownContainer'>
                            <h1>{this.state.count}</h1>
                        </div>
                        <div style={{'height':this.state.notBeerHeight}}></div>
                        <div className = 'beerContainer' style= {{'height':this.state.beerHeight}}>
                            <div className="wave wave1"></div>
                            <div className="wave wave2"></div>
                            <div className="wave wave3"></div>
                            <div className="wave wave4"></div>
                        </div>
                    </div>
                }
                {this.state.gamePhase == 7 &&
                    <div>
                        <h1>Would you like to play again?</h1>
                        <button id = 'Same' className='submitButton' onClick={this.reset}>Same Teams</button>
                        <button id = 'Different' className='submitButton' onClick={this.reset}>Different Teams</button>
                    </div>
                }
            </div>
        )
    }
}


export default DeathRollPage 