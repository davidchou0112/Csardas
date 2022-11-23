from app.models import db, Image, environment, SCHEMA

def seed_images():
    v = Image(
        title = 'V', description = 'V, an alias for Valerie, is a mercenary involved in a series of singular events during the year 2077, which toppled the balance of power in Night City.', image_url = '', user_id = '1'
    )
    vik = Image(
        title = 'Viktor Vektor', description = 'Viktor Vektor, or Vik for short, is a ripperdoc in Cyberpunk 2077. His clinic is located behind Mistys store in Little China, Watson. Talented, patient, and professional, Viktor has extended Vs credit on a number of occasions, but never complains.', image_url = '', user_id = '1'
    )
    corpoRat = Image(
        title = 'The Corpo-Rat', description = '', image_url = '', user_id = '1'
    )
    nomad = Image(
        title = 'The Nomad', description = '', image_url = '', user_id = '1'
    )
    streetKid = Image(
        title = 'The Streetkid', description = '', image_url = '', user_id = '1'
    )
    image6 = Image(
        title = '', description = '', image_url = '', user_id = '2'
    )
    image7 = Image(
        title = '', description = '', image_url = '', user_id = '2'
    )
    image8 = Image(
        title = '', description = '', image_url = '', user_id = '2'
    )
    image9 = Image(
        title = '', description = '', image_url = '', user_id = '3'
    )
    image10 = Image(
        title = '', description = '', image_url = '', user_id = '3'
    )
    image11 = Image(
        title = '', description = '', image_url = '', user_id = '3'
    )
    
    db.session.add(v)
    db.session.add(vik)
    db.session.add(corpoRat)
    db.session.add(nomad)
    db.session.add(streetKid)
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