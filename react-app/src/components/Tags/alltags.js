import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllImages } from '../../store/images';
import { getAllTags } from '../../store/tags';

const AllTags = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTags())
        dispatch(getAllImages())
    })

    return (

        <div id='background_ashes'>
            <h1>This will be all tags</h1>
        </div>

    )
}

export default AllTags;