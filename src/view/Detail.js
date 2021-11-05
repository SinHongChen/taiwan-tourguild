import React from 'react'
import Details from 'components/detail/Details'
import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const Detail = () => {
    const location = useLocation();
    const [category, setCategory] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        setCategory(new URLSearchParams(location.search).get('category'))
        setId(new URLSearchParams(location.search).get('id'))
    }, [location.search])


    return (
        <Details category={category} id={id} />
    )
}

export default Detail
