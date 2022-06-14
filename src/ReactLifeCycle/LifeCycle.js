import React, { Component } from 'react';
import ChildComponent from './ChildComponent';

class LifeCycle extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            number : 1
        }
        console.log('constructor');
    }
    // dược gọi khi sử dụng trên DOM (GIAO diện của app)
    static getDerivedStateFromProps(){
        console.log('getDerivedStateFromProps');
        return null
    }
    // được gọi khi setState or props mới
        shouldComponentUpdate()
        {
            console.log('shouldComponentUpdate');
            return false
        }
        

    render() {
        console.log('renderParent');
        return (
            <div>
                <span>number : {this.state.number}
                </span>
                <button className='btn btn-success' onClick={() =>{
                    this.setState({
                        number : this.state.number + 1
                    })
                }}> + </button>
                <ChildComponent />
            </div>
        );
    }
     componentDidMount(){
        console.log('componentDidMount');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');

    }

}

export default LifeCycle;