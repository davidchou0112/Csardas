from app.models import db, Image, environment, SCHEMA

def seed_images():
    
    vik = Image(
        title = 'Viktor Vektor', description = 'Viktor Vektor, or Vik for short, is a ripperdoc in Cyberpunk 2077. His clinic is located behind Mistys store in Little China, Watson. Talented, patient, and professional, Viktor has extended Vs credit on a number of occasions, but never complains.', image_url = 'https://drive.google.com/uc?export=view&id=1SoN3NWlDsvk7yU48-qZD7JXvIXFK_8ts', user_id = 1
    )
    nomad = Image(
        title = 'The Nomad', description = 'The Nomad is a main job in Cyberpunk 2077. It is one of the three possible starting jobs, and is only available to players who chose the Nomad Lifepath.', image_url = 'https://drive.google.com/uc?export=view&id=1gJd53QwQd4wX3YcQ48addF9qPfOYfnLK', user_id = 1
    )
    u1px12 = Image(
        title = 'Overseer', description = 'His music became revolutionary, starting the rockerboy movement and becoming an overnight sensation. He rose to the top of the US charts in record time with his band. However despite their success, Samurai struggled as personal issues made it to the surface.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205925/12_qtjiua.jpg', user_id = 3    
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
    u1px6 = Image(
        title = 'Johnny Silverhand', description = 'I saw corps ... transform Night City into a machine fueled by peoples crushed spirits, broken dreams and emptied pockets. Corpsve long controlled our lives, taken lots... and now theyre after our souls! ... Ive declared war not cause capitalisms a thorn in my side or outta nostalgia for an America gone by. This wars a peoples war against a system thats spiralled outta our control.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205921/4_d66w5e.jpg', user_id = 1    
    )
    corpoRat = Image(
        title = 'The Corpo-Rat', description = 'The Corpo-Rat is a main job in Cyberpunk 2077. It is one of the three possible starting jobs, and is only available to players who chose the Corpo Lifepath.', image_url = 'https://drive.google.com/uc?export=view&id=1IRnBKYAum92FohLeA3Doq8k2PxnRHMUF', user_id = 1
    )
    u1px8 = Image(
        title = 'Voodoo', description = 'TTI partners with many corporations such as Arasaka, Militech, Night Corp, Biotechnica, or Kiroshi, allowing certain employees access to Trauma Team memberships without paying for the service themselves. The medical corporation also manufacturers its own products for the general public to use.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205923/9_d9xfhw.jpg', user_id = 1    
    )
    u1px9 = Image(
        title = 'Rebecca', description = 'Rebecca is a very sharp-tongued young woman, and has a tendency to be extreme and unpredictable. She is often shown going all out in fights, sometimes even laughing manically. Nevertheless, Rebecca is loyal and does everything for the crew of Maine, including supporting newcomer David where she can.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205923/8_jeeq95.jpg', user_id = 3  
    )
    u1px10 = Image(
        title = 'Trauma Team', description = 'Trauma Team International (TTI) is a corporation that specializes in rapid response medical services. As the premium paramedical franchise, Trauma Team™ is one of the most notable corporations of the 21st century. The company automatically bills their patients from the moment they receive the order to the location of retrieval.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205924/11_gjf01x.jpg', user_id = 3    
    )
    nightcity2 = Image(
        title = 'Hotel', description = 'There will alawys be room for one more.', image_url = 'https://drive.google.com/uc?export=view&id=1GgViur93yeRxvvVI-De9ywcuaKB2dJYa', user_id = 2
    )
    u1px11 = Image(
        title = 'Lucyna Kushinada', description = 'Lucy is a level-head, street-smart netrunner with a top-tier sense of self-preservation. Being a netrunner means Lucy can disrupt the cyberware of other people, leaving them shocked, stunned or even unconscious. Once her target has been neutralized, she can enter their consciousness via the port in the back of her head or with one of the other cybernetic enhancements that allow her to hack on the fly.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205924/13_doehmp.jpg', user_id = 1    
    )
        
    daycity2 = Image(
        title = 'Bridge Connection', description = 'Artifical intelligance has allowed humans to play god.', image_url = 'https://drive.google.com/uc?export=view&id=1830ip8aVs9V-FG5_Y-LqXYg7nmfxq8Rk', user_id = 3
    )
    u1px13 = Image(
        title = 'Cyberpunk 2077', description = 'Cyberpunk 2077 is an action role-playing video game developed by CD Projekt Red and published by CD Projekt. The story takes place in Night City, an open world set in the Cyberpunk universe.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205925/15_zrooir.jpg', user_id = 1    
    )
    streetKid = Image(
        title = 'The Streetkid', description = 'The Streetkid is a main job in Cyberpunk 2077. It is one of the three possible starting jobs, and is only available to players who chose the Streetkid Lifepath.', image_url = 'https://drive.google.com/uc?export=view&id=18mADBSqB7xP6cFWlGHtJjiQeJBBuGC6b', user_id = 1
    )
    u1px14 = Image(
        title = 'End of days', description = 'I never really gave up on breakin out of this two-star town. I got the green light, I got a little fight. Im gonna turn this thing around.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205925/10_glso6h.jpg', user_id = 2    
    )
    u1px15 = Image(
        title = 'Read my mind', description = 'On the corner of Main Street just tryna keep it in line you say you wanna move on and you say Im fallin behind, can you read my mind? Can you read my mind', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205926/3_mzvckt.jpg', user_id = 2    
    )
    v = Image(
        title = 'V', description = 'V, an alias for Valerie, is a mercenary involved in a series of singular events during the year 2077, which toppled the balance of power in Night City.', image_url = 'https://drive.google.com/uc?export=view&id=1TQ-39c2h2osp9Vg_0ztGuF-TaNhGcrsC', user_id = 1
    )
    u1px16 = Image(
        title = 'Gasp!!', description = 'You said how much money???', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205926/14_m2oivf.jpg', user_id = 1    
    )
    nightcity1 = Image(
        title = 'Love Night City', description = 'No place like home.', image_url = 'https://drive.google.com/uc?export=view&id=1hMqj2oA2-0R8Le05tzvwSHUNzqMv_j7e', user_id = 2
    )
    u1px17 = Image(
        title = 'Yoru', description = 'He is a radiant from Tokyo, Japan. Japanese native, Yoru, rips holes straight through reality to infiltrate enemy lines unseen. Using deception and aggression in equal measure, he gets the drop on each target before they know where to look.', image_url = 'https://res.cloudinary.com/da1ss0a61/image/upload/v1670205931/7_wb1iny.jpg', user_id = 1    
    )
    
    db.session.add(vik)
    db.session.add(nomad)
    db.session.add(u1px12)
    db.session.add(nightcity3)
    db.session.add(nightcity4)
    db.session.add(daycity1)
    db.session.add(u1px6)
    db.session.add(corpoRat)
    db.session.add(u1px8)
    db.session.add(u1px9)
    db.session.add(u1px10)
    db.session.add(nightcity2)
    db.session.add(u1px11)
    
    db.session.add(daycity2)
    db.session.add(u1px13)
    db.session.add(streetKid)
    db.session.add(u1px14)
    db.session.add(u1px15)
    db.session.add(v)
    db.session.add(u1px16)
    db.session.add(nightcity1)
    db.session.add(u1px17)
    db.session.commit()
    
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()