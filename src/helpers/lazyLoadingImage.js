
import React from 'react'
import { useEffect } from 'react'



function observerCallback(entries, observer) {
    for (let entry of entries) {
        if (entry.isIntersecting) {
            const img = entry.target
            img.setAttribute('src', "") // 把值塞回 src
            //img.removeAttribute('data-src')
            observer.unobserve(img) // 取消監視
        }
    }
}


const lazyLoadingImages = (targetImages) => {

    const observerOption = {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0]
    }

    const observer = new IntersectionObserver(observerCallback, observerOption);

    for (let image of targetImages) {
        observer.observe(image);
    }

}

export default lazyLoadingImages;