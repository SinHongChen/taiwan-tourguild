import React, { useEffect, useState } from 'react'

const useMedia = () => {

    const [mediaWidth, setMediaWidth] = useState();


    const isPc = () => {
        if (mediaWidth >= 1280) {
            return true;
        }
        return false;
    }

    const isTablet = () => {
        if (mediaWidth < 1280 && mediaWidth >= 768) {
            return true;
        }
        return false;
    }

    const isMobile = () => {
        if (mediaWidth < 768) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        setMediaWidth(document.body.clientWidth);
        window.addEventListener("resize", () => {
            setMediaWidth(document.body.clientWidth);
        })
    }, [])

    return {
        mediaWidth,
        isPc,
        isTablet,
        isMobile
    }
}

export default useMedia
