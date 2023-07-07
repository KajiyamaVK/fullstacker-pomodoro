import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
    }

    body{
        
        background: ${(props) => props.theme['gray-900']};
        color: ${(props) => props.theme.white};
        -webkit-font-smoothing:antialiased;
    }

    body , input , button , textarea{
        font-family: ${(props) => props.theme.fontFamily};
        font-weight: 400;
        font-size: 1rem;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 0.2rem ${(props) => props.theme['green-500']};
    }
`
