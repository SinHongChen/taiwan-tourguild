import { AiFillCar, AiFillPhone, AiFillHome } from "react-icons/ai";
import { AiOutlineClockCircle, AiOutlineSearch, AiFillCaretRight, AiFillCaretLeft, AiOutlineExclamationCircle } from "react-icons/ai";
import { BiTrain } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { MdOutlineGpsFixed } from "react-icons/md";
import styled from "styled-components";

const SmallIcon = styled.div`
    width: 22px;
    height: 22px;
    font-size: 22px;
    color:var(--small-icon-color);
`

const Car = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiFillCar /></SmallIcon>
}

const Phone = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiFillPhone /></SmallIcon>
}

const Home = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiFillHome /></SmallIcon>
}

const Location = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><GoLocation /></SmallIcon>
}

const Ticket = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><IoTicketOutline /></SmallIcon>
}

const Train = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><BiTrain /></SmallIcon>
}

const Exclamation = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiOutlineExclamationCircle /></SmallIcon>
}

const Time = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiOutlineClockCircle /></SmallIcon>
}

const CaretRight = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiFillCaretRight /></SmallIcon>
}

const CaretLeft = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiFillCaretLeft /></SmallIcon>
}

const GPS = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><MdOutlineGpsFixed /></SmallIcon>
}

const Search = ({ className, style }) => {
    return <SmallIcon className={className} style={style}><AiOutlineSearch /></SmallIcon>
}


export {
    Car,
    Phone,
    Home,
    Location,
    Train,
    Ticket,
    Exclamation,
    Time,
    CaretRight,
    CaretLeft,
    GPS,
    Search
}