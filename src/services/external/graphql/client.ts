import {
   ApolloClient,
   createHttpLink,
   InMemoryCache,
   NormalizedCacheObject
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_URL } from "react-native-dotenv";
import { getItem, StorageKeys } from "services/internal/storage";
import { isAccessTokenValid } from "../utils";

const httpLink = createHttpLink({
   uri: `${API_URL}/graphql`
});

const authLink = setContext(async (_, { headers }) => {
   await isAccessTokenValid();
   const token = await getItem(StorageKeys.AccessToken);
   return {
      headers: {
         ...headers,
         Authorization: token ? `Bearer ${token}` : ""
      }
   };
});

const client = new ApolloClient({
   link: authLink.concat(httpLink),
   cache: new InMemoryCache()
});

export const clearCache = async (): Promise<void> => {
   await client.clearStore();
   client.cache.gc();
};

export const getClient = (): ApolloClient<NormalizedCacheObject> => client;
