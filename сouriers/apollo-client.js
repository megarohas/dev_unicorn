import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";

// console.log(
//   "!!!!!!!!!               getConfig().publicRuntimeConfig.API_URL:",
//   getConfig().publicRuntimeConfig.API_URL
// );

const client = new ApolloClient({
  uri: getConfig().publicRuntimeConfig.API_URL,
  // credentials: "same-origin",
  credentials: "include",
  // uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
  // mode: "no-cors",
  // fetchOptions: {
  //   mode: "no-cors",
  // },
});

export default client;
