import { gql } from "apollo-server";

export const typeDefs = gql`
    type Comment {
        id: ID!
        bookID: ID!
        content: String!
        time: Date!
    }
    input CommentInput {
        bookID: ID!
        content: String!
    }
    extend type Query {
        comment: [Comment]
    }
    extend type Mutation {
        addComment2Book(comment: CommentInput): Comment
    }
`;

export const Query = {};

export const Mutation = {};

export const Other = {};