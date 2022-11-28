import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllImages } from '../../store/images';

const AllImages = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllImages())
    }, [dispatch])

    return (
        <h1>Display All Images Here</h1>
    )
}

export default AllImages;