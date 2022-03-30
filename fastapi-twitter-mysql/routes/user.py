from typing import List
from datetime import datetime

from fastapi import APIRouter, status, HTTPException, Depends

from models.users import users
from schemas.user import User, BaseUser, LoginUser

from config.db import conn

from authentication.auth import AuthHandler

user = APIRouter(
    prefix="/users",
    tags=["Users"],
)

auth_handler = AuthHandler()


@user.get(
    path="/",
    response_model=List[User],
    response_model_exclude=["password"],
    status_code=status.HTTP_200_OK,
    summary="get all users",
)
def get_users():
    return conn.execute(users.select()).fetchall()


@user.post(
    path="/create",
    response_model=BaseUser,
    response_model_exclude=["password"],
    status_code=status.HTTP_201_CREATED,
    summary="register a user",
)
def create_user(user: BaseUser):
    new_user = user.dict()
    new_user['created_at'] = datetime.now()

    result = conn.execute(
        users.select().where(users.c.user_name == new_user['user_name'])
    ).first()
    if result != None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username is taken"
        )

    result = conn.execute(
        users.select().where(users.c.email == new_user['email'])
    ).first()
    if result != None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email in use"
        )
    new_user['password'] = auth_handler.get_password_hash(new_user['password'])

    conn.execute(users.insert().values(new_user))
    result = conn.execute(
        users.select().where(users.c.user_name == new_user['user_name'])
    ).first()
    if result == None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="User could not be created"
        )
    return result


@user.post(
    path="/login",
    response_model_exclude=["password"],
    status_code=status.HTTP_202_ACCEPTED,
    summary="login a user",
)
def login_user(user: LoginUser):

    user_info = conn.execute(
        users.select().where(users.c.user_name == user.user_name)
    ).first()

    if user_info == None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username and/or password'
        )

    if not auth_handler.verify_password(user.password, user_info.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username and/or password'
        )

    token = auth_handler.encode_token(user.user_name)
    return {
        'token': token,
        'firstName': user_info.first_name
    }


@user.get(
    path="/{user_name}",
    response_model=User,
    response_model_exclude=["password"],
    status_code=status.HTTP_200_OK,
    summary="get a user",
)
def get_user(user_name: str):

    result = conn.execute(
        users.select().where(users.c.user_name == user_name)
    ).first()
    if result == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return result


@user.delete(
    path="/{user_name}",
    response_model=User,
    response_model_exclude=["password"],
    status_code=status.HTTP_200_OK,
    summary="delete a user",
)
def delete_user(user_name: str, token_username=Depends(auth_handler.auth_wrapper)):

    if user_name != token_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication error"
        )

    deleted_user = conn.execute(users.select().where(
        users.c.user_name == user_name)).first()
    if deleted_user == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    conn.execute(users.delete().where(users.c.user_name == user_name))

    check_deleted = conn.execute(
        users.select().where(users.c.user_name == user_name)
    ).first()
    if check_deleted != None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="User could not be deleted"
        )
    return deleted_user


@user.put(
    path="/{user_name}",
    response_model=User,
    response_model_exclude=["password"],
    status_code=status.HTTP_200_OK,
    summary="update a user",
)
def update_user(user_name: str, user: BaseUser, token_username=Depends(auth_handler.auth_wrapper)):

    if user_name != token_username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication error"
        )
    if user_name != user.user_name:
        check_username = conn.execute(
            users.select().where(users.c.user_name == user_name)
        ).first()
        if check_username != None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Username is taken"
            )

    conn.execute(users.update().values(
        user_name=user.user_name,
        first_name=user.first_name,
        last_name=user.last_name,
        password=user.password,
        email=user.email,
        bio=user.bio
    ).where(users.c.user_name == user_name))

    return conn.execute(users.select().where(users.c.user_name == user_name)).first()
