from app.models import db, Image, environment, SCHEMA

def seed_images():
    v = Image(
        title = 'V', description = 'V, an alias for Valerie, is a mercenary involved in a series of singular events during the year 2077, which toppled the balance of power in Night City.', image_url = 'https://drive.google.com/uc?export=view&id=1TQ-39c2h2osp9Vg_0ztGuF-TaNhGcrsC', user_id = 1
    )
    vik = Image(
        title = 'Viktor Vektor', description = 'Viktor Vektor, or Vik for short, is a ripperdoc in Cyberpunk 2077. His clinic is located behind Mistys store in Little China, Watson. Talented, patient, and professional, Viktor has extended Vs credit on a number of occasions, but never complains.', image_url = 'https://drive.google.com/uc?export=view&id=1SoN3NWlDsvk7yU48-qZD7JXvIXFK_8ts', user_id = 1
    )
    corpoRat = Image(
        title = 'The Corpo-Rat', description = 'The Corpo-Rat is a main job in Cyberpunk 2077. It is one of the three possible starting jobs, and is only available to players who chose the Corpo Lifepath.', image_url = 'https://drive.google.com/uc?export=view&id=1IRnBKYAum92FohLeA3Doq8k2PxnRHMUF', user_id = 1
    )
    nomad = Image(
        title = 'The Nomad', description = 'The Nomad is a main job in Cyberpunk 2077. It is one of the three possible starting jobs, and is only available to players who chose the Nomad Lifepath.', image_url = 'https://drive.google.com/uc?export=view&id=1gJd53QwQd4wX3YcQ48addF9qPfOYfnLK', user_id = 1
    )
    streetKid = Image(
        title = 'The Streetkid', description = 'The Streetkid is a main job in Cyberpunk 2077. It is one of the three possible starting jobs, and is only available to players who chose the Streetkid Lifepath.', image_url = 'https://drive.google.com/uc?export=view&id=18mADBSqB7xP6cFWlGHtJjiQeJBBuGC6b', user_id = 1
    )
    nightcity1 = Image(
        title = 'Love Night City', description = 'No place like home.', image_url = 'https://drive.google.com/uc?export=view&id=1hMqj2oA2-0R8Le05tzvwSHUNzqMv_j7e', user_id = 2
    )
    nightcity2 = Image(
        title = 'Hotel', description = 'There will alawys be room for one more.', image_url = 'https://drive.google.com/uc?export=view&id=1GgViur93yeRxvvVI-De9ywcuaKB2dJYa', user_id = 2
    )
    nightcity3 = Image(
        title = 'TURBO', description = 'Crime here every other night..', image_url = 'https://drive.google.com/uc?export=view&id=1FlxY0EHeoqxy_rz9yRX8H22E5Szj3mHk', user_id = 2
    )
    nightcity4 = Image(
        title = 'Concrete Jungle', description = 'The streets are never dark, nor alone.', image_url = 'https://drive.google.com/uc?export=view&id=1LST9rywfdGhD5BYbTJzJOChRQVMfwxxv', user_id = 2
    )
    daycity1 = Image(
        title = 'Metropolis', description = 'Flying cars and magnificant skyscrapers.', image_url = 'https://drive.google.com/uc?export=view&id=1q0Pcr36epZqHX5vQifcxMvnPV92dBCRT', user_id = 3
    )
    daycity2 = Image(
        title = 'Bridge Connection', description = 'Artifical intelligance has allowed humans to play god.', image_url = 'https://drive.google.com/uc?export=view&id=1830ip8aVs9V-FG5_Y-LqXYg7nmfxq8Rk', user_id = 3
    )
    
    db.session.add(v)
    db.session.add(vik)
    db.session.add(corpoRat)
    db.session.add(nomad)
    db.session.add(streetKid)
    db.session.add(nightcity1)
    db.session.add(nightcity2)
    db.session.add(nightcity3)
    db.session.add(nightcity4)
    db.session.add(daycity1)
    db.session.add(daycity2)
    db.session.commit()
    
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()