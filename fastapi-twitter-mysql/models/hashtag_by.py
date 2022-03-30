from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

tweets = Table("commented_by", meta,
               Column("id", Integer, primary_key=True),
               Column("hashtag", String(100), ForeignKey('hashtags.name')),
               Column("tweet_id", Integer, ForeignKey('tweets.tweet_id')),
               Column("user_name", String(50), ForeignKey('users.user_name'))
               )

meta.create_all(engine)
