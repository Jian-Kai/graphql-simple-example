import { gql } from "apollo-server";

export const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: String
        comments: [Comment]
    }
    input BookInput {
        title: String!
        author: String!
    }

    extend type Query {
        books: [Book]
    }
    extend type Mutation {
        addBook(book: BookInput): Book
    }
`;


export const Query = {
    books: async (_parent: any, _args: any, { dataSources }: any) => {
        const { ThirdPartyAPI } = dataSources;
        return ThirdPartyAPI.getBooks();
    }
};

export const Mutation = {
    addBook: (_: any, args: { [key: string]: any }, { dataSources }: any) => {
        const { ThirdPartyAPI } = dataSources;
        const { book } = args;
        return ThirdPartyAPI.addBook(book.title, book.author);
    },
};

export const Other = {
    Book: {
        comments: (parent: any) => {
            return [{
                id: '0',
                bookID: parent.id,
                content: 'Good book !',
            }]
        }
    }
};

