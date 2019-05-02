# CodeMyMobile Task Submission
This the backend part for the task.

##Configure
```javascript
config.port = 3000;

//Database
config.database = 'database';
config.username = 'username';
config.password = 'password';
config.table_prefix = '';

//Pagination
config.paginate = true;
config.page_limit = 10;
```
- Enter the database name, username and password for connecting to local mysql. Also, enter table prefix, if any.
- `paginate` when true, enables pagination support in get request, and you can set the limit per page in `page_limit`

##Pre-requisites
- NodeJS
- MySQL

##Execution steps
- run 'npm install'
- node server.js

##Create User (POST)
Create a new user in the table with the parameters that are posted.

```
POST /users
```
**Payload**
```json
{
    "email": "pepper@gmail.com",
    "firstname": "Pepper",
    "lastName": "Pots",
    "avatar": "na"
}
```

**Response**
- If the row is created :
```json
{
  "success": 1,
  "id": inserted_id
}
```
- If parameters are missing :
```json
{
  "success": 0,
  "message": "Parameters missing"
}
```

##Get Users (GET)
Gets all users from user table

- Read Entire Table
```
GET /users
```

**Response**
- If data exsists :
```json
{
  "success": 1,
  "data": "..."
}
```
- If data missing :
```json
{
  "success": 0,
  "message": "No rows found"
}
```

##Create Friend Relationship (POST)
Create a friendship between two users.

```
POST /friends
```
**Payload**
```json
{
	"userOne":"tony@gmail.com",
	"userTwo":"pepper@gmail.com"
}
```

**Response**
- If the row is created :
```json
{
  "success": 1,
  "id": inserted_id
}
```
- If parameters are missing :
```json
{
  "success": 0,
  "message": "Parameters missing"
}
```

##Get Friends (GET)
Gets friends 

- Get all friendships
```
GET /friends
```

- Get friends for a particular user
```
GET /friends/pepper@gmail.com
```

**Response**
- If data exsists :
```json
{
  "success": 1,
  "data": "..."
}
```
- If data missing :
```json
{
  "success": 0,
  "message": "No rows found"
}
```

##Get Friends of Friends (GET)
Gets friends of friends

- Get friends of friends for a particular user
```
GET /friends/fof/pepper@gmail.com
```

**Response**
- If data exsists :
```json
{
  "success": 1,
  "data": "..."
}
```
- If data missing :
```json
{
  "success": 0,
  "message": "No rows found"
}
```

##Thank you.
Armaan | armaan28@rocketmail.com
