import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { getAllTags } from "../../store/tags";
import { getAllImages } from "../../store/images";
import ImageCard from "../ImageCard/ImageCard";
import './SingleTag.css';
import { getAllUsersThunk } from "../../store/user";

const SingleTag = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    const user = useSelector((state) => state.session.user)


    const tagname = useParams().tagname;

    const tags = useSelector(state => state.tags?.allTags);
    const tagsArr = Object.values(tags);

    const images = useSelector(state => state.images?.allImages);
    const imagesArr = Object.values(images);

    const filteredTags = tagsArr.filter(tag => tag.name === tagname);
    // console.log(`this is filteredTags, from SingleTag.js -- :`, filteredTags)

    let eventIdArr = [];
    for (let i = 0; i < filteredTags.length; i++) {
        if (!eventIdArr.includes(filteredTags[i].image_id)) {
            eventIdArr.push(filteredTags[i].image_id)
        }
    }

    // console.log(`this is eventIdArr -- : `, eventIdArr)

    const filteredByTag = imagesArr.filter(image => eventIdArr.includes(image.id))
    const filteredByTitle = imagesArr.filter(image => image.title.toLowerCase().includes(tagname.toLowerCase()))
    const combinedFiltered = filteredByTag.concat(filteredByTitle)

    let finalFiltered = [];
    for (let i = 0; i < combinedFiltered.length; i++) {
        if (!finalFiltered.includes(combinedFiltered[i])) {
            finalFiltered.push(combinedFiltered[i])
        }
    }

    // console.log(`this is finalFiltered -- : `, finalFiltered)

    useEffect(() => {
        dispatch(getAllTags())
        dispatch(getAllImages())
        dispatch(getAllUsersThunk())
    }, [dispatch])

    let results;

    if (!finalFiltered.length) {
        results = (
            <div className='tagsearch-outer-container'>
                <div className="tagsearch-container">
                    <div className="tagsearch-inner-container">
                        <div className="tagsearch-images-container">
                            <div className='tagsearch-noresults'>{`There are no matches for "${tagname}".`}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        results = (
            <div className='tagsearch-outer-container'>
                <div className="tagsearch-container">
                    <div className="tagsearch-inner-container">
                        <h1>#{tagname}</h1>
                        <div className="tagsearch-images-container">
                            {finalFiltered.map((image, i) => {
                                return (
                                    <div key={i}>
                                        <ImageCard image={image} users={users} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!user) {
        return (Redirect('/'))
    }

    return (
        <>
            {results}
        </>
    )
};
export default SingleTag;