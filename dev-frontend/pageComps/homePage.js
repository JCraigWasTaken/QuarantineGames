import React from 'react';

import mainLogo from '../media/main-logo.png';
import deathBoxLogo from '../media/deathBox-logo.png';
import deathRollLogo from '../media/deathRoll-logo.png';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.initState = {
            link:null,
            flipClass: '',
            buttonAnimation: '',
            buttonVisible: 'hidden',
            firstLogo: deathBoxLogo,
            firstTitle: '',
            firstInstructions : '',
            firstClass: '',
            secondLogo: mainLogo,
            secondTitle:'',
            secondInstructions:'',
            secondClass: '',
            cardVisible: 'hidden',
            reloadID:[0,1,2]
        };
        this.state = this.initState;
      }

    pickGame = (e) =>{
        var target = e.target.id;
        var timeoutTime = 0;
        if(this.state.flipClass == ' flip-card-inner-flipped'){
            this.setState({
                flipClass: '',
                cardVisible: 'hidden',
                buttonAnimation:'',
                buttonVisible: 'hidden'
            });
            timeoutTime = 2000;
        }
        setTimeout(()=>{
            if(target == 'DeathBox'){
                if (this.state.secondTitle != 'Death Box'){
                    this.setState({
                        firstLogo: this.state.secondLogo,
                        firstTitle: this.state.secondTitle,
                        firstInstructions: this.state.secondInstructions,
                        firstClass:'card-1',
                        secondLogo: deathBoxLogo,
                        secondTitle: 'Death Box',
                        secondInstructions: 'death box instructions here',
                        secondClass:'card-2',
                        link:window.location.href+"death-box",
                        buttonAnimation:'fadeText 3s ease-out forwards',
                        buttonVisible: 'visible',
                        cardVisible: 'visible',
                        reloadID:[Date.now(),Date.now()+1,Date.now()+2]
                    })
                }
            }else if(target == 'DeathRoll'){
                if (this.state.secondTitle != 'Death Roll'){
                    this.setState({
                        firstLogo: this.state.secondLogo,
                        firstTitle: this.state.secondTitle,
                        firstInstructions: this.state.secondInstructions,
                        firstClass:'card-1',
                        secondLogo: deathRollLogo,
                        secondTitle: 'Death Roll',
                        secondInstructions: 'death roll instructions here',
                        secondClass:'card-2',
                        link:window.location.href+"death-roll",
                        buttonAnimation:'fadeText 3s ease-out forwards',
                        buttonVisible: 'visible',
                        cardVisible: 'visible',
                        reloadID:[Date.now(),Date.now()+1,Date.now()+2]
                    })
                }
            }
        }, timeoutTime);
    }

    flipCard = () =>{
            if (this.state.flipClass == '')
                this.setState({
                    flipClass:' flip-card-inner-flipped',
                    cardVisible: 'hidden'
                })
            else(
                this.setState({
                    flipClass:'',
                    cardVisible: 'hidden'
                })
            )
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
                            <div className = 'flip-cardPile'>
                                <div key = {this.state.reloadID[0]} className = {"flip-card "+this.state.firstClass+this.state.flipClass}  style = {{'visibility':this.state.cardVisible}}>
                                    <div class={'flip-card-inner'}>
                                        <div id='explanationHolder' className={'flip-card-front flex_spaceCenter color-text_light'} style={{'flex':'7'}}>
                                            <div className='padding_horizontal8' style={{'textAlign':'center'}}>
                                                <img src={this.state.firstLogo}></img>
                                            </div>
                                        </div>
                                        <div className={'flip-card-back flex_spaceCenter'}>
                                            <h2 className='margin_vertical25'>{this.state.firstTitle}</h2>
                                            <p>{this.state.firstInstructions}</p>
                                        </div>
                                    </div>
                                </div>
                                <div key = {this.state.reloadID[1]} className = {"flip-card "+this.state.secondClass+this.state.flipClass}>
                                    <div class={'flip-card-inner'}>
                                        <div id='explanationHolder' className={'flip-card-front flex_spaceCenter color-text_light'} style={{'flex':'7'}}>
                                            <div className='padding_horizontal8' style={{'textAlign':'center'}}>
                                                <img src={this.state.secondLogo}></img>
                                            </div>
                                        </div>
                                        <div className={'flip-card-back flex_spaceCenter'}>
                                            <h2 className='margin_vertical25'>{this.state.secondTitle}</h2>
                                            <p>{this.state.secondInstructions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id='buttonRow' style={{'flex':'2', 'marginTop':'50px'}}>
                                <div key = {this.state.reloadID[2]} className='flex-row flex_spaceCenter' style={{'animation':this.state.buttonAnimation, 'visibility':this.state.buttonVisible}}>
                                    <button className='submitButton' style={{'width':'50%'}} onClick={this.flipCard}>Rules</button>
                                    <button className='submitButton' style={{'width':'50%'}} onClick={this.openLink}>Play</button>
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
