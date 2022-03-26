from pydantic import BaseModel, EmailStr
from pydantic import Field
from datetime import datetime
from typing import Optional
from enum import Enum
from uuid import UUID


class Gender(Enum):
    male = 'male'
    female = 'female'
    non_binary = 'non binary'
    three = 'other'


class LoginUser(BaseModel):
    user_name: str = Field(
        ...,
        min_length=1,
        max_length=50,
        example='xXjuanitoXx'
    )
    password: str = Field(
        ...,
        min_length=8,
        max_length=64,
        example='7AKpSEkw'
    )


class BaseUser(LoginUser):

    first_name: str = Field(
        ...,
        min_length=1,
        max_length=50,
        example='Juanito'
    )
    last_name: str = Field(
        ...,
        min_length=1,
        max_length=50,
        example='Perez'
    )
    email: EmailStr = Field(
        ...,
        example='JPerez@example.com'
    )
    bio: Optional[str] = Field(
        default=None,
        min_length=0,
        max_length=256,
        example='Best gamer in the world. :D'
    )
    gender: Gender = Field(
        ...,
        example=Gender.male
    )


class User(BaseUser):
    created_at: datetime = Field(
        ...,
        example=datetime.now()
    )


class FullUser(User):
    id: int = Field(..., ge=0)
