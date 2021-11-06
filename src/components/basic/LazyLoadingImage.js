import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`

`

const LazyLoadingImage = ({ children }) => {
    const lazyLoadingRef = useRef();

    let observerOption = {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0]
    }

    function observerCallback(entries, observer) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                // 監視目標進入畫面
                const img = entry.target
                img.setAttribute('src', img.dataset.src) // 把值塞回 src
                img.removeAttribute('data-src')
                observer.unobserve(img) // 取消監視
            }
        }
    }

    const observer = new IntersectionObserver(observerCallback, observerOption);

    const windowObserver = new MutationObserver((mutations) => {
        let lazyImages = document.querySelectorAll("img.lazy");
        for (let image of lazyImages) {
            observer.observe(image);
        }
        windowObserver.disconnect();
    });

    useEffect(() => {
        windowObserver.observe(lazyLoadingRef.current, { attributes: false, childList: true, characterData: false, subtree: true });
    }, [])

    return (
        <Container ref={lazyLoadingRef}>
            {children}
        </Container>
    )
}

export default LazyLoadingImage
