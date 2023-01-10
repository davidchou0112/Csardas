import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllTags } from "../../store/tags";
import { getAllImages } from "../../store/images";
import ImageCard from "../ImageCard/ImageCard";
import './SingleTag.css';

const SingleTag = () => {
    const dispatch = useDispatch();

    const tagname = useParams().tagname;

    const tags = useSelector(state => state.tags?.allTags);
    const tagsArr = Object.values(tags);

    const images = useSelector(state => state.images?.allImages);
    const imagesArr = Object.values(images);

    const filteredTags = tagsArr.filter(tag => tag.name === tagname);
    // console.log(`this is filteredTags, from SingleTag.js -- :`, filteredTags)

    // Loops through the filtered tags and pushes all the imageIds of those tags into an array
    let eventIdArr = [];

    for (let i = 0; i < filteredTags.length; i++) {
        if (!eventIdArr.includes(filteredTags[i].imageId)) {
            eventIdArr.push(filteredTags[i].imageId)
        }
    }

    // Filters all the images that matches the imageIds in the eventIdArr (All the images that have the tagname in url)
    const filteredByTag = imagesArr.filter(image => eventIdArr.includes(image.id))

    // Filters all the images whose title matches the tagname in url
    const filteredByTitle = imagesArr.filter(image => image.title.toLowerCase().includes(tagname.toLowerCase()))

    // Comining the two arrays of images (Tagged and Title) into a single array
    const combinedFiltered = filteredByTag.concat(filteredByTitle)

    // Loops thorugh combined filtered array and only pushes the unique images into a new array
    let finalFiltered = [];

    for (let i = 0; i < combinedFiltered.length; i++) {
        if (!finalFiltered.includes(combinedFiltered[i])) {
            finalFiltered.push(combinedFiltered[i])
        }
    }

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
                        <div className="tagsearch-images-container">
                            {finalFiltered.map((image, i) => {
                                return (
                                    <div key={i}>
                                        #{tagname}
                                        <ImageCard image={image} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        dispatch(getAllTags())
        dispatch(getAllImages())
    }, [dispatch])

    return (
        <>
            {results}
        </>
    )
};
export default SingleTag;