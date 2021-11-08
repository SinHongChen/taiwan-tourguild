import styled from "styled-components"
import { device } from "helpers/device";
import { categoryMenu } from "helpers/menu";


const Container = styled.div`
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 5px var(--box-shadow-color-3);
    height: fit-content;
    @media ${device.desktop}{        
        width: fit-content;
    }
    @media ${device.tablet}{        
        width: 100%;
    }
    @media ${device.mobile}{        
        width: 100%;
    }
`


const CategoryMenuItem = styled.div`
    box-shadow:${props => props.selected ? "1px 1px 5px var(--box-shadow-color-3)" : ""};
    color: ${props => props.selected ? "var(--pink)" : "var(--text-color-2)"};

    &:hover{
        cursor: pointer;
        color: ${props => props.selected ? "var(--pink)" : "var(--text-color-1)"};
    }
    @media ${device.desktop}{        
        padding: 8px 25px;
    }
    @media ${device.tablet}{        
        padding: 8px 25px;
        min-width: fit-content;
        width: 100%;
        text-align:center;
    }
    @media ${device.mobile}{        
        padding: 8px 0px;
        width: 100%;
        min-width: fit-content;
        text-align:center;
    }
`

const CategoryMenu = ({ selected, setSelected }) => {
    return (
        <Container>
            {categoryMenu.map((category, index) => {
                return (
                    <CategoryMenuItem key={index}
                        onClick={() => { setSelected(category.value) }}
                        selected={category.value === selected}>
                        {category.name}
                    </CategoryMenuItem>
                )
            })}
        </Container>
    )
}

export default CategoryMenu;