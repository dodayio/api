export default /* GraphQL seed db */ `
  mutation {
    c1: CreateTag(id: "100", sysname: "health") {
      id
    }
    c2: CreateTag(id: "101", sysname: "selfdev") {
      id
    }
    c3: CreateTag(id: "102", sysname: "career") {
      id
    }
    c4: CreateTag(id: "103", sysname: "relationship") {
      id
    }
    c5: CreateTag(id: "104", sysname: "prosperity") {
      id
    }
    c6: CreateTag(id: "105", sysname: "hobby") {
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
