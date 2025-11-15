# Next.js and WebAuthn

Only writing two posts in 2022 was lame, I'm sorry. Let's kick off 2023 with a long post on a topic that I think a lot of people are interested in: WebAuthn. Specifically, let's add passkey authentication to a Next.js website!

> ℹ️ Demo Codebase
>
> You can find the complete [example application on my GitHub](https://github.com/ianmitchell/nextjs-webauthn).

## Prerequisites and Sources

To make this post more focused, I'm going to make assume familiarity with WebAuthn, Sessions, Next.js, and Prisma. If you'd like additional resources on WebAuthn, I found the following websites extremely helpful while learning about it:

- [WebAuthn Guide](https://webauthn.guide)
- [@github/webauthn-json Source Code](https://github.com/github/webauthn-json)
- [Simple WebAuthn Documentation](https://simplewebauthn.dev)
- [Passkeys on ImperialViolet](https://www.imperialviolet.org/2022/09/22/passkeys.html)

## Prisma Database Schema

Create a new Next.js application and [set up Prisma with an SQLite database](https://www.prisma.io/docs/getting-started/quickstart). We'll use this to store user accounts and credentials (also known as passkeys).

Let's start by defining a User model. For demonstration purposes, we'll define a User as having an email and username (these two fields are not required by WebAuthn).

```prisma title="prisma/schema.prisma"
model User {
  id          Int          @id @default(autoincrement())
  email       String       @unique
  username    String       @unique

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Next, let's add credentials. We can expect users to only register with a single credential which Apple, Google, or another service then syncs across platforms and devices for the most part. For iOS, a credential would be a Passkey that is stored on Keychain and available on all connected devices. In order to allow for people to add multiple credentials to their accounts though, we should make credentials their own model and create a one-to-many relationship with Users.

Credentials are composed of an optional user-supplied nickname ("My Phone"), a credential ID, a public key, and a sign-in count. I tend to call the credential ID `externalId` to prevent confusion with the primary ID of the credential model record.

```prisma title="prisma/schema.prisma"
model User {
  id          Int          @id @default(autoincrement())
  email       String       @unique
  username    String       @unique
  credentials Credential[] // [!code ++]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Credential { // [!code ++]
  id     Int  @id @default(autoincrement()) // [!code ++]
  user   User @relation(fields: [userId], references: [id]) // [!code ++]
  userId Int // [!code ++]
 // [!code ++]
  name       String? // [!code ++]
  externalId String  @unique // [!code ++]
  publicKey  Bytes   @unique // [!code ++]
  signCount  Int     @default(0) // [!code ++]
 // [!code ++]
  createdAt DateTime @default(now()) // [!code ++]
  updatedAt DateTime @updatedAt // [!code ++]
 // [!code ++]
  @@index([externalId]) // [!code ++]
} // [!code ++]
```

With this done, run `npx prisma migrate dev` to create the database file. Next up, let's add sessions to Next.js!

## Sessions

Next.js doesn't support sessions out of the box, so we'll need to add a dependency for this step. Install `iron-session` so that we can pass encrypted cookies to the server. Then create `lib/session.ts` and define the cookie.

```ts title="lib/session.ts"
import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
	password: process.env.SECRET_COOKIE_PASSWORD!,
	cookieName: "next-webauthn",
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
	},
};

// Define the cookie structure globally for TypeScript
declare module "iron-session" {
	interface IronSessionData {
		userId?: number;
		challenge?: string;
	}
}
```

Substitute the name with whatever you want to call the cookie. You'll need to add a password to your `.env.local` file and production Environmental Variables.

We are also declaring the cookie structure (lines 12-17). We'll be storing two pieces of information on this cookie; the User ID and a challenge string. We'll set `userId` when a user has authenticated and logged in, and `challenge` as part of the login and registration flow (we'll cover that soon).

With these changes, we'll have a `session` object on API and SSR `request` variables that we can use to read stored cookie data!

---

As a sidenote, sessions are one area that makes the [Remix](https://remix.run) framework interesting to me. Where Next.js focuses more on being a client framework, Remix has better out of the box support for server functionality like sessions. Adding WebAuthn to a Remix app is a lot more straightforward than I found it to be with Next.js!

---

## Registration

With the database defined and sessions implemented, we're ready to add account registration!

### Client

First we need to create a registration page. Let's create `pages/register.tsx` and prompt the user for their email and username.

```tsx title="pages/register.tsx"
import { Fragment, useState } from "react";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	return (
		<Fragment>
			<h1>Register Account</h1>
			<form method="POST">
				<input
					type="text"
					id="username"
					name="username"
					placeholder="Username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
				/>
				<input type="submit" value="Register" />
			</form>
		</Fragment>
	);
}
```

While most browsers support WebAuthn, we should still add a fallback error message. Install `@github/webauthn-json` - while the check itself is minimal, we'll use this package to create and login users on the client as well[^1].

```tsx title="pages/register.tsx"
import { Fragment, useEffect, useState } from "react"; // [!code ++]
import { supported } from "@github/webauthn-json"; // [!code ++]

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null); // [!code ++]

  useEffect(() => { // [!code ++]
    const checkAvailability = async () => { // [!code ++]
      const available = // [!code ++]
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(); // [!code ++]
      setIsAvailable(available && supported()); // [!code ++]
    }; // [!code ++]
 // [!code ++]
    checkAvailability(); // [!code ++]
  }, []); // [!code ++]

  return (
    <Fragment>
      <h1>Register Account</h1>
      {isAvailable ? ( // [!code ++]
        <form method="POST" onSubmit={onSubmit}>
          // Form Here - snipping it for length
        </form>
      ) : ( // [!code ++]
        <p>Sorry, WebAuthn is not available.</p> // [!code ++]
      )} // [!code ++]
    </Fragment>
  );
```

_As an improvement, you should check `isAvailable` for a null value and render a loading UI instead._

In order to register the user, we'll need a challenge code. This is a value generated on the server and passed to the client, so let's convert this page to SSR and generate a code. Create a new file called `lib/auth.ts` and write a function to create a secure base64 string challenge.

```ts title="lib/auth.ts"
import crypto from "node:crypto";

function clean(str: string) {
	return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function generateChallenge() {
	return clean(crypto.randomBytes(32).toString("base64"));
}
```

Then let's use this to add the challenge to the session in `getServerSideProps`.

```tsx title="pages/register.tsx"
import { Fragment, useEffect, useState } from "react";
import { supported } from "@github/webauthn-json";
import { withIronSessionSsr } from "iron-session/next"; // [!code ++]
import { generateChallenge } from "../lib/auth"; // [!code ++]
import { sessionOptions } from "../lib/session"; // [!code ++]

export default function Register() { // [!code --]
export default function Register({ challenge }: { challenge: string }) { // [!code ++]
  // ...
}

export const getServerSideProps = withIronSessionSsr(async function ({ // [!code ++]
  req, // [!code ++]
  res, // [!code ++]
}) { // [!code ++]
  const challenge = generateChallenge(); // [!code ++]
  req.session.challenge = challenge; // [!code ++]
  await req.session.save(); // [!code ++]
 // [!code ++]
  return { props: { challenge } }; // [!code ++]
}, // [!code ++]
sessionOptions); // [!code ++]
```

Now that our page has access to the server-generated `challenge`, we can write the form submit handler that creates the user account! We'll use a helper method from `@github/webauthn-json` to generate the JSON to send to a server, shoot a fetch request to our (not yet created) registration API endpoint, and then redirect the user to our admin page (also not yet created).

```tsx title="pages/register.tsx"
// ...
import { FormEvent, Fragment, useEffect, useState } from "react"; // [!code ++]
import { supported, create } from "@github/webauthn-json";// [!code ++]
import { useRouter } from "next/router";// [!code ++]

export default function Register({ challenge }: { challenge: string }) {
  const router = useRouter(); // [!code ++]
  const [error, setError] = useState(""); // [!code ++]
  // ...

  const onSubmit = async (event: FormEvent) => { // [!code ++]
    event.preventDefault(); // [!code ++]
 // [!code ++]
    // Create the credential // [!code ++]
    const credential = await create({ // [!code ++]
      publicKey: { // [!code ++]
        challenge: challenge, // [!code ++]
        rp: { // [!code ++]
          // Change these later // [!code ++]
          name: "next-webauthn", // [!code ++]
          id: "localhost", // [!code ++]
        }, // [!code ++]
        user: { // [!code ++]
          // Maybe change these later // [!code ++]
          id: window.crypto.randomUUID(), // [!code ++]
          name: email, // [!code ++]
          displayName: username, // [!code ++]
        }, // [!code ++]
        // Don't change these later // [!code ++]
        pubKeyCredParams: [{ alg: -7, type: "public-key" }], // [!code ++]
        timeout: 60000, // [!code ++]
        attestation: "direct", // [!code ++]
        authenticatorSelection: { // [!code ++]
          residentKey: "required", // [!code ++]
          userVerification: "required", // [!code ++]
        }, // [!code ++]
      }, // [!code ++]
    }); // [!code ++]
 // [!code ++]
    // Call our registration endpoint with the new account details // [!code ++]
    const result = await fetch("/api/auth/register", { // [!code ++]
      method: "POST", // [!code ++]
      body: JSON.stringify({ email, username, credential }), // [!code ++]
      headers: { // [!code ++]
        "Content-Type": "application/json", // [!code ++]
      }, // [!code ++]
    }); // [!code ++]
 // [!code ++]
    // Redirect to the admin page or render errors // [!code ++]
    if (result.ok) { // [!code ++]
      router.push("/admin"); // [!code ++]
    } else { // [!code ++]
      const { message } = await result.json(); // [!code ++]
      setError(message); // [!code ++]
    } // [!code ++]
  }; // [!code ++]

  return (
    <Fragment>
      <h1>Register Account</h1>
      {isAvailable ? (
        <form method="POST"> // [!code --]
        <form method="POST" onSubmit={onSubmit}> // [!code ++]
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input type="submit" value="Register" />
          {error != null ? <pre>{error}</pre> : null} // [!code ++]
        </form>
      ) : (
        <p>Sorry, webauthn is not available.</p>
      )}
    </Fragment>
  );
}
```

> ℹ️ This code has a bug!
>
> In the interest in keeping this demo tight, I cut a corner here that I would not in an application I was planning to ship. If you're following this guide to add WebAuthn to an application you intend to ship, it's important to create a multi-step registration flow instead of asking for a username and email upfront. When you call `create`, the browser will create the login - your application can't remove it later. If your server validation fails (let's say because the username was registered by someone else) _the browser will still have created an account_.
>
> Instead of having a registration all on one page, create a new model called Account, move `username` and `email` to that, and create a one-to-one relationship with the User model. Then, after a user clicks register and creates a User, prompt them for an email and username on a second page to create a new Account model. Any validation failures on this step won't impact the newly created User model and its Credential!

Let's add one last UX touch. If the user is logged in, let's redirect them to the admin page.

```ts title="lib/auth.ts"
import crypto from "node:crypto";
import { GetServerSidePropsContext, NextApiRequest } from "next"; // [!code ++]

// Handle API and SSR requests // [!code ++]
type SessionRequest = NextApiRequest | GetServerSidePropsContext["req"]; // [!code ++]

function clean(str: string) {
	return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function generateChallenge() {
	return clean(crypto.randomBytes(32).toString("base64"));
}

export function isLoggedIn(request: SessionRequest) {
	// [!code ++]
	return request.session.userId != null; // [!code ++]
} // [!code ++]
```

```ts title="pages/register.tsx"
export const getServerSideProps = withIronSessionSsr(async function ({
	req,
	res,
}) {
	if (isLoggedIn(req)) {
		// [!code ++]
		return {
			// [!code ++]
			redirect: {
				// [!code ++]
				destination: "/admin", // [!code ++]
				permanent: false, // [!code ++]
			}, // [!code ++]
		}; // [!code ++]
	} // [!code ++]

	// ...
}, sessionOptions);
```

### Server

We're finally ready to implement the registration API route! We're going to split this into two concerns; an API route that handles the request, and a function to register an account which we'll stick into our `lib/auth.ts` file.

First, let's create the API route. The route should register the account and then update the session with the account details.

```ts title="pages/api/auth/register.tsx"
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { register } from "../../../lib/auth";

async function handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		const user = await register(request);
		request.session.userId = user.id;
		await request.session.save();

		response.json({ userId: user.id });
	} catch (error: unknown) {
		console.error((error as Error).message);
		response.status(500).json({ message: (error as Error).message });
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
```

Next, let's implement the `register` function. This step is more interesting - validating a credential is a chunk of work. I tried to read the spec and implement the algorithm myself, but it was such a slog that eventually I realized I enjoyed stubbing my toe more than I enjoyed trying to implement the function. The better choice is to install `@simplewebauthn/server` to do the work for you - Matthew is just smarter than me. If you'd like to give writing validation yourself a go, you can [find the spec listing all the steps here](https://www.w3.org/TR/webauthn-2/#sctn-createCredential). Don't say I didn't warn you!

So! Install `@simplewebauthn/server` and then create a `register` function in `lib/auth.ts`. This function should call `verifyRegistrationResponse` to see if the credentials are valid, and if they are we want to create a new record in the database.

```ts title="lib/auth.ts"
import type {
	VerifiedAuthenticationResponse,
	VerifiedRegistrationResponse,
} from "@simplewebauthn/server";
import {
	verifyAuthenticationResponse,
	verifyRegistrationResponse,
} from "@simplewebauthn/server";
import type {
	PublicKeyCredentialWithAssertionJSON,
	PublicKeyCredentialWithAttestationJSON,
} from "@github/webauthn-json";

const HOST_SETTINGS = {
	expectedOrigin: process.env.VERCEL_URL ?? "http://localhost:3000",
	expectedRPID: process.env.RPID ?? "localhost",
};

// Helper function to translate values between
// `@github/webauthn-json` and `@simplewebauthn/server`
function binaryToBase64url(bytes: Uint8Array) {
	let str = "";

	bytes.forEach((charCode) => {
		str += String.fromCharCode(charCode);
	});

	return btoa(str);
}

export async function register(request: NextApiRequest) {
	const challenge = request.session.challenge ?? "";
	const credential = request.body
		.credential as PublicKeyCredentialWithAttestationJSON;
	const { email, username } = request.body;

	let verification: VerifiedRegistrationResponse;

	if (credential == null) {
		throw new Error("Invalid Credentials");
	}

	try {
		verification = await verifyRegistrationResponse({
			response: credential,
			expectedChallenge: challenge,
			requireUserVerification: true,
			...HOST_SETTINGS,
		});
	} catch (error) {
		console.error(error);
		throw error;
	}

	if (!verification.verified) {
		throw new Error("Registration verification failed");
	}

	const { credentialID, credentialPublicKey } =
		verification.registrationInfo ?? {};

	if (credentialID == null || credentialPublicKey == null) {
		throw new Error("Registration failed");
	}

	const user = await prisma.user.create({
		data: {
			email,
			username,
			credentials: {
				create: {
					externalId: clean(binaryToBase64url(credentialID)),
					publicKey: Buffer.from(credentialPublicKey),
				},
			},
		},
	});

	console.log(`Registered new user ${user.id}`);
	return user;
}
```

And we're done! Next up, let's create the `admin` page.

## Authentication

We can almost test our registration flow! Let's create the `pages/admin/index.tsx` Admin page that requires a logged-in user. There are a few ways to go about this, but the cleanest way is to add `getServerSideProps` and validate the session there. If the `userId` is not set, we redirect the user to the `/login` path.

```tsx title="pages/admin/index.tsx"
import { withIronSessionSsr } from "iron-session/next";
import { InferGetServerSidePropsType } from "next";
import { Fragment } from "react";
import { isLoggedIn } from "../../lib/auth";
import { sessionOptions } from "../../lib/session";

export default function Admin({
	userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<Fragment>
			<h1>Admin</h1>
			<span>User ID: {userId}</span>
		</Fragment>
	);
}

export const getServerSideProps = withIronSessionSsr(
	async ({ req: request, res: response }) => {
		if (!isLoggedIn(request)) {
			return {
				redirect: {
					destination: "/login",
					permanent: false,
				},
			};
		}

		return {
			props: {
				userId: request.session.userId ?? null,
			},
		};
	},
	sessionOptions,
);
```

If you register a new account, you should get automatically redirected to this page!

## Logout

Next up, let's implement the logout flow. When a user logs out, we want to destroy the session and redirect the user to the login screen. Create the new file at `pages/api/auth/logout.ts`:

```ts title="pages/api/auth/logout.ts"
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

function handler(request: NextApiRequest, response: NextApiResponse) {
	request.session.destroy();
	response.setHeader("location", "/login");
	response.statusCode = 302;
	response.end();
}

export default withIronSessionApiRoute(handler, sessionOptions);
```

Then we can add a form to our admin page to logout users with a button click:

```tsx title="pages/admin/index.tsx" highlight=8-10;add
export default function Admin({
	userId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<Fragment>
			<h1>Admin</h1>
			<span>User ID: {userId}</span>
			<form method="POST" action="/api/auth/logout">
				<button>Logout</button>
			</form>
		</Fragment>
	);
}
```

If you're surprised this works without JavaScript, I'd recommend reading through the [Remix documentation on forms](https://remix.run/docs/en/v1/guides/data-writes#plain-html-forms) - Remix doesn't do anything special with them, but their documentation is very accessible and clear.

## Login

At this point, you're able to register a new account, view a page only visible to logged in users, and logout by clicking a button. Let's add the ability to login with an existing account!

### Client

The login page will follow a similar pattern as our registration page. Rather than break it into multiple parts, I'm going to list the entire completed file; the main difference is the highlighted submission handler. Create a new `pages/login.tsx` page with the following code.

```tsx title="pages/login.tsx" {24-51}
import { FormEvent, Fragment, useEffect, useState } from "react";
import { supported, create, get } from "@github/webauthn-json";
import { withIronSessionSsr } from "iron-session/next";
import { generateChallenge, isLoggedIn } from "../lib/auth";
import { sessionOptions } from "../lib/session";
import { useRouter } from "next/router";

export default function Login({ challenge }: { challenge: string }) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

	useEffect(() => {
		const checkAvailability = async () => {
			const available =
				await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
			setIsAvailable(available && supported());
		};

		checkAvailability();
	}, []);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		// Retrieve a registered passkey from the browser
		const credential = await get({
			publicKey: {
				challenge,
				timeout: 60000,
				userVerification: "required",
				rpId: "localhost",
			},
		});

		const result = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, credential }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (result.ok) {
			router.push("/admin");
		} else {
			const { message } = await result.json();
			setError(message);
		}
	};

	return (
		<Fragment>
			<h1>Login</h1>
			{isAvailable ? (
				<form method="POST" onSubmit={onSubmit}>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<input type="submit" value="Login" />
					{error != null ? <pre>{error}</pre> : null}
				</form>
			) : (
				<p>Sorry, webauthn is not available.</p>
			)}
		</Fragment>
	);
}

export const getServerSideProps = withIronSessionSsr(async function ({
	req,
	res,
}) {
	if (isLoggedIn(req)) {
		return {
			redirect: {
				destination: "/admin",
				permanent: false,
			},
		};
	}

	const challenge = generateChallenge();
	req.session.challenge = challenge;
	await req.session.save();

	return { props: { challenge } };
}, sessionOptions);
```

### Server

Next, let's implement the login API route and method. Again, we'll split the code into two concerns, similar to what we did with the registration code. Start with the API route itself and create a new `pages/api/auth/login.ts` file.

```ts title="pages/api/auth/login.ts"
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../../lib/auth";

async function handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		const userId = await login(request);
		request.session.userId = userId;
		await request.session.save();

		response.json(userId);
	} catch (error) {
		response.status(500).json({ message: (error as Error).message });
	}
}

export default withIronSessionApiRoute(handler, sessionOptions);
```

Then we can add the `login` method to our auth file. This function requires a few additional steps than our registration function does; we need to find the right credential in our database, validate it with the credential sent by the browser, and then update the metadata of our record with a new sign in count.

```ts title="lib/auth.ts"
export async function login(request: NextApiRequest) {
	const challenge = request.session.challenge ?? "";
	const credential = request.body
		.credential as PublicKeyCredentialWithAssertionJSON;
	const email = request.body.email;

	if (credential?.id == null) {
		throw new Error("Invalid Credentials");
	}

	// Find our credential record
	const userCredential = await prisma.credential.findUnique({
		select: {
			id: true,
			userId: true,
			externalId: true,
			publicKey: true,
			signCount: true,
			user: {
				select: {
					email: true,
				},
			},
		},
		where: {
			externalId: credential.id,
		},
	});

	if (userCredential == null) {
		throw new Error("Unknown User");
	}

	let verification: VerifiedAuthenticationResponse;
	try {
		// Verify browser credential with our record
		verification = await verifyAuthenticationResponse({
			response: credential,
			expectedChallenge: challenge,
			authenticator: {
				credentialID: userCredential.externalId,
				credentialPublicKey: userCredential.publicKey,
				counter: userCredential.signCount,
			},
			...HOST_SETTINGS,
		});

		// Update our record's sign in count
		await prisma.credential.update({
			data: {
				signCount: verification.authenticationInfo.newCounter,
			},
			where: {
				id: userCredential.id,
			},
		});
	} catch (error) {
		console.error(error);
		throw error;
	}

	if (!verification.verified || email !== userCredential.user.email) {
		throw new Error("Login verification failed");
	}

	console.log(`Logged in as user ${userCredential.userId}`);
	return userCredential.userId;
}
```

## Closing Remarks

And with that, we're all done! Passkeys are a very interesting technology and I hope services start to adopt them. The developer experience for implementing them is a lot of work though, especially compared with traditional email/password accounts. I didn't even touch on recovery codes or adding new credentials to existing accounts, both of which a production implementation should have.

One thing that I found interesting is that (subjectively) Remix handles WebAuthn a little more elegantly than Next.js because of how server-intensive the authentication standard is. Remix has a lot of focus on server rendering and data loaders / action handling, and has sessions built in as a first-class API. I felt my Remix WebAuthn implementation was cleaner than the one I ended up with in Next.js.

Wrapping up, WebAuthn is tough! I spent a lot of time reading documentation on it, trying things out, and working through tricky bugs. I only got this far because I was able to continually bounce questions off my coworker [@devsnek](https://twitter.com/devsnek), who has the patience of a saint. Hopefully this guide helps others figure it out; as always, feel free to reach out with feedback or questions, I'm happy to talk!

[You can find a working demo here.](https://github.com/ianmitchell/nextjs-webauthn)

[^1]: Despite requiring the payload to be sent to the server, credentials have no built in `.toJSON()` method. This is **extremely** frustrating to work with as a developer, and a surprisingly lapse in the web standard. The `@github/webauthn-json` package converts the clientside payload to JSON in the meantime; hopefully in the future it won't be needed.
