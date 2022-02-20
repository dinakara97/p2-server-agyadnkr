# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /genres`
- `GET /genres`
- `POST /movies`
- `GET /movies`
- `GET /movies/:id`
- `PUT /movies/:id`
- `DELETE /movies/:id`
- `PATCH /movies/:id`
- `GET /histories`
- `POST /public/register`
- `POST /public/login`
- `GET /public/movies`
- `GET /public/movies/:id`
- `POST /public/movies/:id`
- `GET /public/bookmarks`
- `GET /public/genres`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "city": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "role": "string",
  "address": "string",
  "phoneNumber": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email address already in use!!"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email"
}
OR
{
  "message": "Invalid Password"
```

&nbsp;

## 3. POST /genres

Description:

- Create a genre

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 5,
  "name": "Thriller",
  "updatedAt": "2022-01-31T17:04:52.860Z",
  "createdAt": "2022-01-31T17:04:52.860Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

&nbsp;

## 4. GET /genres

Description:

- Get all genres from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Action"
  },
  {
    "id": 2,
    "name": "Comedy"
  },
  {
    "id": 3,
    "name": "Romance"
  },
  {
    "id": 4,
    "name": "Documentary"
  },
  {
    "id": 5,
    "name": "Thriller"
  },
  {
    "id": 6,
    "name": "Horror"
  }
]
```

&nbsp;

## 5. POST /movies

Description:

- Create a movie

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "synopsis": "text",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": 7,
  "title": "Captain America: The First Avenger",
  "synopsis": "Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a \"Super-Soldier serum\". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.",
  "trailerUrl": "https://www.imdb.com/video/vi2912787481?playlistId=tt0458339",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_FMjpg_UX1000_.jpg",
  "rating": 7,
  "genreId": 1,
  "authorId": 1,
  "updatedAt": "2022-01-31T17:09:25.258Z",
  "createdAt": "2022-01-31T17:09:25.258Z"
}
```

_Response (400 - Bad Request)_

```json

{
  "message": "Title is required"
}
OR
{
  "message": "Synopsis is required"
}
OR
{
  "message": "Minimum rating is 1 star"
}
```

&nbsp;

## 6. GET /movies

Description:

- Get all movies from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Captain America: The First Avenger",
    "synopsis": "Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a \"Super-Soldier serum\". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.",
    "trailerUrl": "https://www.imdb.com/video/vi2912787481?playlistId=tt0458339",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_FMjpg_UX1000_.jpg",
    "rating": 7,
    "genreId": 1,
    "authorId": 1,
    "Genre": {
      "name": "Action",
      "id": 1
    },
    "User": {
      "username": null,
      "email": "1@m.com",
      "role": "Admin"
    }
  },
  {
    "id": 2,
    "title": "The SpongeBob Movie: Sponge on the Run",
    "synopsis": "After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic adventure to The Lost City of Atlantic City to bring Gary home.",
    "trailerUrl": "https://www.imdb.com/video/vi3578838809?playlistId=tt4823776",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    "rating": 6,
    "genreId": 2,
    "authorId": 1,
    "Genre": {
      "name": "Comedy",
      "id": 2
    },
    "User": {
      "username": null,
      "email": "1@m.com",
      "role": "Admin"
    }
  },
  {
    "id": 3,
    "title": "The Shining",
    "synopsis": "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
    "trailerUrl": "https://www.imdb.com/video/vi2689121305?playlistId=tt0081505",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    "rating": 7,
    "genreId": 6,
    "authorId": 1,
    "Genre": {
      "name": "Horror",
      "id": 6
    },
    "User": {
      "username": null,
      "email": "1@m.com",
      "role": "Admin"
    }
  }
]
```

&nbsp;

## 7. GET /movies/:id

Description:

- Get one movie from database, selected by its id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 1,
  "title": "Captain America: The First Avenger",
  "synopsis": "Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a \"Super-Soldier serum\". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.",
  "trailerUrl": "https://www.imdb.com/video/vi2912787481?playlistId=tt0458339",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_FMjpg_UX1000_.jpg",
  "rating": 7,
  "genreId": 1,
  "authorId": 1,
  "Genre": {
    "name": "Action"
  },
  "User": {
    "username": null,
    "email": "1@m.com",
    "role": "Admin"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 8. PUT /movies/:id

Description:

- Edit a movie from database, selected by its id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "synopsis": "text",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": 2,
  "title": "The SpongeBob Movie: Sponge on the Run",
  "synopsis": "After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic adventure to The Lost City of Atlantic City to bring Gary home.",
  "trailerUrl": "https://www.imdb.com/video/vi3578838809?playlistId=tt4823776",
  "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
  "rating": 8,
  "genreId": 2,
  "authorId": 1,
  "Genre": {
    "name": "Comedy"
  },
  "User": {
    "username": null,
    "email": "1@m.com",
    "role": null
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Minimum rating is 1 star"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 9. DELETE /movies/:id

Description:

- Delete a movie from database, selected by its id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Movie deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 10. PATCH /movies/:id

Description:

- Update movie status based on its id
- Status option: "Active", "Inactive", or "Archived"
- Only admin could change movie's status

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "status": "string (Option: 'Active', 'Inactive', or 'Archived')"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "movie": {
    "id": 2,
    "title": "The SpongeBob Movie: Sponge on the Run",
    "synopsis": "After SpongeBob's beloved pet snail Gary is snail-napped, he and Patrick embark on an epic adventure to The Lost City of Atlantic City to bring Gary home.",
    "trailerUrl": "https://www.imdb.com/video/vi3578838809?playlistId=tt4823776",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BOGYxYzZkMWQtNjJkMy00NTlkLWExNWMtOTNhMTg4MDcxNmU3XkEyXkFqcGdeQXVyMDk5Mzc5MQ@@._V1_.jpg",
    "rating": 6,
    "status": "Archived",
    "genreId": 2,
    "authorId": 1,
    "createdAt": "2022-02-02T10:51:51.912Z",
    "updatedAt": "2022-02-08T11:58:04.630Z"
  },
  "history": {
    "entityId": 14,
    "name": "The SpongeBob Movie: Sponge on the Run",
    "description": "Product with id 2 status has been updated from Active into Archived",
    "updatedAt": "2022-02-08T11:58:04.646Z",
    "createdAt": "2022-02-08T11:58:04.646Z",
    "updatedBy": null
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 11. GET /histories

Description:

- get all history from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "entityId": 1,
    "name": "Captain America: The First Avenger",
    "description": "Entity with id 1 updated",
    "updatedBy": 1,
    "User": {
      "id": 1,
      "username": null,
      "email": "1@m.com"
    }
  },
  {
    "entityId": 2,
    "name": "The SpongeBob Movie: Sponge on the Run",
    "description": "Product with id 2 status has been updated from Inactive into Active",
    "updatedBy": 1,
    "User": {
      "id": 1,
      "username": null,
      "email": "1@m.com"
    }
  },
  {
    "entityId": 3,
    "name": "The SpongeBob Movie: Sponge on the Run",
    "description": "Product with id 2 status has been updated from Active into Archived",
    "updatedBy": 1,
    "User": {
      "id": 1,
      "username": null,
      "email": "1@m.com"
    }
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;

## 12. POST /register

Request:

- body:

```json
{
  "username": "string" (optional),
  "email": "string",
  "password": "string",
  "phone": "string" (optional),
  "city": "string" (optional)
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "role": "string",
  "address": "string",
  "phoneNumber": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email address already in use!!"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 13. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "email": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email"
}
OR
{
  "message": "Invalid Password"
```

&nbsp;

## 14. GET /public/movies

Description:

- Get all movies from database

Request:

- query:

```json
{
  "page": "integer" (optional, default value is 1),
  "per_page": "integer" (optional, default value is 8),
  "genre": "integer" (optional),
  "search": "string" (optional),
  "sort": "string" (optional),
}

Options for sort :
- "rating": sort movie by rating from highest to lowest,
- "latest": sort movie from recently created,
- "titleDesc": sort movie by title from Z to A,
- "titleAsc": sort movie by title from A to Z,

```

_Response (200 - OK)_

```json
{
  "count": 21,
  "rows": [
    {
      "id": 19,
      "title": "Star Wars: Episode IX - The Rise of Skywalker",
      "synopsis": "In the riveting conclusion of the landmark Skywalker saga, new legends will be born-and the final battle for freedom is yet to come.",
      "trailerUrl": "https://www.imdb.com/video/vi518503961?playlistId=tt2527338",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BMDljNTQ5ODItZmQwMy00M2ExLTljOTQtZTVjNGE2NTg0NGIxXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg",
      "rating": 7,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    },
    {
      "id": 10,
      "title": "Pirates of the Caribbean: Dead Men Tell No Tales",
      "synopsis": "Captain Jack Sparrow is pursued by old rival Captain Salazar and a crew of deadly ghosts who have escaped from the Devil's Triangle. They're determined to kill every pirate at sea...notably Jack.",
      "trailerUrl": "https://www.imdb.com/video/vi172733977?playlistId=tt1790809",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTYyMTcxNzc5M15BMl5BanBnXkFtZTgwOTg2ODE2MTI@._V1_.jpg",
      "rating": 6,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    },
    {
      "id": 9,
      "title": "Spider-Man: No Way Home",
      "synopsis": "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.",
      "trailerUrl": "https://www.imdb.com/video/vi1390854937?playlistId=tt10872600&ref_=tt_ov_vi",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
      "rating": 9,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    },
    {
      "id": 8,
      "title": "Blade Runner 2049",
      "synopsis": "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
      "trailerUrl": "https://www.imdb.com/video/vi3362371865?playlistId=tt1856101&ref_=tt_pr_ov_vi",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg",
      "rating": 8,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    },
    {
      "id": 6,
      "title": "The Fast and the Furious: Tokyo Drift",
      "synopsis": "A teenager becomes a major competitor in the world of drift racing after moving in with his father in Tokyo to avoid a jail sentence in America.",
      "trailerUrl": "https://www.imdb.com/video/vi2943402009?playlistId=tt0463985&ref_=tt_pr_ov_vi",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_.jpg",
      "rating": 6,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    },
    {
      "id": 5,
      "title": "Free Guy",
      "synopsis": "A bank teller discovers that he's actually an NPC inside a brutal, open world video game.",
      "trailerUrl": "https://www.imdb.com/video/vi3038887961?playlistId=tt6264654&ref_=tt_ov_vi",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BOTY2NzFjODctOWUzMC00MGZhLTlhNjMtM2Y2ODBiNGY1ZWRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
      "rating": 7,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    },
    {
      "id": 4,
      "title": "Deadpool",
      "synopsis": "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
      "trailerUrl": "https://www.imdb.com/video/vi567457049?playlistId=tt1431045&ref_=tt_pr_ov_vi",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
      "rating": 8,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    },
    {
      "id": 3,
      "title": "Red Notice",
      "synopsis": "An Interpol agent tracks the world's most wanted art thief.",
      "trailerUrl": "https://www.imdb.com/video/vi612877081?playlistId=tt7991608&ref_=tt_ov_vi",
      "imgUrl": "https://m.media-amazon.com/images/M/MV5BZmRjODgyMzEtMzIxYS00OWY2LTk4YjUtMGMzZjMzMTZiN2Q0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
      "rating": 6,
      "status": "Active",
      "genreId": 1,
      "authorId": 1,
      "Genre": {
        "name": "Action",
        "id": 1
      }
    }
  ]
}
```

&nbsp;

## 15. GET /movies/:id

Description:

- Get one movie from database, selected by its id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 2,
    "title": "Red Notice",
    "synopsis": "An Interpol agent tracks the world's most wanted art thief.",
    "trailerUrl": "https://www.imdb.com/video/vi612877081?playlistId=tt7991608&ref_=tt_ov_vi",
    "imgUrl": "https://m.media-amazon.com/images/M/MV5BZmRjODgyMzEtMzIxYS00OWY2LTk4YjUtMGMzZjMzMTZiN2Q0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    "rating": 6,
    "status": "Active",
    "genreId": 1,
    "authorId": 1,
    "Genre": {
        "name": "Action"
    },
    "User": {
        "username": null,
        "email": "1@m.com",
        "role": "Admin"
    }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Movie not found"
}
```

&nbsp;


## 16. GET public/genres

Description:

- Get all genres from database


_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Action"
  },
  {
    "id": 2,
    "name": "Comedy"
  },
  {
    "id": 3,
    "name": "Romance"
  },
  {
    "id": 4,
    "name": "Documentary"
  },
  {
    "id": 5,
    "name": "Thriller"
  },
  {
    "id": 6,
    "name": "Horror"
  }
]
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
OR
{
  "message": "Token expired"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
