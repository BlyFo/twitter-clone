from fastapi import FastAPI
from routes.user import user
from routes.tweets import tweet_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Twitter Clone",
    description="Simple back-end Twitter clone"
)

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user)
app.include_router(tweet_router)
