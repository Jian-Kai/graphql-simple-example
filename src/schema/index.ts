import { gql, makeExecutableSchema, IResolvers } from "apollo-server";
const { GraphQLScalarType, Kind } = require('graphql');
import { typeDefs as bookTypeDefs, Query as bookQuery, Mutation as bookMutation, Other as bookOther } from './book';
import { typeDefs as commentTypeDefs, Query as commentQuery, Mutation as commentMutation, Other as commentOther } from './comment';


const defaultTypeDefs = gql`
    scalar Date

    type Query {
        _empty: String
    }
    type Mutation {
        _emptyInput(input:String!): String
    }
`;

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: Date) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value: number | string | Date) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast: any) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});

const defaultResolvers: IResolvers<any, any> = {
    Date: dateScalar,
    Query: {
        _empty: () => 'empty qurey',
        ...bookQuery,
        ...commentQuery,
    },
    Mutation: {
        _emptyInput: (_, args: { [key: string]: any }) => {
            return args.input;
        },
        ...bookMutation,
        ...commentMutation,
    },
    ...bookOther,
    ...commentOther,
};

export default makeExecutableSchema({
    typeDefs: [defaultTypeDefs, bookTypeDefs, commentTypeDefs],
    resolvers: defaultResolvers
})
