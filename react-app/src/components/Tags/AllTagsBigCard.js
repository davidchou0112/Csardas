import './TagBigCard.css'
import { useHistory } from 'react-router-dom'

const TagBigCard = ({ tagname, images, tags }) => {

    const history = useHistory();

    const tagsArr = Object.values(tags);

    const imagesArr = Object.values(images);
    // console.log(`this is imagesArr, from AllTagsBigCard -- : `, imagesArr)

    // Filters all the tags that matches the tagname in url
    const filteredTags = tagsArr.filter(tag => tag?.name === tagname);

    // Loops through the filtered tags and pushes all the imageIds of those tags into an array
    let eventIdArr = [];

    for (let i = 0; i < filteredTags.length; i++) {
        if (!eventIdArr.includes(filteredTags[i].imageId)) {
            eventIdArr.push(filteredTags[i].imageId)
        }
    }

    // Filters all the images that matches the imageIds in the eventIdArr (All the images that have the tagname in url)
    const filteredByTag = imagesArr.filter(image => eventIdArr.includes(image?.id))

    // Filters all the images whose title matches the tagname in url
    const filteredByTitle = imagesArr.filter(image => image?.title.toLowerCase().includes(tagname?.toLowerCase()))

    // Comining the two arrays of images (Tagged and Title) into a single array
    const finalFiltered = filteredByTag.concat(filteredByTitle)

    // Creates a random number between 0 and the length of the finalFiltered array
    const randomNum = Math.floor(Math.random() * finalFiltered.length)

    // Picks a random image from the finalFiltered array
    const randomImage = finalFiltered[randomNum]

    return (
        <div className='tagbigcard-container' onClick={() => history.push(`/tags/${tagname}`)}>
            <img className='tagbigcard-pic' src={randomImage?.image_url} alt=''></img>
            <div className='tagbigcard-text'>#{tagname}</div>
        </div>
    )
}

export default TagBigCard;