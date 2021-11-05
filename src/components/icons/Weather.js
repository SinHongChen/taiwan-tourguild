import React from 'react'

const basicColor = "#373A43";

const Cloud = ({ color = basicColor }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke={color} d="M16.3645 10.3625H15.4484C15.1764 9.30892 14.6143 8.35281 13.826 7.60276C13.0378 6.85272 12.0549 6.33881 10.9892 6.11944C9.92343 5.90007 8.81753 5.98403 7.79712 6.36179C6.77671 6.73954 5.88272 7.39594 5.21673 8.25639C4.55073 9.11685 4.13945 10.1469 4.0296 11.2294C3.91975 12.3119 4.11575 13.4035 4.59531 14.3802C5.07488 15.3569 5.81879 16.1795 6.74252 16.7546C7.66624 17.3296 8.73274 17.634 9.82082 17.6332H16.3645C17.3287 17.6332 18.2533 17.2502 18.9351 16.5684C19.6169 15.8867 19.9999 14.962 19.9999 13.9978C19.9999 13.0337 19.6169 12.109 18.9351 11.4272C18.2533 10.7455 17.3287 10.3625 16.3645 10.3625Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const Dark = ({ color = basicColor }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke={color} d="M20.0001 12.346C19.8733 13.7185 18.8409 15.5743 17.9979 16.6647C17.1548 17.7551 16.0186 18.5829 14.7222 19.0512C13.4258 19.5194 12.0229 19.6088 10.6776 19.3088C9.33228 19.0088 8.10022 18.3319 7.12558 17.3573C6.15094 16.3827 5.47403 15.1506 5.17406 13.8053C4.87409 12.46 4.96346 11.0571 5.43172 9.76068C5.89998 8.46431 6.72776 7.32811 7.81819 6.48502C8.90863 5.64193 10.2166 5.12684 11.5891 5C10.7856 6.08712 10.3989 7.42654 10.4994 8.77466C10.6 10.1228 11.181 11.39 12.1369 12.346C13.0928 13.3019 14.3601 13.8829 15.7082 13.9835C17.0563 14.084 18.3958 13.6973 19.4829 12.8938L20.0001 12.346Z" fill={basicColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const Drizzle = ({ color = basicColor }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.09534 17.0907V18.5452" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.09534 12.7271V14.1817" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.9136 17.0907V18.5452" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.9136 12.7271V14.1817" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.0042 18.5452V19.9997" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.0042 14.1816V15.6361" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path stroke={color} d="M17.8225 15.3307C18.587 14.9958 19.2131 14.4082 19.5956 13.6664C19.9781 12.9245 20.0938 12.0737 19.9233 11.2566C19.7527 10.4396 19.3062 9.70612 18.6589 9.1793C18.0115 8.65248 17.2026 8.36441 16.3679 8.36342H15.4515C15.221 7.47071 14.7816 6.64557 14.1696 5.95601C13.5576 5.26645 12.7904 4.73221 11.9314 4.39733C11.0724 4.06246 10.146 3.93653 9.22878 4.02993C8.31152 4.12333 7.4296 4.43339 6.6557 4.93454C5.8818 5.4357 5.23808 6.1136 4.7776 6.91237C4.31712 7.71114 4.05307 8.60791 4.0072 9.52877C3.96134 10.4496 4.13498 11.3682 4.51382 12.2088C4.89265 13.0493 5.46583 13.7879 6.1861 14.3634" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}


const Heavy = ({ color = basicColor }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9136 12.7271V18.5453" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.09534 12.7271V18.5453" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.0042 14.1816V19.9998" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path stroke={color} d="M17.8225 15.3307C18.587 14.9958 19.2131 14.4082 19.5956 13.6664C19.9781 12.9245 20.0938 12.0737 19.9233 11.2566C19.7527 10.4396 19.3062 9.70612 18.6589 9.1793C18.0115 8.65248 17.2026 8.36441 16.3679 8.36342H15.4515C15.221 7.47071 14.7816 6.64557 14.1696 5.95601C13.5576 5.26645 12.7904 4.73221 11.9314 4.39733C11.0724 4.06246 10.146 3.93653 9.22878 4.02993C8.31152 4.12333 7.4296 4.43339 6.6557 4.93454C5.8818 5.4357 5.23808 6.1136 4.7776 6.91237C4.31712 7.71114 4.05307 8.60791 4.0072 9.52877C3.96134 10.4496 4.13498 11.3682 4.51382 12.2088C4.89265 13.0493 5.46583 13.7879 6.1861 14.3634" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const Sun = ({ color = basicColor }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0003 16.0909C14.2597 16.0909 16.0912 14.2593 16.0912 12C16.0912 9.74062 14.2597 7.90906 12.0003 7.90906C9.74099 7.90906 7.90942 9.74062 7.90942 12C7.90942 14.2593 9.74099 16.0909 12.0003 16.0909Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 3V4.63636" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 19.3637V21.0001" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.63464 5.63458L6.79646 6.7964" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.2036 17.2036L18.3654 18.3654" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 12H4.63636" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.3636 12H21" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.63464 18.3654L6.79646 17.2036" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M17.2036 6.7964L18.3654 5.63458" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const Thundershower = ({ color = basicColor }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.0887 15.5575C17.972 15.3781 18.7572 14.8769 19.2917 14.1512C19.8263 13.4255 20.0722 12.5271 19.9816 11.6303C19.891 10.7335 19.4704 9.9024 18.8015 9.29826C18.1326 8.69413 17.2631 8.36009 16.3618 8.361H15.4459C15.205 7.4286 14.7364 6.5706 14.0821 5.86403C13.4278 5.15747 12.6082 4.62446 11.697 4.31285C10.7858 4.00125 9.81151 3.92081 8.86155 4.07875C7.91159 4.23669 7.01573 4.62807 6.25438 5.21775C5.49304 5.80743 4.89005 6.57696 4.49956 7.45723C4.10906 8.33751 3.94329 9.30098 4.01712 10.2611C4.09094 11.2213 4.40206 12.1481 4.92254 12.9583C5.44302 13.7686 6.15656 14.4369 6.9991 14.9032" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12.7269 11.2686L9.81921 15.6301H14.1807L11.273 19.9916" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const Umbrella = ({ color = basicColor }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8182 16.8182C15.8182 17.3245 15.617 17.8101 15.259 18.1681C14.901 18.5261 14.4154 18.7273 13.9091 18.7273C13.4028 18.7273 12.9172 18.5261 12.5592 18.1681C12.2011 17.8101 12 17.3245 12 16.8182V12.3636M19 12.3636C18.8338 10.6223 18.0245 9.00539 16.7301 7.82869C15.4358 6.652 13.7493 6 12 6C10.2507 6 8.56425 6.652 7.26989 7.82869C5.97553 9.00539 5.16622 10.6223 5 12.3636H19Z" stroke="#2DB3FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

export {
    Cloud,
    Dark,
    Drizzle,
    Heavy,
    Sun,
    Thundershower,
    Umbrella
}
