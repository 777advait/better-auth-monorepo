import { Hono } from "hono";

export const helloRouter = new Hono().get("/sayHello", (c) =>
  c.json({ message: "Hello, World!" })
);
