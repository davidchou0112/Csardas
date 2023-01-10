import './TagBigCard.css'
import { useHistory } from 'react-router-dom'

const TagBigCard = ({ tagname, images, tags }) => {

    const history = useHistory();

    const tagsArr = Object.values(tags);

    const imagesArr = Object.values(images);
    // console.log(`this is imagesArr, from AllTagsBigCard -- : `, imagesArr)
    const filteredTags = tagsArr.filter(tag => tag?.name === tagname);

    let eventIdArr = [];
    for (let i = 0; i < filteredTags.length; i++) {
        if (!eventIdArr.includes(filteredTags[i].imageId)) {
            eventIdArr.push(filteredTags[i].imageId)
        }
    }

    const filteredByTag = imagesArr.filter(image => eventIdArr.includes(image?.id))
    const filteredByTitle = imagesArr.filter(image => image?.title.toLowerCase().includes(tagname?.toLowerCase()))
    const finalFiltered = filteredByTag.concat(filteredByTitle)
    const randomNum = Math.floor(Math.random() * finalFiltered.length)
    const randomImage = finalFiltered[randomNum]

    return (
        <div className='tagbigcard-container' onClick={() => history.push(`/tags/${tagname}`)}>
            <img className='tagbigcard-pic' src={randomImage?.image_url} alt=''></img>
            <div className='tagbigcard-text'>#{tagname}</div>
        </div>
    )
}

export default TagBigCard;