import styled from "styled-components";
import React from 'react';





export const Link = ({className,children,...restProps}) =>{
    return <a href='https://www.youtube.com/watch?v=Cj5Pi7zboeA' className={className}>
        {children}
    </a>
}

export const StyledLink = styled(Link)`

    background-color : #000;
    color : #fff;
    font-weight : bold;



`