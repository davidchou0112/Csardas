import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../store/images';
import { getAllTags } from '../../store/tags';
import TagBigCard from './AllTagsBigCard';

import './AllTags.css'

const AllTags = () => {
    const dispatch = useDispatch();

    const allTags = useSelector(state => state.tags?.allTags)
    const allTagsArr = Object.values(allTags)

    const allImages = useSelector(state => state.images?.allImages)

    // looping through allTagsArr and pushing names into tagNames
    let tagNames = [];
    for (let i = 0; i < allTagsArr.length; i++) {
        if (!tagNames.includes(allTagsArr[i].name)) {
            tagNames.push(allTagsArr[i].name)
        }
    }
    // console.log(`this is tagNames --: `, tagNames)

    useEffect(() => {
        dispatch(getAllTags())
        dispatch(getAllImages())
    }, [])

    return (

        <div>
            <h1>This will be all tags</h1>
            <div>
                {tagNames.map((tagname) => {
                    return (
                        <div key={tagname}>
                            <TagBigCard tagname={tagname} images={allImages} tags={allTags} />
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export default AllTags;