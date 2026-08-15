# ADR 002: Backend Architecture and Web Framework

## Decision
We selected **Node.js** with **Express.js** as the web framework, and **TypeORM** as the Object-Relational Mapper (ORM). 

## Rationale
1. **JavaScript Ecosystem:** Using Node.js allows us to maintain a consistent language across the entire stack (React frontend and Express backend).
2. **Express Simplicity:** Express provides a minimalist, unopinionated routing system that is easy to configure and perfectly suited for building REST APIs.
3. **TypeORM Integration:** TypeORM provides powerful tools to map JavaScript objects to database tables. It abstracts complex SQL while still allowing raw queries when needed (like for our complex views).
4. **AI Compatibility:** The LangChain ecosystem (`@langchain/google-genai`) has excellent, first-class support for Node.js, making the AI integration seamless.

## Consequences
- Error handling in Express is manual (requires try/catch blocks and a centralized error middleware).
- We must handle asynchronous operations carefully using async/await to prevent unhandled promise rejections.
