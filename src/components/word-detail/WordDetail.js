import React from 'react';

class WordDetail extends React.Component{
    render() {
        console.log("this.props", this.props);
        return (
            <div>
                Word Detail Component
            </div>
        )
    }

    componentWillMount(props, state){
        console.log("this.props", this.props)
        console.log("props",props);
        console.log("state",state);
    }
}

export default WordDetail;