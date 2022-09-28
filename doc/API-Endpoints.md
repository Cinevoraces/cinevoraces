# API Endpoints
Query strings uses [qs package](https://www.npmjs.com/package/qs), see the repo's `README.md` if you need documentation.

qs is "plugged" in fastify options object.
```typescript
import Fastify from 'fastify';
import qs from 'qs';

const fastify = Fastify({
  querystringParser: str => qs.parse(str)
});
```

Endpoints complete documentation will be writted later with Swagger, ***this isn't the documentation***.

## MOVIES

### :green_circle: GET

### **`/movies?`**
**Return:** all movies object where `is_published=true`

**Query strings:**
- `filter[ispublished]=`: Boolean -> Filter by boolean (default to `true`)
- `filter[userid]=`: Number -> Filter by user id
- `filter[season]=`: Number -> Filter by season
- `filter[latest]=`: Number -> Return the last `x` movies
- `filter[bookmarked]=`: Boolean -> Filter by boolean
- `filter[rated]=`: Boolean -> Filter by boolean
- `filter[viewed]=`: Boolean -> Filter by boolean
- `filter[liked]=`: Boolean -> Filter by boolean
- `pop[rate]=`: Boolean -> Populate with average rating value
- `pop[interactions]=`: Boolean -> Populate with user interaction data (Logged user only)

### **`/movies/:movieId?`**
**Return:** corresponding movie object if `is_published=true`

**Query strings:**
- `pop[rate]=`: Boolean -> Populate with average rating value
- `pop[comments]`: Boolean -> Populate with users comments
- `pop[interactions]=`: Boolean -> Populate with user interaction data (Logged user only)

### **`/movies/latest?`**
**Return:** Latest movie object where `is_published=true`

**Query strings:**
- `pop[rate]=`: Boolean -> Populate with average rating value
- `pop[comments]`: Boolean -> Populate with users comments
- `pop[interactions]=`: Boolean -> Populate with user interaction data (Logged user only)

###  :yellow_circle: POST

### **`/movies` *(Logged user only)***
**Body**

```json
{
  "french_title": "String",
  "original_title": "String",
  "poster_url": "String",
  "directors": "Array",
  "release_date": "String",
  "runtime": "Number",
  "casting": "Array",
  "presentation": "String",
  "publishing_date": "String",
  "user_id": "Number",
  "season_id": "Number",
  "movie_genres": "Array",
  "movie_languages": "Array",
  "movie_countries": "Array"
}
```

### :orange_circle: PUT

### **`/movies/:movieId`**
*(Can only be used by movie's "owner")*

**Body**

```json
{
  "french_title": "String",
  "original_title": "String",
  "poster_url": "String",
  "directors": "Array",
  "release_date": "String",
  "runtime": "Number",
  "casting": "Array",
  "presentation": "String",
  "season_id": "Number",
  "movie_genres": "Array",
  "movie_languages": "Array",
  "movie_countries": "Array"
}
```

### **`/movies/publish/:movieId` *(Admin only)***

**Body**

```json
{
  "is_published": "String",
  "publishing_date": "String"
}
```

### :red_circle: DELETE

### **`/movies/:movieId`**
*(Can only be used by movie's "owner")*

## METRICS

### :green_circle: GET
### **`/metrics`**
**Return:** website metrics object

### **`/metrics/:userId`**
**Return:** user metrics object

## SLOTS

### :green_circle: GET
### **`/slots?`**
**Return:** all proposition slots

**Query strings:**
- `filter[isbooked]=`: Boolean -> Filter by boolean
- `filter[userid]=`: Number -> Filter by user id

## USERS

### :green_circle: GET
### **`/users?`**
**Return:** all users public data

### **`/users/:userId`**
**Return:** user public data

**Query strings:**
- `pop[movies]=`: Boolean -> populate with movie(s) proposed
- `pop[comments]=`: Boolean -> populate with comments posted
- `pop[reviews]=`: Boolean -> populate with metrics

### :orange_circle: PUT

### **`/users/:userId` (Logged user only)**

**Body**

```json
{
  "password": "String", // Required
  "pseudo": "String",
  "mail": "String",
  "updated_password": "String"
}
```

### **`/users/picture/:userId` (Logged user only)**

**Body**

```json
// To define
```

### **`/users/role:userId` *(Admin only)***

**Body**

```json
{
  "role": "String"
}
```

### :red_circle: DELETE

### **`/users/:userId` *(Admin only)***

## USERS

### :yellow_circle: POST

### **`/auth/register`**

### **`/auth/login`**

### **`/auth/logout`**