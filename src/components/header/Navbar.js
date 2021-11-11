import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { deviceMedia } from "helpers/device";

const Container = styled.div`
    width: 100%;
    padding: 0px 5%;
    background-color: var(--bg-color-2);

    @media ${deviceMedia.desktop}{
        height: var(--desktop-navbar-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media ${deviceMedia.tablet}{
        height: var(--tablet-navbar-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media ${deviceMedia.mobile}{
        height: var(--mobile-navbar-height);
    }
`

const Left = styled.div`
    @media ${deviceMedia.mobile}{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0;
    }
`

const Right = styled.div`
    display: flex;
    align-items: center;
    @media ${deviceMedia.desktop}{
        height: calc(var(--desktop-navbar-height));
    }
    @media ${deviceMedia.tablet}{
        height: calc(var(--desktop-navbar-height));
    }
    
    @media ${deviceMedia.mobile}{
        width: 100%;
        margin:0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--bg-color-2);
        box-shadow: 0px 2px 4px var(--box-shadow-color-3);
        border-radius: 6px;
        height: 40px;
    }
`

const NavbarLogo = styled.img`
    width: auto;
    @media ${deviceMedia.desktop}{
        height: var(--desktop-navbar-logo-height);
    }

    @media ${deviceMedia.tablet}{
        height: var(--tablet-navbar-logo-height);
    }

    @media ${deviceMedia.mobile}{
        height: var(--mobile-navbar-logo-height);
    }
`

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    color:${props => props.color};
    text-decoration: none;
    @media ${deviceMedia.desktop}{
        margin-left: 27px;
    }
    @media ${deviceMedia.tablet}{
        margin-left: 27px;
    }

    @media ${deviceMedia.mobile}{
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 21px;
        color: ${props => props.selected ? "var(--pink)" : "var(--text-color-2)"};
        width: 100%;
        text-decoration: none;
    }
`

const Icon = styled.img`
    margin-right: 8px;

    @media ${deviceMedia.mobile}{
        display: none;
    }
`

const Navbar = () => {

    const { pathname } = useLocation();

    return (
        <Container>
            <Left>
                <Link to="/home">
                    <NavbarLogo src="./navbarLogo.png" />
                </Link>
            </Left>
            <Right>
                <NavLink selected={pathname === "/home"} to="/home" color={"var(--pink)"} >
                    <Icon src="./Icons/Frame 41.png" />
                    <span>首頁</span>
                </NavLink>
                <NavLink selected={pathname === "/citySearchResult"} to={`citySearchResult?city=Taipei`} color={"var(--yellow)"} >
                    <Icon src="./Icons/Frame 42.png" />
                    <span>城市探索</span>
                </NavLink>
                <NavLink selected={pathname === "/positionResult"} to="/positionResult" color={"var(--green)"} >
                    <Icon src="./Icons/Frame 43.png" />
                    <span>你的附近</span>
                </NavLink>
            </Right>
        </Container>
    )
}

export default Navbar
