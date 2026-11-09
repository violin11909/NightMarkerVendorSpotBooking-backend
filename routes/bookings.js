/**
 * @swagger
 * {
 *   "/api/v1/bookings": {
 *     "get": {
 *       "tags": [
 *         "Bookings"
 *       ],
 *       "summary": "List own bookings; admins see all",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/BookingListResponse"
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
 *     },
 *     "post": {
 *       "tags": [
 *         "Bookings"
 *       ],
 *       "summary": "Create a booking (member only)",
 *       "description": "One active spot per booking, date today or later in UTC, one booking per spot/date globally, and at most three spots per member/date. Owner comes from authentication.",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/BookingInput"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "201": {
 *           "description": "Created",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/BookingResponse"
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
 *         "403": {
 *           "$ref": "#/components/responses/Error403"
 *         },
 *         "404": {
 *           "$ref": "#/components/responses/Error404"
 *         },
 *         "409": {
 *           "$ref": "#/components/responses/Error409"
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
 *   "/api/v1/bookings/{id}": {
 *     "parameters": [
 *       {
 *         "name": "id",
 *         "in": "path",
 *         "required": true,
 *         "schema": {
 *           "type": "string",
 *           "pattern": "^[a-fA-F0-9]{24}$",
 *           "example": "507f1f77bcf86cd799439011"
 *         }
 *       }
 *     ],
 *     "get": {
 *       "tags": [
 *         "Bookings"
 *       ],
 *       "summary": "Read a booking (owner or admin)",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/BookingResponse"
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "$ref": "#/components/responses/Error401"
 *         },
 *         "403": {
 *           "$ref": "#/components/responses/Error403"
 *         },
 *         "404": {
 *           "$ref": "#/components/responses/Error404"
 *         },
 *         "429": {
 *           "$ref": "#/components/responses/Error429"
 *         },
 *         "500": {
 *           "$ref": "#/components/responses/Error500"
 *         }
 *       }
 *     },
 *     "put": {
 *       "tags": [
 *         "Bookings"
 *       ],
 *       "summary": "Update a booking (owner or admin)",
 *       "description": "Rechecks the target spot/date and original owner's daily limit, excluding this booking. A booking referencing an inactive spot must move to an active spot.",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/BookingUpdate"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/BookingResponse"
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
 *         "403": {
 *           "$ref": "#/components/responses/Error403"
 *         },
 *         "404": {
 *           "$ref": "#/components/responses/Error404"
 *         },
 *         "409": {
 *           "$ref": "#/components/responses/Error409"
 *         },
 *         "429": {
 *           "$ref": "#/components/responses/Error429"
 *         },
 *         "500": {
 *           "$ref": "#/components/responses/Error500"
 *         }
 *       }
 *     },
 *     "delete": {
 *       "tags": [
 *         "Bookings"
 *       ],
 *       "summary": "Delete a booking (owner or admin)",
 *       "description": "Permanently removes the booking and releases both the spot/date and member's daily slot.",
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation",
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
 *         "403": {
 *           "$ref": "#/components/responses/Error403"
 *         },
 *         "404": {
 *           "$ref": "#/components/responses/Error404"
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
const { getBookings, getBooking, createBooking, updateBooking, deleteBooking } = require("../controllers/bookings");
const { protect, authorize } = require("../middleware/auth");
const { serialize } = require("../middleware/serialize");

const router = express.Router();
router.use(protect);
router.get("/", getBookings);
router.post("/", authorize("member"), serialize(createBooking));
router.route("/:id").get(getBooking).put(serialize(updateBooking)).delete(serialize(deleteBooking));

module.exports = router;
