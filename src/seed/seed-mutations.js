export default /* GraphQL seed db */ `
  mutation {
    c1: CreateTag(id: "100", sysname: "health", color: "#B6E060") {
      id
    }
    c2: CreateTag(id: "101", sysname: "selfdev", color: "#FFE86C") {
      id
    }
    c3: CreateTag(id: "102", sysname: "career", color: "#A772CB") {
      id
    }
    c4: CreateTag(id: "103", sysname: "relationship", color: "#E6007C") {
      id
    }
    c5: CreateTag(id: "104", sysname: "prosperity", color: "#FF4E00") {
      id
    }
    c6: CreateTag(id: "105", sysname: "hobby", color: "#009DE6") {
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
