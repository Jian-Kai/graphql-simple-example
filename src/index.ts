import { ApolloServer } from "apollo-server";
import ThirdPartyAPI from './thirdPartyAPI/ThirdPartyAPI';
import schema from "./schema";

const server = new ApolloServer({
    schema,
    dataSources: () => {
        return {
            ThirdPartyAPI: new ThirdPartyAPI(),
        };
    },
}) as any;

server.listen().then(({ url }: any) => {
    console.log(`🚀  Server ready at ${url}`);
});

