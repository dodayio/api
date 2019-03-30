import { v1 as neo4j } from "neo4j-driver";

export const singleNodeFromResponse = (
         res: neo4j.StatementResult
       ): neo4j.Node => {
         const singleRecord = res.records.length && res.records[0];
         const hero = singleRecord && singleRecord.get(0).properties;
         return hero as neo4j.Node;
       };