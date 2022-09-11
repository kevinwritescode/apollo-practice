# apollo-practice

Apollo Server NodeJS Practice

# GQL Best Practices

- Establish a naming convention like createUser vs userCreate
- Be as specific as possible with mutations
- Only one argument for mutations, the input
- Have specific payload response per mutation for future expansion
- Disable introspection in production

# Tools

- [Knex](https://knexjs.org/guide/) for SQLLite Object querying
- [GraphQL Codegen](https://github.com/dotansimha/graphql-code-generator)

# Learnings

- [Generate Types](https://dev.to/xcanchal/automatically-generate-typescript-types-for-your-graphql-api-1fah)
- [Missed GraphQL Concepts Explained](https://medium.com/naresh-bhatia/graphql-concepts-i-wish-someone-explained-to-me-a-year-ago-514d5b3c0eab)
- [Federated Best Practices](https://www.apollographql.com/docs/enterprise-guide/federated-schema-design/)
- [Designing Mutations](https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/)
- [Data Sources](https://www.apollographql.com/docs/apollo-server/data/data-sources/)
- [Disable Introspection](https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/)
