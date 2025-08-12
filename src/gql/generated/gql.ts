/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetLeague($id: ID!) {\n    fantasyQueries {\n      league(source: ID, id: $id) {\n        id\n        name\n        totalSquadsCount\n        season {\n          id\n          isActive\n          tournament {\n            id\n            webName\n          }\n          tours {\n            id\n            status\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetLeagueDocument,
    "\n  query GetLeagueSquads(\n    $leagueId: ID!\n    $entityType: FantasyRatingEntityType!\n    $entityId: ID!\n  ) {\n    fantasyQueries {\n      rating {\n        squads(\n          input: {\n            leagueID: $leagueId\n            entityType: $entityType\n            entityID: $entityId\n            sortOrder: ASC\n            pageSize: 90\n            pageNum: 1\n          }\n        ) {\n          list {\n            squad {\n              id\n              name\n            }\n            scoreInfo {\n              place\n              score\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetLeagueSquadsDocument,
    "\n  query GetTournament($id: ID!) {\n    fantasyQueries {\n      tournament(source: HRU, id: $id) {\n        id\n        name\n        description\n        metaTitle\n        statObject {\n          name\n        }\n        currentSeason {\n          id\n          isActive\n          totalSquadsCount\n          statObject {\n            name\n          }\n          currentTour {\n            id\n            name\n            status\n          }\n        }\n      }\n    }\n  }\n": typeof types.GetTournamentDocument,
};
const documents: Documents = {
    "\n  query GetLeague($id: ID!) {\n    fantasyQueries {\n      league(source: ID, id: $id) {\n        id\n        name\n        totalSquadsCount\n        season {\n          id\n          isActive\n          tournament {\n            id\n            webName\n          }\n          tours {\n            id\n            status\n          }\n        }\n      }\n    }\n  }\n": types.GetLeagueDocument,
    "\n  query GetLeagueSquads(\n    $leagueId: ID!\n    $entityType: FantasyRatingEntityType!\n    $entityId: ID!\n  ) {\n    fantasyQueries {\n      rating {\n        squads(\n          input: {\n            leagueID: $leagueId\n            entityType: $entityType\n            entityID: $entityId\n            sortOrder: ASC\n            pageSize: 90\n            pageNum: 1\n          }\n        ) {\n          list {\n            squad {\n              id\n              name\n            }\n            scoreInfo {\n              place\n              score\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetLeagueSquadsDocument,
    "\n  query GetTournament($id: ID!) {\n    fantasyQueries {\n      tournament(source: HRU, id: $id) {\n        id\n        name\n        description\n        metaTitle\n        statObject {\n          name\n        }\n        currentSeason {\n          id\n          isActive\n          totalSquadsCount\n          statObject {\n            name\n          }\n          currentTour {\n            id\n            name\n            status\n          }\n        }\n      }\n    }\n  }\n": types.GetTournamentDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLeague($id: ID!) {\n    fantasyQueries {\n      league(source: ID, id: $id) {\n        id\n        name\n        totalSquadsCount\n        season {\n          id\n          isActive\n          tournament {\n            id\n            webName\n          }\n          tours {\n            id\n            status\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLeague($id: ID!) {\n    fantasyQueries {\n      league(source: ID, id: $id) {\n        id\n        name\n        totalSquadsCount\n        season {\n          id\n          isActive\n          tournament {\n            id\n            webName\n          }\n          tours {\n            id\n            status\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLeagueSquads(\n    $leagueId: ID!\n    $entityType: FantasyRatingEntityType!\n    $entityId: ID!\n  ) {\n    fantasyQueries {\n      rating {\n        squads(\n          input: {\n            leagueID: $leagueId\n            entityType: $entityType\n            entityID: $entityId\n            sortOrder: ASC\n            pageSize: 90\n            pageNum: 1\n          }\n        ) {\n          list {\n            squad {\n              id\n              name\n            }\n            scoreInfo {\n              place\n              score\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLeagueSquads(\n    $leagueId: ID!\n    $entityType: FantasyRatingEntityType!\n    $entityId: ID!\n  ) {\n    fantasyQueries {\n      rating {\n        squads(\n          input: {\n            leagueID: $leagueId\n            entityType: $entityType\n            entityID: $entityId\n            sortOrder: ASC\n            pageSize: 90\n            pageNum: 1\n          }\n        ) {\n          list {\n            squad {\n              id\n              name\n            }\n            scoreInfo {\n              place\n              score\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTournament($id: ID!) {\n    fantasyQueries {\n      tournament(source: HRU, id: $id) {\n        id\n        name\n        description\n        metaTitle\n        statObject {\n          name\n        }\n        currentSeason {\n          id\n          isActive\n          totalSquadsCount\n          statObject {\n            name\n          }\n          currentTour {\n            id\n            name\n            status\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTournament($id: ID!) {\n    fantasyQueries {\n      tournament(source: HRU, id: $id) {\n        id\n        name\n        description\n        metaTitle\n        statObject {\n          name\n        }\n        currentSeason {\n          id\n          isActive\n          totalSquadsCount\n          statObject {\n            name\n          }\n          currentTour {\n            id\n            name\n            status\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;