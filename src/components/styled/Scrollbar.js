import { css } from 'styled-components'
import "style/_variable.scss"

const BoxShadown = css`
    box-shadow: 1px 1px 3px var(--box-shadow-color-1);
`

const Container = css`
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        border-radius: 0.2em;
        ${BoxShadown};
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: var(--text-color-2);
        border-radius: 0.2em;
        &:hover{
            cursor: pointer;
        }
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: var(--text-color-2);
    }

`

const Scrollbar = () => {
    return Container
}

export default Scrollbar
