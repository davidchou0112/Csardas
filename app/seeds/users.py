from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    yoru = User(
        username='Yoruki', firstname= 'Yoru', lastname= 'Sama', email='yoru@aa.io', password='password')
    skye = User(
        username='Syke', firstname= 'Skye', lastname= 'Dono', email='skye@aa.io', password='password')
    reyna = User(
        username='Rey Rey', firstname= 'Reyna', lastname= 'San', email='reyna@aa.io', password='password')

    db.session.add(yoru)
    db.session.add(skye)
    db.session.add(reyna)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()