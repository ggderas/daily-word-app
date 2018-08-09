import React from 'react';

class WordDetail extends React.Component{
    render() {
        console.log("this.props",this.props);
        return (
            <div>
                Word Detail Component
            </div>
        )
    }
}

export default WordDetail;