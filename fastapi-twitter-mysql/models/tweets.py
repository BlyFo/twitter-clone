from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, JSON
from config.db import meta, engine

tweets = Table("tweets", meta,
               Column("tweet_id", Integer, primary_key=True),
               Column("user_name", String(50), ForeignKey('users.user_name')),
               Column("content", String(255)),
               Column("reply_to", String(256)),
               Column("created_at", DateTime),
               Column("likes_count", Integer),
               Column("comments_count", Integer),
               Column("hashtags", JSON)
               )

meta.create_all(engine)
