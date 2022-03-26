from sqlalchemy import Table, Column, UniqueConstraint
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, Enum
from config.db import meta, engine
from schemas.user import Gender


users = Table("users", meta,
              Column("user_id", Integer, primary_key=True),
              Column("user_name", String(50)),
              Column("first_name", String(50)),
              Column("last_name", String(50)),
              Column("gender", Enum(Gender)),
              Column("email", String(255)),
              Column("password", String(64)),
              Column("bio", String(255)),
              Column("created_at", DateTime),
              UniqueConstraint("user_name", "email", name='uix_1')
              )

meta.create_all(engine)
