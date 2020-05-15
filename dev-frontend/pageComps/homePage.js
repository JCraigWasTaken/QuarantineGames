import React from 'react';

import logo2 from '../media/logo2.png';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            link:null,
            flipAnimation: '',
            buttonAnimation: '',
            buttonVisible: 'hidden',
            gameTitle: 'Welcome to Bored Games!',
            gameText : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        };
      }

    pickGame = e =>{
        if(e.target.id == 'DeathBox'){
            this.setState({
                link:window.location.href+"death-box",
                flipClass:'flip-card-inner-flipped',
                buttonAnimation:'fadeText 6s ease-out forwards',
                buttonVisible: 'visible',
            })
            var timer = setInterval(()=>{
                this.setState({
                    flipClass:'',
                    gameTitle: 'Death Box',
                    gameText : 'Some blurb about death box blah blah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                }); 
                clearInterval(timer);
            }, 2000);
        }else if(e.target.id == 'DeathRoll'){
            this.setState({
                link:window.location.href+"death-roll",
                flipClass:'flip-card-inner-flipped',
                buttonAnimation:'fadeText 6s ease-out forwards',
                buttonVisible: 'visible',
            })
            var timer = setInterval(()=>{
                this.setState({
                    flipClass:'',
                    gameTitle: 'Death Roll',
                    gameText : 'Some blurb about death roll blah blah Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                }); 
                clearInterval(timer);
            }, 2000);
        }
    }

    openLink = () =>{
        this.props.openLink(this.state.link);
    }

    render(){
        return(
            <div className='flex-RowToColumn_Tablet padding_vertical50 padding_horizontal8' style={{'min-height':'668px'}}>
            {this.state.showInstructionProp && <this.state.instructionProp close={this.toggleInstructions} />}
                <div className='flex-column margin_horizontal4 gameCard showDesktop_HideTablet' style={{'flex':'5', 'margin-left':'0'}}>
                    <h1 className='color-text_dominant' style = {{'margin-left':'0', 'flex':'2', 'marginTop':'30px', 'marginBottom':'50px'}}>Bored Games</h1>
                        <div className ='flex-column flex_spaceCenter' style={{'height':'100%'}}>
                            <div class="flip-card">
                                <div class={'flip-card-inner '+this.state.flipClass}>
                                    <div id='explanationHolder' className={'flip-card-front flex_spaceCenter color-background_secondary color-text_light'} style={{'flex':'7'}}>
                                        <div className='margin_vertical25 padding_horizontal8' style={{'textAlign':'center'}}>
                                            <h2 className='margin_vertical25'>{this.state.gameTitle}</h2>
                                            <p>{this.state.gameText}</p>
                                        </div>
                                    </div>
                                    <div className={'flip-card-back flex_spaceCenter color-background_secondary'}>
                                        <img src={logo2}></img>
                                    </div>
                                </div>
                            </div>
                            <div id='buttonRow' style={{'flex':'1', 'marginTop':'50px'}}>
                                <div className='flex-row flex_spaceCenter' style={{'animation':this.state.buttonAnimation, 'visibility':this.state.buttonVisible}}>
                                    <button className='submitButton' style={{'width':'90%'}} onClick={this.openLink}>Play</button>
                                </div>
                            </div>
                        </div>
                </div>
                <div className='showTablet_HideDesktop' style={{'flex':'5'}}>
                    <h1 className='color-text_dominant showTablet_HideDesktop' style = {{'margin-top':'30px', 'textAlign':'center'}}>Pick a game</h1>
                </div>
                <div className='flex-column' style={{'flex':'5'}}>
                    <div className='homePageButtonRow'>
                        <button id='DeathRoll' onClick={this.pickGame} className='homePageButton'>Death Roll</button>
                        <div id='arrow'>
                            <div id='arrowBody'>
                            </div>
                        </div>
                    </div>
                    <div className='homePageButtonRow'>
                        <button id='DeathBox' onClick={this.pickGame} className='homePageButton'>Death Box</button>
                        <div id='arrow'>
                            <div id='arrowBody'>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='showTablet_HideDesktop margin_Vertical25' style = {{'flex':'20', 'width':'100%'}}>
                </div>
            </div>
        )
    }
}

export default HomePage;
