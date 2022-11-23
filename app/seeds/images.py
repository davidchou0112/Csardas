from app.models import db, Image, environment, SCHEMA

def seed_images():
    image1 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image2 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image3 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image4 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image5 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image6 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image7 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image8 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image9 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image10 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    image11 = Image(
        id= , title = '', description = '', image_url = '', user_id = ''
    )
    
    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.commit()
    
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()