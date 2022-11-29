from app.models import db, Comment, environment,SCHEMA

def seed_comments():
    u1c1 = Comment(
        body = 'Great shot!', user_id= 1, image_id=6
    )
    u1c2 = Comment(
        body = 'I have been here, great place.', user_id= 1, image_id=7
    )
    u1c3 = Comment(
        body = 'Gas prices these days tho..', user_id= 1, image_id=8
    )
    u1c4 = Comment(
        body = 'WOOOOOww!', user_id= 1, image_id=9
    )
    u1c5 = Comment(
        body = 'Water tho..', user_id= 1, image_id=11
    )
    
    u2c1 = Comment(
        body = 'Nice!!', user_id= 2, image_id=1
    )
    u2c2 = Comment(
        body = 'You think now ya a big shot eh?', user_id= 2, image_id=3
    )
    u3c1 = Comment(
        body = 'Great angles!!', user_id= 3, image_id=1
    )
    u3c2 = Comment(
        body = 'Wow thats filthy.', user_id= 3, image_id=11
    )
    
    db.session.add(u1c1)
    db.session.add(u1c2)
    db.session.add(u1c3)
    db.session.add(u1c4)
    db.session.add(u1c5)
    db.session.add(u2c1)
    db.session.add(u2c2)
    db.session.add(u3c1)
    db.session.add(u3c2)

    db.session.commit()
    
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()