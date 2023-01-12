import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import './ImageCard.css';

const ImageCard = ({ image, comments, likes, users }) => {
    const user = useSelector((state) => state.session.user)

    if (!user) {
        return (Redirect('/login'))
    }

    const imageOwner = user.id

    // const commentArr = Object.values(comments)
    // const likesArr = Object.values(likes)

    // const photoComments = commentArr.filter(comment => comment?.imageId === image?.id)

    // const userLiked = likesArr.filter(like => like?.userId === user?.id && like?.imageId === Number(image.id))
    // const photoLikes = likesArr.filter(like => like?.imageId === Number(image.id))

    let title;
    // let firstname;
    // let lastname;

    if (image?.title?.length > 18) {
        title = (image?.title)?.slice(0, 18) + '...'
    } else {
        title = (image?.title)
    }

    // if (imageOwner?.first_name?.length > 15) {
    //     firstname = (imageOwner?.first_name)?.slice(0, 15) + '...'
    // } else {
    //     firstname = (imageOwner?.first_name)?.slice(0, 15)
    // }

    // if (imageOwner?.last_name?.length > 15) {
    //     lastname = (imageOwner?.last_name)?.slice(0, 15) + '...'
    // } else {
    //     lastname = (imageOwner?.last_name)?.slice(0, 15)
    // }

    // if (imageOwner?.last_name?.length + imageOwner?.first_name?.length > 30) {
    //     lastname = ''
    // } else {
    //     lastname = (imageOwner?.last_name)
    // }

    return (
        <div className="image-card-container" key={''}>
            <Link to={`/images/${image?.id}`}>
                <img className="image-card-image" src={image?.image_url} alt=""></img>
                <div className="image-card-text-container">
                    <div>
                        <div className="image-card-text-title">{title}</div>
                        {/* <div className="image-card-text-name">{`by ${firstname} ${lastname}`}</div> */}
                    </div>
                </div>


                <div className='image-card-bottom-right-container'>

                    <div className='image-card-bottom-right'>

                        <div className="image-card-like">


                            <div className="image-card-length">
                                {/* {photoLikes?.length} */}
                            </div>

                        </div>


                        <div className="image-card-comment">

                            <i className="fa-regular fa-comment imagecardtest"></i>

                            <div className="image-card-length">
                                {/* {photoComments?.length} */}
                            </div>

                        </div>

                    </div>

                </div>

            </Link>
        </div>
    );
};
export default ImageCard;