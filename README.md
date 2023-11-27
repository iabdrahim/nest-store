## Description

This is a full featured Ecommerce REST API back-end , built with Nestjs and MongoDB(mongoose).

# api endpoints

| methods | endpoints           | access  | description         |
| ------- | ------------------- | ------- | ------------------- |
| POST    | /auth/register      | Public  | Register            |
| POST    | /auth/login         | Public  | Login               |
| GET     | /auth/me            | Private | User Profile        |
| PATCH   | /auth/me            | Private | Update User Profile |
| DELETE  | /auth/me            | Private | Delete User         |
| GET     | /products           | Public  | View All Products   |
| POST    | /products           | Private | Create a Product    |
| GET     | /products/productID | Public  | View a Product      |
| PATCH   | /products/productID | Private | Update a Product    |
| DELETE  | /products/productID | Private | Delete a Product    |

## Env file

```env
MONGO_URI=""
JWT_SECRET=""
```

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Copyright ©

👤 **Abdrahimo**

- Github: [@iabdrahim](https://github.com/iabdrahim)
- Email: [abderrahimaneddam1@gmail.com](mailto:abderrahimaneddam1@gmail.com)

📝 **License**

Copyright © 2020 [Abdrahimo](https://github.com/iabdrahim).<br />
This project is [MIT](LICENSE) licensed.

---

Give a ⭐️ if this project helped you!
