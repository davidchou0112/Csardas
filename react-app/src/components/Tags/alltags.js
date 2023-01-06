import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../store/images';
import { getAllTags } from '../../store/tags';

const AllTags = () => {
    const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false);

    const allTags = useSelector(state => state.tags?.allTags)
    console.log(`this is tags, from alltags.js -- :`, allTags)

    // const allTagsArr = Object.values(tags.AllTags)
    // console.log(`this is allTagsArr, from alltags.js --:`, allTagsArr)

    useEffect(() => {
        dispatch(getAllTags())
        dispatch(getAllImages())
        // .then(() => setIsLoaded(true))
    }, [])

    return (

        <div id='background_ashes'>
            <h1>This will be all tags</h1>
        </div>

    )
}

export default AllTags;