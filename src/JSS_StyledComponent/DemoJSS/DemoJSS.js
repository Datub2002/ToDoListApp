import React, { Component } from 'react';
import { Button, SmallButton } from '../Components/Button';
import { StyledLink } from '../Components/Link';

class DemoJSS extends Component {
    render() {
        return (
            <div>
                <Button className='button_style' primary >Hello, hi</Button>
                <StyledLink href='https://www.youtube.com/watch?v=Cj5Pi7zboeA' >Click Here</StyledLink>
               
            </div>
        );
    }
}

export default DemoJSS;