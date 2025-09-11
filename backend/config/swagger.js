import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation for the E-commerce application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      security: [{ bearerAuth: [] }],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);

export const swaggerUiSetup = swaggerUi.serve;
export const swaggerUiDocs = swaggerUi.setup(swaggerDocs);
