# Night Market Vendor Spot Booking API

A RESTful backend API for browsing night market vendor spots and booking a selling space on a selected date. It supports user authentication, role-based access control, vendor spot administration, and date-specific booking rules.

## Features

### Authentication and Users

- Register and log in with email and password
- Password hashing with bcryptjs
- JWT bearer-token authentication through the Authorization header
- Roles: `admin` and `member`
- Protected routes and role-based authorization
- Registration accepts either role, following PJ01-SportFacility through PJ04-CarServiceAppoint
- Registration and login return `data.token` and set an HTTP-only cookie; authentication middleware reads the bearer header only
- Logout clears the cookie; clients must discard their bearer token, which remains valid until expiration

### Vendor Spots

- Public vendor spot listing and detail endpoints
- Admin-only create, update, and delete operations
- Fields: spot number, zone, spot size, location description, and rental fee
- All descriptive fields must be nonempty strings; rental fee must be a nonnegative number
- Spot size is descriptive text, for example `2 x 2 m`; the specification does not define a fixed unit or numeric size format
- New spots receive a MongoDB `_id` for updates, deletion, and booking creation
- Booking identity is the spot's `_id`. Spot numbers are display labels and are not constrained to be globally unique
- Deletion is a soft delete (`isActive=false`); existing bookings remain available
- Spot updates change catalog information without changing existing booking dates or owners

### Bookings

- Members book an active spot by its ID, selecting a booking date and describing the product type to sell
- Each booking references one spot and the authenticated member
- Product type is free text, for example `Food and drinks` or `Handmade crafts`
- Members can view, edit, and delete their own bookings
- Admins can view, edit, and delete any member's bookings; creation is member-only
- Ownership comes from authentication and cannot be changed through request bodies
- Updates accept the fields being changed; omitted fields retain their current values
- Responses include populated spot and member details
- Booking deletion permanently removes the record and releases its spot/date and the member's daily slot

### Booking Rules

- Booking dates must be real calendar dates in `YYYY-MM-DD` format, interpreted in **UTC**, and cannot precede today
- A spot can have only one booking per UTC date across all members
- A member can book the same spot only once per date
- A member can book multiple different spots, up to three spots per UTC date
- An already booked spot is unavailable on that date; it can still be booked on another date
- The three-spot limit applies independently to each date, rather than to all future bookings combined
- Create and update enforce the same rules; updates exclude their own record and check the original owner's limit, including admin updates
- A member at the daily limit may move an existing booking to another available spot without increasing their count
- Moving a booking to a different date checks the limit on the target date
- Bookings that reference soft-deleted spots still count toward their owner's daily limit until the booking itself is deleted or moved
- History remains readable and deletable after the date or spot deletion. Editing requires a date today or later and an active target spot
- Spot and booking mutations are serialized within one Node.js process
- A unique database index on `(spot, bookingDate)` also protects spot/date exclusivity; an index on `(user, bookingDate)` supports daily-limit checks

The member's daily-count check assumes one backend process. Multiple processes or server instances require database-level transaction/locking coordination to enforce that count across instances. The unique spot/date index protects exclusivity across instances when the index exists. The specification does not define approval, payment, or product-category restrictions. Rental fee is catalog information; booking responses show the current spot details rather than a saved price.

### Security and Documentation

- Helmet security headers
- CORS support
- Rate limiting: 100 requests per IP per 10 minutes
- HTTP parameter pollution protection
- Swagger/OpenAPI documentation at `/api-docs`
- Health check at `/health` (application status only; does not check database connectivity)

## Technology Stack

- Node.js and Express.js
- MongoDB with Mongoose ODM
- JWT and bcryptjs
- Swagger UI and OpenAPI
- Nodemon for development

Dependency ranges and locked versions match PJ04-CarServiceAppoint, including Express `^5.1.0` (locked `5.2.1`) and Mongoose `^8.24.4` (locked `8.24.4`). The project uses the same CommonJS modules, async controllers, authentication middleware, Mongoose models, mutation serialization, and response conventions as the existing projects.

## Project Structure

```text
config/          Environment and database configuration
controllers/     Request handlers and business rules
middleware/      Authentication, authorization, and mutation serialization
models/          Mongoose schemas and booking indexes
routes/          Express API routes and Swagger documentation
server.js        Application entry point
2026-PJ05.md     Thai (English) project and API documentation
```

## Setup

1. From `PJ05-MarketVendorBook`, install the locked dependencies:

   ```bash
   npm ci
   ```

2. Set `MONGO_URI` in `config/config.env` to your MongoDB connection string. It is intentionally blank initially. Set your own `JWT_SECRET` before deploying; the included value is generated for local development.

   ```dotenv
   NODE_ENV=development
   PORT=5000
   MONGO_URI=
   JWT_SECRET=<your-secret>
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30
   FRONTEND_URL=http://localhost:3000
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Use `npm start` to run without Nodemon. If PowerShell blocks `npm.ps1`, use `npm.cmd ci` and `npm.cmd run dev`.

The API runs on `http://localhost:5000` by default. Change `PORT` if another project already uses port 5000. With `MONGO_URI` blank, welcome, Swagger UI, and health endpoints work; database-backed APIs require a configured connection. Allow Mongoose to create the booking uniqueness index when connecting to a new database.

## API Routes

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| GET | `/api/v1/auth/me` | Member or admin |
| GET | `/api/v1/auth/logout` | Member or admin |
| GET | `/api/v1/spots` | Public |
| GET | `/api/v1/spots/:id/booked-dates` | Public |
| GET | `/api/v1/spots/:id` | Public |
| POST | `/api/v1/spots` | Admin |
| PUT | `/api/v1/spots/:id` | Admin |
| DELETE | `/api/v1/spots/:id` | Admin |
| GET | `/api/v1/bookings` | Member sees own; admin sees all |
| GET | `/api/v1/bookings/:id` | Owner or admin |
| POST | `/api/v1/bookings` | Member |
| PUT | `/api/v1/bookings/:id` | Owner or admin |
| DELETE | `/api/v1/bookings/:id` | Owner or admin |

The 14 application endpoints are supplemented by `GET /`, `GET /health`, and `GET /api-docs`. Swagger documents all 17 operations. The public spot endpoints return active catalog entries; availability is checked for the requested date when creating or updating a booking.

Successful responses use `{ success: true, data }`, with `count` for lists. Registration and login return the JWT in `data.token`. Creation returns 201; other successful application operations return 200. Errors use `{ success: false, error }`: explicit input validation returns 400, missing/invalid authentication 401, forbidden access 403, missing resources 404, booking conflicts 409, and rate limiting 429. As in the existing projects, other unhandled Mongoose validation/cast errors reach the global error handler and default to 500. Booking duplicate-key errors are handled as 409.

### Vendor Spot Request Example

`POST /api/v1/spots` with an admin token:

```json
{
  "spotNumber": "A01",
  "zone": "Food zone",
  "spotSize": "2 x 2 m",
  "locationDescription": "Near the main entrance",
  "rentalFee": 300
}
```

### Booking Request Example

`POST /api/v1/bookings` with a member token:

```json
{
  "spot": "<spot MongoDB ID>",
  "bookingDate": "2026-12-01",
  "productType": "Food and drinks"
}
```

Replace the spot placeholder with `_id` from the vendor spot response. Use a date that is today or later when trying this example. The date identifies the UTC day, and the response stores it as an ISO timestamp at UTC midnight.

To reschedule, use `PUT /api/v1/bookings/:id`:

```json
{
  "bookingDate": "2026-12-02",
  "productType": "Handmade crafts"
}
```

To move to a different spot, include `spot` with the new active spot ID. The old spot/date is released after a successful move.

Send `Authorization: Bearer <JWT>` with protected requests. In Swagger, click **Authorize** and paste `data.token` without the `Bearer ` prefix. To try the complete workflow, register an admin and a member, create spots as admin, then book and manage them as member.

## Checks

```bash
npm test
```

`npm test` performs the same entry-point syntax check as the existing projects. Development verification passed 22 scenarios using real HTTP routes, controllers, middleware, JWT/password methods, and schemas with in-memory persistence, including ownership, independent daily limits, booking moves, soft deletion, slot release, and concurrent requests. It did not connect to MongoDB. Use Swagger UI against a test MongoDB database after configuring `MONGO_URI` to verify database integration.
