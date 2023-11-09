import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from "@commercetools/ts-client";
import fetch from "node-fetch";
import { config } from "dotenv";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";

config();

export const PRODUCT_KEY:string = process.env.CT_PRODUCT_KEY!;
export const UNQ_ATTRIBUTE_NAME:string = process.env.CT_UNIQUE_ATTRIBUTE_NAME!;
export const BASE_PRODUCT_ATTRIBUTE=process.env.CT_BASE_PRODUCT_ATTRIBUTE

const options: AuthMiddlewareOptions = {
  host: process.env.CT_AUTH_URL!,
  projectKey: process.env.CT_PROJECT_KEY!,
  credentials: {
    clientId: process.env.CT_CLIENT_ID!,
    clientSecret: process.env.CT_CLIENT_SECRET!,
  },
  scopes: [`manage_products:${process.env.CT_PROJECT_KEY}`],
};
const httpOptions: HttpMiddlewareOptions = {
  host: process.env.CT_API_URL!,
  httpClient: fetch,
};
const client = new ClientBuilder()
  .withClientCredentialsFlow(options)
  .withHttpMiddleware(httpOptions)
  .build();

export const ctApiClient = createApiBuilderFromCtpClient(client).withProjectKey(
  { projectKey: process.env.CT_PROJECT_KEY! },
);
