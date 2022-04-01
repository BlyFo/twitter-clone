from pydantic import BaseModel
from pydantic import Field
from datetime import datetime
from typing import List, Optional, Dict, TypedDict
from uuid import UUID


class TweetInfo(TypedDict):
    like_count: int
    liked: bool
    comment_count: int
    commented: bool


class FullTweetInfo(TweetInfo):
    liked_by: List[str]
    comment_by: List[str]


class UserNameTweet(BaseModel):
    user_name: str = Field(...)


class BaseTweet(BaseModel):
    reply_to: Optional[int] = Field(default=None, ge=0)
    user_name: str = Field(
        ...,
        min_length=1,
        max_length=50,
        example='xXjuanitoXx'
    )
    content: str = Field(
        ...,
        min_length=1,
        max_length=256,
        example='i love apples and pinapples.'
    )


class SimpleTweet(BaseTweet):
    info: TweetInfo
    created_at: datetime = Field(default=datetime.now())


class FullTweet(BaseTweet):
    tweet_id: int = Field(..., ge=0)
    info: FullTweetInfo
    first_name: str = Field(...)
    created_at: datetime = Field(default=datetime.now())
