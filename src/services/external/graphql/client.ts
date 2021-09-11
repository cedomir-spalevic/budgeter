import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL } from "react-native-dotenv";

const client = new ApolloClient({
   uri: API_URL,
   cache: new InMemoryCache()
})

export default client;