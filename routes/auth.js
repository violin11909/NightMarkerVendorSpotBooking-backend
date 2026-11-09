/**
 * @swagger
 * {
 *   "components": {
 *     "schemas": {
 *       "Error": {
 *         "type": "object",
 *         "properties": {
 *           "success": {
 *             "type": "boolean",
 *             "example": false
 *           },
 *           "error": {
 *             "type": "string"
 *           },
 *           "stack": {
 *             "type": "string",
 *             "description": "Included for global errors in development."
 *           }
 *         }
 *       },
 *       "User": {
 *         "type": "object",
 *         "properties": {
 *           "_id": {
 *             "type": "string",
 *             "pattern": "^[a-fA-F0-9]{24}$",
 *             "example": "507f1f77bcf86cd799439011"
 *           },
 *           "name": {
 *             "type": "string"
 *           },
 *           "email": {
 *             "type": "string",
 *             "format": "email"
 *           },
 *           "tel": {
 *             "type": "string"
 *           },
 *           "role": {
 *             "type": "string",
 *             "enum": [
 *               "member",
 *               "admin"
 *             ]
 *           },
 *           "createdAt": {
 *             "type": "string",
 *             "format": "date-time"
 *           }
 *         }
 *       },
 *       "RegisterInput": {
 *         "type": "object",
 *         "properties": {
 *           "name": {
 *             "type": "string"
 *           },
 *           "email": {
 *             "type": "string",
 *             "format": "email"
 *           },
 *           "tel": {
 *             "type": "string"
 *           },
 *           "password": {
 *             "type": "string",
 *             "minLength": 6,
 *             "format": "password"
 *           },
 *           "role": {
 *             "type": "string",
 *             "enum": [
 *               "member",
 *               "admin"
 *             ],
 *             "default": "member"
 *           }
 *         },
 *         "required": [
 *           "name",
 *           "email",
 *           "tel",
 *           "password"
 *         ]
 *       },
 *       "LoginInput": {
 *         "type": "object",
 *         "properties": {
 *           "email": {
 *             "type": "string",
 *             "format": "email"
 *           },
 *           "password": {
 *             "type": "string",
 *             "format": "password"
 *           }
 *         },
 *         "required": [
 *           "email",
 *           "password"
 *         ]
 *       },
 *       "AuthResponse": {
 *         "type": "object",
 *         "properties": {
 *           "success": {
 *             "type": "boolean",
 *             "example": true
 *           },
 *           "data": {
 *             "type": "object",
 *             "properties": {
 *               "id": {
 *                 "type": "string",
 *                 "pattern": "^[a-fA-F0-9]{24}$",
 *                 "example": "507f1f77bcf86cd799439011"
 *               },
 *               "name": {
 *                 "type": "string"
 *               },
 *               "email": {
 *                 "type": "string",
 *                 "format": "email"
 *               },
 *               "role": {
 *                 "type": "string",
 *                 "enum": [
 *                   "member",
 *                   "admin"
 *                 ]
 *               },
 *               "token": {
 *                 "type": "string",
 *                 "description": "JWT; use with the Authorize button as a bearer token."
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "EmptyResponse": {
 *         "type": "object",
 *         "properties": {
 *           "success": {
 *             "type": "boolean",
 *             "example": true
 *           },
 *           "data": {
 *             "type": "object",
 *             "example": {}
 *           }
 *         }
 *       },
 *       "SpotInput": {
 *         "type": "object",
 *         "required": [
 *           "spotNumber",
 *           "zone",
 *           "spotSize",
 *           "locationDescription",
 *           "rentalFee"
 *         ],
 *         "properties": {
 *           "spotNumber": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "A01"
 *           },
 *           "zone": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Food zone"
 *           },
 *           "spotSize": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "2 x 2 m",
 *             "description": "Descriptive text; include units as appropriate."
 *           },
 *           "locationDescription": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Near the main entrance"
 *           },
 *           "rentalFee": {
 *             "type": "number",
 *             "minimum": 0,
 *             "example": 300
 *           }
 *         }
 *       },
 *       "SpotUpdate": {
 *         "type": "object",
 *         "properties": {
 *           "spotNumber": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "A01"
 *           },
 *           "zone": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Food zone"
 *           },
 *           "spotSize": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "2 x 2 m",
 *             "description": "Descriptive text; include units as appropriate."
 *           },
 *           "locationDescription": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Near the main entrance"
 *           },
 *           "rentalFee": {
 *             "type": "number",
 *             "minimum": 0,
 *             "example": 300
 *           }
 *         },
 *         "description": "Omitted fields retain their values."
 *       },
 *       "Spot": {
 *         "type": "object",
 *         "properties": {
 *           "_id": {
 *             "type": "string",
 *             "pattern": "^[a-fA-F0-9]{24}$",
 *             "example": "507f1f77bcf86cd799439011"
 *           },
 *           "spotNumber": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "A01"
 *           },
 *           "zone": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Food zone"
 *           },
 *           "spotSize": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "2 x 2 m",
 *             "description": "Descriptive text; include units as appropriate."
 *           },
 *           "locationDescription": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Near the main entrance"
 *           },
 *           "rentalFee": {
 *             "type": "number",
 *             "minimum": 0,
 *             "example": 300
 *           },
 *           "isActive": {
 *             "type": "boolean",
 *             "readOnly": true
 *           },
 *           "createdAt": {
 *             "type": "string",
 *             "format": "date-time",
 *             "readOnly": true
 *           },
 *           "updatedAt": {
 *             "type": "string",
 *             "format": "date-time",
 *             "readOnly": true
 *           }
 *         }
 *       },
 *       "BookingInput": {
 *         "type": "object",
 *         "required": [
 *           "spot",
 *           "bookingDate",
 *           "productType"
 *         ],
 *         "properties": {
 *           "spot": {
 *             "type": "string",
 *             "pattern": "^[a-fA-F0-9]{24}$",
 *             "example": "507f1f77bcf86cd799439011",
 *             "description": "Exactly one active vendor spot ID. Physical spot identity is its MongoDB ID."
 *           },
 *           "bookingDate": {
 *             "type": "string",
 *             "format": "date",
 *             "example": "2026-12-01",
 *             "description": "YYYY-MM-DD; today or later in UTC."
 *           },
 *           "productType": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Food and drinks",
 *             "description": "Free-text product category."
 *           }
 *         }
 *       },
 *       "BookingUpdate": {
 *         "type": "object",
 *         "properties": {
 *           "spot": {
 *             "type": "string",
 *             "pattern": "^[a-fA-F0-9]{24}$",
 *             "example": "507f1f77bcf86cd799439011",
 *             "description": "Exactly one active vendor spot ID. Physical spot identity is its MongoDB ID."
 *           },
 *           "bookingDate": {
 *             "type": "string",
 *             "format": "date",
 *             "example": "2026-12-01",
 *             "description": "YYYY-MM-DD; today or later in UTC."
 *           },
 *           "productType": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Food and drinks",
 *             "description": "Free-text product category."
 *           }
 *         },
 *         "description": "Omitted fields retain their values. Owner cannot be changed."
 *       },
 *       "Booking": {
 *         "type": "object",
 *         "properties": {
 *           "_id": {
 *             "type": "string",
 *             "pattern": "^[a-fA-F0-9]{24}$",
 *             "example": "507f1f77bcf86cd799439011"
 *           },
 *           "spot": {
 *             "$ref": "#/components/schemas/Spot"
 *           },
 *           "bookingDate": {
 *             "type": "string",
 *             "format": "date-time",
 *             "readOnly": true,
 *             "description": "UTC midnight for the booking date."
 *           },
 *           "productType": {
 *             "type": "string",
 *             "minLength": 1,
 *             "example": "Food and drinks",
 *             "description": "Free-text product category."
 *           },
 *           "user": {
 *             "$ref": "#/components/schemas/User"
 *           },
 *           "createdAt": {
 *             "type": "string",
 *             "format": "date-time",
 *             "readOnly": true
 *           },
 *           "updatedAt": {
 *             "type": "string",
 *             "format": "date-time",
 *             "readOnly": true
 *           }
 *         }
 *       },
 *       "SpotResponse": {
 *         "type": "object",
 *         "properties": {
 *           "success": {
 *             "type": "boolean",
 *             "example": true
 *           },
 *           "data": {
 *             "$ref": "#/components/schemas/Spot"
 *           }
 *         }
 *       },
 *       "SpotListResponse": {
 *         "type": "object",
 *         "properties": {
 *           "success": {
 *             "type": "boolean",
 *             "example": true
 *           },
 *           "count": {
 *             "type": "integer"
 *           },
 *           "data": {
 *             "type": "array",
 *             "items": {
 *               "$ref": "#/components/schemas/Spot"
 *             }
 *           }
 *         }
 *       },
 *       "BookingResponse": {
 *         "type": "object",
 *         "properties": {
 *           "success": {
 *             "type": "boolean",
 *             "example": true
 *           },
 *           "data": {
 *             "$ref": "#/components/schemas/Booking"
 *           }
 *         }
 *       },
 *       "BookingListResponse": {
 *         "type": "object",
 *         "properties": {
 *           "success": {
 *             "type": "boolean",
 *             "example": true
 *           },
 *           "count": {
 *             "type": "integer"
 *           },
 *           "data": {
 *             "type": "array",
 *             "items": {
 *               "$ref": "#/components/schemas/Booking"
 *             }
 *           }
 *         }
 *       }
 *     },
 *     "parameters": {
 *       "ResourceId": {
 *         "name": "id",
 *         "in": "path",
 *         "required": true,
 *         "description": "MongoDB document ID.",
 *         "schema": {
 *           "type": "string",
 *           "pattern": "^[a-fA-F0-9]{24}$",
 *           "example": "507f1f77bcf86cd799439011"
 *         }
 *       }
 *     },
 *     "responses": {
 *       "Error400": {
 *         "description": "Invalid input, including a past or invalid booking date.",
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Error"
 *             }
 *           }
 *         }
 *       },
 *       "Error401": {
 *         "description": "Missing or invalid credentials, or user no longer exists.",
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Error"
 *             }
 *           }
 *         }
 *       },
 *       "Error403": {
 *         "description": "Role or ownership does not permit this operation.",
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Error"
 *             }
 *           }
 *         }
 *       },
 *       "Error404": {
 *         "description": "Resource not found or inactive.",
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Error"
 *             }
 *           }
 *         }
 *       },
 *       "Error429": {
 *         "description": "Rate limit exceeded (100 requests per IP per 10 minutes).",
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Error"
 *             }
 *           }
 *         }
 *       },
 *       "Error500": {
 *         "description": "Server error. Current global handling also returns this for Mongoose validation, cast, and duplicate-key errors.",
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Error"
 *             }
 *           }
 *         }
 *       },
 *       "Error409": {
 *         "description": "Vendor spot already booked on this date, member duplicate booking, or three-spots-per-day limit.",
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Error"
 *             }
 *           }
 *         }
 *       }
 *     }
 *   },
 *   "/api/v1/auth/register": {
 *     "post": {
 *       "tags": [
 *         "Authentication"
 *       ],
 *       "summary": "Register a user",
 *       "description": "Public registration accepts member or admin roles and issues a JWT in data.token and an HTTP-only token cookie.",
 *       "security": [],
 *       "responses": {
 *         "201": {
 *           "description": "Successful operation.",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/AuthResponse"
 *               }
 *             }
 *           },
 *           "headers": {
 *             "Set-Cookie": {
 *               "description": "HTTP-only token cookie; Secure in production.",
 *               "schema": {
 *                 "type": "string"
 *               }
 *             }
 *           }
 *         },
 *         "429": {
 *           "$ref": "#/components/responses/Error429"
 *         },
 *         "500": {
 *           "$ref": "#/components/responses/Error500"
 *         }
 *       },
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/RegisterInput"
 *             }
 *           }
 *         }
 *       }
 *     }
 *   },
 *   "/api/v1/auth/login": {
 *     "post": {
 *       "tags": [
 *         "Authentication"
 *       ],
 *       "summary": "Log in",
 *       "description": "Issues a JWT in data.token and an HTTP-only token cookie.",
 *       "security": [],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation.",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/AuthResponse"
 *               }
 *             }
 *           },
 *           "headers": {
 *             "Set-Cookie": {
 *               "description": "HTTP-only token cookie; Secure in production.",
 *               "schema": {
 *                 "type": "string"
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "$ref": "#/components/responses/Error400"
 *         },
 *         "401": {
 *           "$ref": "#/components/responses/Error401"
 *         },
 *         "429": {
 *           "$ref": "#/components/responses/Error429"
 *         },
 *         "500": {
 *           "$ref": "#/components/responses/Error500"
 *         }
 *       },
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/LoginInput"
 *             }
 *           }
 *         }
 *       }
 *     }
 *   },
 *   "/api/v1/auth/me": {
 *     "get": {
 *       "tags": [
 *         "Authentication"
 *       ],
 *       "summary": "Get current user",
 *       "description": "Returns the authenticated user profile without the password.",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation.",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "object",
 *                 "properties": {
 *                   "success": {
 *                     "type": "boolean",
 *                     "example": true
 *                   },
 *                   "data": {
 *                     "$ref": "#/components/schemas/User"
 *                   }
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "$ref": "#/components/responses/Error401"
 *         },
 *         "429": {
 *           "$ref": "#/components/responses/Error429"
 *         },
 *         "500": {
 *           "$ref": "#/components/responses/Error500"
 *         }
 *       }
 *     }
 *   },
 *   "/api/v1/auth/logout": {
 *     "get": {
 *       "tags": [
 *         "Authentication"
 *       ],
 *       "summary": "Log out",
 *       "description": "Replaces the token cookie with none and a short expiry. Existing bearer tokens remain valid until they expire.",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation.",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/EmptyResponse"
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "$ref": "#/components/responses/Error401"
 *         },
 *         "429": {
 *           "$ref": "#/components/responses/Error429"
 *         },
 *         "500": {
 *           "$ref": "#/components/responses/Error500"
 *         }
 *       }
 *     }
 *   }
 * }
 */
const express = require("express");
const { register, login, getMe, logout } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", protect, logout);

module.exports = router;
