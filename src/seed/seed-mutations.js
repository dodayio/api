export default /* GraphQL */ `
  mutation {
    c1: CreateCategory(id: "100", sysname: "health") {
      id
    }
    c2: CreateCategory(id: "101", sysname: "selfdev") {
      id
    }
    c3: CreateCategory(id: "102", sysname: "career") {
      id
    }
    c4: CreateCategory(id: "103", sysname: "relationship") {
      id
    }
    c5: CreateCategory(id: "104", sysname: "prosperity") {
      id
    }
    c6: CreateCategory(id: "105", sysname: "hobby") {
      id
    }
    r1: CreateRole(id: "200", sysname: "founder") {
      id
    }
    r2: CreateRole(id: "201", sysname: "cofounder") {
      id
    }
    r3: CreateRole(id: "202", sysname: "stranger") {
      id
    }
    n1: CreateCounter(id: "1", name: "Counter") {
      id
    }
  }
`;
