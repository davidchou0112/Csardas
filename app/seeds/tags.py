from app.models import db, Tag, environment, SCHEMA

def seed_tags():
    v1 = Tag(
        name='cyberpunk', user_id= 1, image_id=1
    )
    v2 = Tag(
        name='people', user_id= 1, image_id=1
    )
    v3 = Tag(
        name='corpo-rat', user_id= 1, image_id=1
    )
    v4 = Tag(
        name='nomad', user_id= 1, image_id=1
    )
    v5 = Tag(
        name='streetkid', user_id= 1, image_id=1
    )
    
    vik1 = Tag(
        name='cyberpunk', user_id= 1, image_id=2
    )
    vik2 = Tag(
        name='people', user_id= 1, image_id=2
    )
    vik3 = Tag(
        name='corpo-rat', user_id= 1, image_id=2
    )
    vik4 = Tag(
        name='nomad', user_id= 1, image_id=2
    )
    
    rat1 = Tag(
        name='cyberpunk', user_id= 1, image_id=3
    )
    rat2 = Tag(
        name='people', user_id= 1, image_id=3
    )
    rat3 = Tag(
        name='corpo-rat', user_id= 1, image_id=3
    )
    
    nomad1 = Tag(
        name='cyberpunk', user_id= 1, image_id=4
    )
    nomad2 = Tag(
        name='people', user_id= 1, image_id=4
    )
    nomad3 = Tag(
        name='nomad', user_id= 1, image_id=4
    )
    
    streetkid1 = Tag(
        name='cyberpunk', user_id= 1, image_id=5
    )
    streetkid2 = Tag(
        name='people', user_id= 1, image_id=5
    )
    streetkid3 = Tag(
        name='streetkid', user_id= 1, image_id=5
    )
    
    city1 = Tag(
        name='cyberpunk', user_id= 2, image_id=6
    )
    city2 = Tag(
        name='city', user_id= 2, image_id=6
    )
    city3 = Tag(
        name='night', user_id= 2, image_id=6
    )
    city4 = Tag(
        name='people', user_id= 2, image_id=6
    )
    city5 = Tag(
        name='heart', user_id= 2, image_id=6
    )
    
    city6 = Tag(
        name='cyberpunk', user_id= 2, image_id=7
    )
    city7 = Tag(
        name='city', user_id= 2, image_id=7
    )
    city8 = Tag(
        name='night', user_id= 2, image_id=7
    )
    city9 = Tag(
        name='hotel', user_id= 2, image_id=7
    )
    
    city10 = Tag(
        name='cyberpunk', user_id= 2, image_id=8
    )
    city11 = Tag(
        name='city', user_id= 2, image_id=8
    )
    city12 = Tag(
        name='night', user_id= 2, image_id=8
    )
    
    city13 = Tag(
        name='cyberpunk', user_id= 2, image_id=9
    )
    city14 = Tag(
        name='city', user_id= 2, image_id=9
    )
    city15 = Tag(
        name='night', user_id= 2, image_id=9
    )
    
    city16 = Tag(
        name='cyberpunk', user_id= 3, image_id=10
    )
    city17 = Tag(
        name='city', user_id= 3, image_id=10
    )
    city18 = Tag(
        name='day', user_id= 3, image_id=10
    )
    
    city19 = Tag(
        name='cyberpunk', user_id= 3, image_id=11
    )
    city20 = Tag(
        name='city', user_id= 3, image_id=11
    )
    city21 = Tag(
        name='day', user_id= 3, image_id=11
    )
    city22 = Tag(
        name='bridge', user_id= 3, image_id=11
    )
    
    db.session.add(v1)
    db.session.add(v2)
    db.session.add(v3)
    db.session.add(v4)
    db.session.add(v5)
    
    db.session.add(vik1)
    db.session.add(vik2)
    db.session.add(vik3)
    db.session.add(vik4)
    
    db.session.add(rat1)
    db.session.add(rat2)
    db.session.add(rat3)
    
    db.session.add(nomad1)
    db.session.add(nomad2)
    db.session.add(nomad3)
    
    db.session.add(streetkid1)
    db.session.add(streetkid2)
    db.session.add(streetkid3)
    
    db.session.add(city1)
    db.session.add(city2)
    db.session.add(city3)
    db.session.add(city4)
    db.session.add(city5)
    
    db.session.add(city6)
    db.session.add(city7)
    db.session.add(city8)
    db.session.add(city9)
    
    db.session.add(city10)
    db.session.add(city11)
    db.session.add(city12)
    
    db.session.add(city13)
    db.session.add(city14)
    db.session.add(city15)
    
    db.session.add(city16)
    db.session.add(city17)
    db.session.add(city18)
    
    db.session.add(city19)
    db.session.add(city20)
    db.session.add(city21)
    db.session.add(city22)
    
    db.session.commit()
    
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tags")
        
    db.session.commit()