import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';



class DemoTheme extends Component {

   
    configLightTheme = {
        background : '#6633ff',
        fontSize : '15px',
        fontWeight : '300'
    }
    configDarkTheme = {
        background : '#000',
        fontSize : '15px',
        fontWeight : '300'
    }
    DivStyle = styled.div`
        background-color:${props => props.theme.background};
        padding: 5%;
        font-size : ${props => props.theme.fontSize};
        font-weight : ${props => props.theme.fontWeight};
        
     `
    state = {
        currentTheme: this.configDarkTheme
    }
     handleChangeTheme = (event) =>{
          this.setState(
              {
                  currentTheme : (event.target.value === '1' ? this.configDarkTheme : this.configLightTheme)
              }
          )
     }

    render() {
        return (
            <ThemeProvider theme={this.state.currentTheme}>

                <this.DivStyle >
                    Con Me May
                </this.DivStyle>
                <select onChange={this.handleChangeTheme}>
                    <option value='1' >
                        Dark theme
                    </option>
                    <option value='2' >
                        Light theme
                    </option>
                </select>
            </ThemeProvider>
        );
    }
}

export default DemoTheme;