/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** Package to enable CORS to handle requests from all domains. */
const cors = require('cors')

/** Framework for building RESTful APIs. */ 
const express = require('express');

/** Package to use the Gemini API. */
const { GoogleGenerativeAI } = require('@google/generative-ai');



/** 
 * To start a new application using Express, put and apply Express into the 
 * app variable. */
const app = express ();
app.use(express.json());

/** Apply the CORS middleware. */
app.use(cors())

/** Enable and listen to port 9000. */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log('Server Listening on PORT:', PORT);
});

/** Access the API key and initialize the Gemini SDK. */
const genAI = new GoogleGenerativeAI('AIzaSyDHG9BBeRqfHbalohJ-yv5GL4VHusXxVhk');

/** 
 * Initialize the Gemini model that will generate responses based on the 
 * user's queries. */
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
 
/** 
 * POST method route for normal chat(complete response, no streaming).
 * A chat message and the history of the conversation are send to the Gemini 
 * model. The complete response generated by the model to the posted message 
 * will be returned in the API's response.
 * 
 * Expects a JSON payload in the request with the following format:
 * Request:
 *   chat: string,
 *   history: Array
 *
 * Returns a JSON payload containing the model response with the 
 * following format:
 * Response:
 * 	text: string
 */
app.post("/chat", async (req, res) => {
    /** Read the request data. */
    const chatHistory = req.body.history || [];
    const msg = req.body.chat;
    
    /** Initialize the chat with the given history. */
    const chat = model.startChat({
        history: chatHistory
    });

    /** 
     * Send the message posted by the user to the Gemini model and read the 
     * response generated by the model.
     */
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    /** Send the response returned by the model as the API's response. */
    res.send({"text":text});
  });


/** 
 * POST method route for streaming response.
 * A chat message and the history of the conversation are send to the Gemini 
 * model. The response generated by the model will be streamed to handle 
 * partial results.
 * 
 * Expects a JSON payload in the request with the following format:
 * Request:
 *   chat: string,
 *   history: Array
 *
 * Returns a partial result of the model response with the 
 * following format:
 * Response:
 * 	<string>
 */
app.post("/stream", async (req, res) => {
    /** Read the request data. */
    const chatHistory = req.body.history || [];
    const msg = req.body.chat;
  
    /** Initialize the chat with history. */
    const chat = model.startChat({
      history: chatHistory
    });
  
    /** 
     * Send a new user message and read the response.
     * Send the chunk of text result back to the client 
     * as soon as you receive it.
     */
    const result = await chat.sendMessageStream(msg);
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    res.end();
  });