import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages } from '../../store/images';
import { getAllTags } from '../../store/tags';
import './AllTags.css'

const AllTags = () => {
    const dispatch = useDispatch();

    const allTags = useSelector(state => state.tags?.allTags)
    const allTagsArr = Object.values(allTags)

    // looping through allTagsArr and putting names only into tagNames
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

        <div id='background_ashes'>
            <h1>This will be all tags</h1>
            <div>
                {tagNames.map((tagname) => {
                    return (
                        <div id='tagName'>
                            {tagname}
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export default AllTags;