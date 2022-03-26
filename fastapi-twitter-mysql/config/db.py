from sqlalchemy import create_engine, MetaData

engine = create_engine(
    "mysql+pymysql://root:55716854q@localhost:3306/twitter_api")

meta = MetaData()

conn = engine.connect()
