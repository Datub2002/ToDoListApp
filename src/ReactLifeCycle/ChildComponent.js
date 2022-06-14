import React, { Component } from 'react';

class ChildComponent extends Component {
    render() {
        return (
            <div>
                123
                {
                    console.log('this is child Component')
                }
            </div>
        );
    }
}

export default ChildComponent;