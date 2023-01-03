import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTags } from '../../store/tags';

const AllTags = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTags())
    })

    return (
        <h1>This will be all tags</h1>
    )
}

export default AllTags;