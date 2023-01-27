# Amigo Backend
This is the Backend server to the Amigo Next.js application:-
https://amigostravel.netlify.app/


Technology/Libraries:
- Jest
- Supertest


Dependencies:
- Dotenv
- Nodemon
- Express
- Cors
- Morgan
- Pg

## API 


| HTTP Method | Path            |  Request Body (JSON)    | Response Body (JSON)          | Status Code | Result                         |
| ----------- | --------------- |  ---------------------- | ----------------------------- | ----------- | ------------------------------ |
| GET         | /users/               |                         | Array of user objects | 200         | Get all registered users                |
| GET         | /users/:uid           |                         | Array of one user object         | 200         | Returns specific user's data |
| GET         | /users/:uid/favourites|                          | Array of user favourite objects  | 200         | Returns details of all locations favourited by specific user            |
| GET         | /users/:uid/favourites/:xid| | Array of single location object        | 200         | Returns specific location favourites by specific user              |
| DELETE      | /users/:uid/favourites/:xid|                        | Array of single location object| 200         | Deletes specific location of specific user                |
| DELETE      | /users/:uid/favourites|                        | Array of user favourites objects | 200         |Deletes all favourites of specific user               |
| DELETE      | /users/:uid            |                          | Array of single user object         | 200         | Deletes specific user |
| POST        | /users/:uid/favourites|  New favourite object         | New favourite object  | 200        | Adds new user favourite         |
| POST        | /users          | New user object | New user object       | 201         | Adds new user if they don't already exist               |
