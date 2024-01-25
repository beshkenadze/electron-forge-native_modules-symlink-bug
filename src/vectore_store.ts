import { WeaviateStore } from "@langchain/community/vectorstores/weaviate";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-node-gpu";

import { TensorFlowEmbeddings } from "@langchain/community/embeddings/tensorflow";

import { Document } from "@langchain/core/documents";
import client from "./weaviate";

export async function run(): Promise<Document[]> {
  await client.embedded.start();
  // Create a store and fill it with some texts + metadata
  const store = await WeaviateStore.fromTexts(
    ["hello world", "hi there", "how are you", "bye now"],
    [{ foo: "bar" }, { foo: "baz" }, { foo: "qux" }, { foo: "bar" }],
    new TensorFlowEmbeddings(),
    {
      client,
      indexName: "Test",
      textKey: "text",
      metadataKeys: ["foo"],
    }
  );

  // Search the index without any filters
  const results = await store.similaritySearch("hello world", 1);
  client.embedded.stop();
  return results;
}
