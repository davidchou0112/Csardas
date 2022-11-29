import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllComments } from '../../store/comments';

const AllComments = () => {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments.allComments)
    console.log('~~this is comments:', comments)

    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch])

    return (
        <h3>~comments~</h3>
    )
}
export default AllComments