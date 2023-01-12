import './TagCard.css'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const TagCard = ({ tag }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    let tagCard = (
        <div className='tag-card-tag-nouser' style={{ paddingRight: 10 }} onClick={() => history.push(`/tags/${tag?.name}`)}>#{tag?.name}</div>
    )

    return (
        <div className='tag-card-container'>
            {tagCard}
        </div>
    )


}
export default TagCard;