/**
 * @swagger
 * {
 *   "/api/v1/spots": {
 *     "get": {
 *       "tags": [
 *         "Vendor spots"
 *       ],
 *       "summary": "List active vendor spots",
 *       "security": [],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/SpotListResponse"
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
 *       }
 *     },
 *     "post": {
 *       "tags": [
 *         "Vendor spots"
 *       ],
 *       "summary": "Create a vendor spot (admin only)",
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
 *               "$ref": "#/components/schemas/SpotInput"
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
 *                 "$ref": "#/components/schemas/SpotResponse"
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
 *         "429": {
 *           "$ref": "#/components/responses/Error429"
 *         },
 *         "500": {
 *           "$ref": "#/components/responses/Error500"
 *         }
 *       }
 *     }
 *   },
 *   "/api/v1/spots/{id}": {
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
 *         "Vendor spots"
 *       ],
 *       "summary": "Read an active vendor spot",
 *       "security": [],
 *       "responses": {
 *         "200": {
 *           "description": "Successful operation",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/SpotResponse"
 *               }
 *             }
 *           }
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
 *         "Vendor spots"
 *       ],
 *       "summary": "Update a vendor spot (admin only)",
 *       "description": "Updates spot information without changing existing booking dates or owners.",
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
 *               "$ref": "#/components/schemas/SpotUpdate"
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
 *                 "$ref": "#/components/schemas/SpotResponse"
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
 *         "Vendor spots"
 *       ],
 *       "summary": "Soft-delete a vendor spot (admin only)",
 *       "description": "Marks isActive=false; existing bookings remain readable and count toward their owner's daily limit.",
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
const { getSpots, getSpotBookedDates, getSpot, createSpot, updateSpot, deleteSpot } = require("../controllers/spots");
const { protect, authorize } = require("../middleware/auth");
const { serialize } = require("../middleware/serialize");

const router = express.Router();
router.route("/").get(getSpots).post(protect, authorize("admin"), serialize(createSpot));
router.route("/:id").get(getSpot).put(protect, authorize("admin"), serialize(updateSpot)).delete(protect, authorize("admin"), serialize(deleteSpot));
router.route("/:id/booked-dates").get(getSpotBookedDates);

module.exports = router;
