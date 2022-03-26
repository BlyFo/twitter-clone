from pydantic import BaseModel
from pydantic import Field
from datetime import datetime
from typing import List, Optional, Dict, TypedDict
from uuid import UUID


class TweetInfo(TypedDict):
    like_count: int
    liked_by: List[str]
    comment_count: int
    comment_by: List[str]


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


class Tweet(BaseTweet):
    info: TweetInfo
    created_at: datetime = Field(default=datetime.now())


class FullTweet(Tweet):
    tweet_id: int = Field(..., ge=0)
