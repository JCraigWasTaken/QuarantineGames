import React from 'react';

class HomePage extends React.Component {
    render(){
        return(
            <div className='flex-column flex_center margin_vertical50'>
                <div className='flex-row flex_spacebetween' style={{'width':'74%'}}>
                    <div style={{'width':'50%'}}>
                        <h1 className='color-text_dominant' style = {{'margin-top':'30px'}}>Pick a game</h1>
                    </div>
                    <div className='flex-column' style={{'width':'50%'}}>
                        <div className='homePageButtonRow'>
                            <a href={window.location.href+"death-roll"} className='homePageButton'>Death Roll</a>
                            <div id='arrow'>
                                <div id='arrowBody'>
                                </div>
                            </div>
                        </div>
                        <div className='homePageButtonRow'>
                            <a href={window.location.href+"death-box"} className='homePageButton'>Death Box</a>
                            <div id='arrow'>
                                <div id='arrowBody'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;
