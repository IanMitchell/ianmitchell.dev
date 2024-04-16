---
title: The Best Way to Write React Forms
date: 2024-04-16
---

I got involved in a [Twitter conversation](https://twitter.com/devongovett/status/1780034498249511410) about the ideal way of writing React forms over the weekend, and I wanted to write a longer form post about what I view as the current best way of creating them.

# Submission (Server Actions)

If you’re using Next.js and the App Router, [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms) are a great way of writing form submit handlers. I always put actions in a different folder (usually `/actions`) instead of writing them inline to avoid some tricky security edge cases.

This submission style circumvents relying on controlled inputs, form submission interceptors, custom front-end API requests, and more. Clean and easy!

# Validation (Valibot)

Once the data hits the backend, you’ll need to verify it. You can use Valibot or Zod to parse the `formData` input into a typed and validated structure.

```ts title="actions/create-workspace.ts"
const { workspaceName, developmentName, developmentOrigin, developmentRPID } =
	parse(
		object({
			// Simplified assertions
			workspaceName: string(),
			developmentName: string(),
			developmentOrigin: string(),
			developmentRPID: string(),
		}),
		{
			workspaceName: formData.get("workspaceName")?.toString(),
			developmentName: formData.get("developmentName")?.toString(),
			developmentOrigin: formData.get("developmentOrigin")?.toString(),
			developmentRPID: formData.get("developmentRPID")?.toString(),
		},
	);
```

You can even write custom error messages here for different failure states. For instance, you can enforce a required parameter with one error message and an invalid length with another.

_I see Zod recommended a lot, but I prefer Valibot’s API and slimmer package size. The lack of documentation can be really difficult sometimes, but it hasn’t become a deal breaker yet._

# Interactivity (React Aria Components)

The only tricky part of having per-field error messages from Valibot or Zod is then mapping these error messages to the appropriate form input. This can take a lot of boilerplate to do well. Luckily, [React Aria Components](https://react-spectrum.adobe.com/react-aria/forms.html) handles this for us!

React Aria has fantastic support for accessibility and common expected interactions with various UI elements. Their recent component library goes further, and has a lot of great integrations that streamline common design patterns - such as adding error information to forms!

By using React’s `useFormState` we can read the action result of previous submits and use it to display any errors our action returned.

```tsx title="app/components/EditUsernameForm.tsx"
export function EditUsernameForm() {
	const [result, create] = useFormState(editWorkspace, initialState);

	return (
		// `validationErrors={}` is the only step needed!
		<Form action={create} validationErrors={result.errors}>
			<TextField
				autoFocus
				label="Name"
				id="username"
				name="username"
				type="text"
				isRequired
			/>
		</Form>
	);
}
```

# Tying it Together

While it isn’t necessary, I think adding a few helper functions provides a lot of benefits. I appreciate Rust’s `Result` pattern a lot - by taking inspiration from it, we can add some ergonomics to the API.

If we strongly type our actions to return `{ ok: boolean; errors: [] } | { ok: boolean; data: T}` it makes working with the action result on the frontend a lot easier. We can key off the `ok` value to know if we’re in a success state or error state. The following type helpers help enforce that structure.

```ts title="types/actions.ts"
/**
 * The initial Action state
 */
export type InitialState = {
	ok: undefined;
	errors: undefined;
};

/**
 * Actions should generally return a Promise<ActionResult<T>>.
 * Their `initialState` should be `ActionResult<T>`.
 */
export type ActionResult<T> = InitialState | ErrorResult | SuccessResult<T>;

/**
 * Sucessful actions can return JSON of any shape under `data`.
 */
export interface SuccessResult<T> {
	ok: true;
	data: T;
	errors: undefined;
}

/**
 * An error response should have a top level `error` string, and then keyed
 * messages depending on what fields errored out.
 */
export interface ErrorData extends Record<string, string> {
	error: string;
}

/**
 * An error response shape
 */
export interface ErrorResult {
	ok: false;
	errors: ErrorData;
}
```

We can add some action wrapper methods to help return responses in this format

```ts title="lib/actions.ts"
import {
	type ActionResult,
	type ErrorData,
	type ErrorResult,
	type InitialState,
	type SuccessResult,
} from "@/types/actions";

/**
 * When using `useFormState`, this should be the initialState value
 */
export const initialState: InitialState = { ok: undefined, errors: undefined };

/**
 * Formats and returns a successful action result value
 * @param data The JSON value the action wants to return
 * @returns A formatted successful action result value
 */
export function ok<T>(data: T): SuccessResult<T> {
	return {
		ok: true,
		data,
		errors: undefined,
	};
}

/**
 * Formats and returns an unsuccessful action result
 * @param errors An error object keyed of field or an error string
 * @returns A formatted action error value
 */
export function error(errors: ErrorData | string): ErrorResult {
	const result = typeof errors === "string" ? { error: errors } : errors;

	return {
		ok: false,
		errors: result,
	};
}

export function isError<T>(response: ActionResult<T>): response is ErrorResult {
	return response.ok === false;
}

export function isSuccess<T>(
	response: ActionResult<T>,
): response is SuccessResult<T> {
	return response.ok === true;
}
```

An action that uses these patterns in Next.js would look like this:

```ts title="actions/edit-username.ts"
export async function editUsername(
	previousState: ActionResult<void>,
	formData: FormData,
): Promise<ActionResult<{ userId: string }>> {
	const user = await getLoggedInUser();

	if (user == null) {
		redirect("/login");
	}

	try {
		const { username } = parse(
			object({
				username: string(),
			}),
			{
				username: formData.get("username")?.toString(),
			},
		);

		const userId = await editUser({ username });

		return ok({ userId });
	} catch (err) {
		// Next.js redirects and 404s throw errors we don't want to intercept
		if (isRedirectError(error) || isNotFoundError(error)) {
			throw err;
		}

		console.error(err);
		return error(err.message);
	}
}
```

You can then read from `result.ok` on the client to type narrow the response as necessary. A client component that manually calls an action might look like this:

```tsx title="app/components/EditUsernameForm.tsx"
const result = await editUsername(data);

if (result.ok === true) {
	// Fully type safe!
	router.push(`/profiles/${result.userId}`);
} else {
	setErrors(result.errors);
}
```

---

I haven’t found a pattern to write forms with server actions that offers better DX (and UX!). It doesn’t take much work to set up, and it’s incredibly fast to create new forms with.

This is the pattern we’re using heavily at [0x57](https://www.0x57.dev). We’re doing a lot of cool stuff over there, and just opened up an alpha test for anyone interested. Come say hi!
