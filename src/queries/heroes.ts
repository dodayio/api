import { v1 as neo4j } from "neo4j-driver";
import { Hero } from "../models/Hero";

export const createHero = (tx: neo4j.Transaction, props: Hero) => {
  return tx.run(
    "CREATE (h: Hero { did: {did}, displayName: {displayName}, tokens: {tokens}, google: {google} }) RETURN h",
    props);
};

export const findHero = (tx: neo4j.Transaction, props: { google: string }) => {
  return tx.run(
    `
        MATCH (h:Hero { google: $google })
        RETURN h
      `,
    props
  );
};