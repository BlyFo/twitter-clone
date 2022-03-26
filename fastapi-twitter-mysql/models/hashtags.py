from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String
from config.db import meta, engine

hashtags = Table("hashtags", meta,
                 Column("name", String(100), primary_key=True),
                 Column("count", Integer)
                 )

meta.create_all(engine)
