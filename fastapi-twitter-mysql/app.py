from fastapi import FastAPI
from routes.user import user
from routes.tweets import tweet_router

app = FastAPI(
    title="Twitter Clone",
    description="Simple back-end Twitter clone"
)
app.include_router(user)
app.include_router(tweet_router)
