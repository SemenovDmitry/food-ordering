use node 18.16.0

npx prisma migrate dev --name init

npx prisma generate - call after migration

npx prisma studio

npx prisma migrate reset   -   clear db


ts-node-dev -r tsconfig-paths/register --files ./src/index.ts
//--files fixes error for global types

[
  {
    "id": 1,
    "name": "Red Cream"
  },
  {
    "id": 3,
    "name": "Tasty Cold"
  },
  {
    "id": 2,
    "name": "Green Ice"
  }
]


[
  {
    "id": 1,
    "name": "North Brand"
  },
  {
    "id": 2,
    "name": "Cold Wind"
  },
]
