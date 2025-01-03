import { ChatOllama } from "@langchain/ollama";


const model = new ChatOllama({
  model: "llama3.2:1b",  // Default value.
});

const result = await model.invoke([
  ["system", "answer very shortly and keep it simple"],
  ["human", "Hello, how are you?"]
]);
console.log(result.content)