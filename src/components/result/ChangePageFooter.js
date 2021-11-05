import React from 'react'
import styled from 'styled-components'

const CurrentPage = styled.div`
    padding: 0px 30px;
    color: var(--text-color-1);
`

const NextPageButton = styled.a`
    width: 32px;
    height: 32px;
    background: var(--pink);
    box-shadow: 0px 4px 3px var(--box-shadow-color-3);
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    display: flex;
    &:hover{
        cursor: pointer;
    }
`

const PreviousPageButton = styled.a`
    width: 32px;
    height: 32px;
    background: var(--bg-color-2);
    box-shadow: 0px 4px 3px var(--box-shadow-color-3);
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    display: flex;
    &:hover{
        cursor: pointer;
    }
`

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
`


const ChangePageFooter = ({
    currentPage,
    handleNextPageBtnClick,
    handlePreviousPageBtnClick,
    haveNextPage,
    havePreviousPage
}) => {
    return (
        <Footer>
            {havePreviousPage &&
                <PreviousPageButton
                    onClick={handlePreviousPageBtnClick}
                >
                    <img src="./Icons/Icon/previous-1.png" alt="上一頁" />
                </PreviousPageButton>
            }
            <CurrentPage>
                {currentPage ? currentPage : ""}
            </CurrentPage>
            {haveNextPage &&
                <NextPageButton
                    onClick={handleNextPageBtnClick}
                >
                    <img src="./Icons/Icon/next-1.png" alt="下一頁" />
                </NextPageButton>
            }
        </Footer>
    )
}

export default ChangePageFooter
