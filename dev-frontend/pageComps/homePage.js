var React = require('react')
class HomePage extends React.Component{
    render(){
        return(
            <div className='flex-column flex_center flex_spaceCenter'>
                <h1>Pick a game</h1>
                <a href={window.location.href+"death-roll"} className='submitButton'>Death Roll</a>
            </div>
        )
    }
}

export default HomePage 