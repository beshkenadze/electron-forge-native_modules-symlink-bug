import weaviate, { EmbeddedOptions } from "weaviate-ts-embedded";

const client = weaviate.client(new EmbeddedOptions({}));

export default client;
