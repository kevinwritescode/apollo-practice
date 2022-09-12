# 🚀 Apollo Practice

Apollo Server NodeJS Practice, experimenting with Node TS, type generated GQL, and basic auth concepts.

Goals 🥅 of this exercise:

1. Get comfortable with GQL concepts
2. Explore schema file structure strategies
3. Try GQL to Typescript Defs pipeline
4. Explore Apollo Server Express authorization vs authentication strategies
5. Explore Apollo Sandbox features
6. Practice Typescript generics

Next things to implement:

1. GQL unions and inline fragments `... on Droid {}`
2. directives `(@include(if) @skip(if))`
3. Passport authentication layer

# 📐 Folder Format
```
└─ dist/                     🙈 (Ignore) Autogenerated JS output
└─ node_modules/             🙈 (Ignore) Package.json modules
└─ src/
│  └─ _typedefs/             📖 Definitions and mocked data
│  │  │  prepare-db.js       🙈 (Ignore) Loads dummy data into SQLite
│  │             
│  └─ schemas/               📝 GQL Typedefs and Resolvers
│  │  │  error.js            💀 GQL Errors
│  │  │  mutation.js         🐸 GQL Mutations
│  │  │  query.js            🤔 GQL Queries
│  │  │  team.js             👪 Teams
│  │  │  user.js             👩‍🦰 Users
│  │
│  │  auth.js                🗝️ Basic example authn / authz 
│  │  database.js            📚 Basic SQLite + Knex DB
│  │  schema.js              ⚙️ GQL Schema generator
│  │  server.js              ⭐ Server entry point
```

# 💡 GQL Best Practices

Just a few notes I gathered while reviewing

-   Establish a naming convention like createUser vs userCreate
-   Be as specific as possible with mutations
-   Only one argument for mutations, the input
-   Have specific payload response per mutation for future expansion
-   Disable introspection in production

# 🛠️ Tools

-   [Knex](https://knexjs.org/guide/) for SQLite3 Object querying
-   [GraphQL Codegen](https://github.com/dotansimha/graphql-code-generator)

# 👩‍🏫 Learnings

-   [Generate Types](https://dev.to/xcanchal/automatically-generate-typescript-types-for-your-graphql-api-1fah)
-   [Missed GraphQL Concepts Explained](https://medium.com/naresh-bhatia/graphql-concepts-i-wish-someone-explained-to-me-a-year-ago-514d5b3c0eab)
-   [Federated Best Practices](https://www.apollographql.com/docs/enterprise-guide/federated-schema-design/)
-   [Designing Mutations](https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/)
-   [Data Sources](https://www.apollographql.com/docs/apollo-server/data/data-sources/)
-   [Disable Introspection](https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/)

Matthew Gordon, Wendy Peralta 