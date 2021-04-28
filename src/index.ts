import { ApolloServer } from "apollo-server";
import BookAPI from './thirdPartyAPI/Book';
import schema from "./schema";

const server = new ApolloServer({
    schema,
    dataSources: () => {
        return {
            bookAPI: new BookAPI(),
        };
    },
}) as any;

server.listen().then(({ url }: any) => {
    console.log(`🚀  Server ready at ${url}`);
});

