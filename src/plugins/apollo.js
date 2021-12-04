import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import { from } from 'apollo-link'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

const http_link = createHttpLink({
    uri: import.meta.env.VITE_GRAPH_URL,
})

const websocket_link = new WebSocketLink({
    uri: import.meta.env.VITE_GRAPH_URL.replace('https', 'wss'),
    options: {
        reconnect: true
    }
})

const link = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
    );
}, websocket_link, http_link)

const cache = new InMemoryCache({
    addTypename: false
})

const apollo_client = new ApolloClient({
    link,
    cache,
})

export default apollo_client