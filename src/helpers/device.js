const size = {
    desktop: `1280px`,
    desktop_m: `1279px`,
    tablet: `768px`,
    tablet_m: `767px`,
    mobile: `300px`,
}

const device = {
    desktop: `only screen and  (min-width: ${size.desktop})`,
    tablet: `only screen and  (min-width: ${size.tablet}) and (max-width:${size.desktop_m})`,
    mobile: `only screen and  (min-width: ${size.mobile}) and (max-width:${size.tablet_m})`,
}

export {
    device,
    size
};