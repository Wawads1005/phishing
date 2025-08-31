const SIGNIN_FORM_ID = "signin_form";

const signInFormNode = document.getElementById(SIGNIN_FORM_ID);

(async () => {
  if (!(signInFormNode instanceof HTMLFormElement)) {
    return;
  }

  signInFormNode.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signInFormNode);
    const formInput = {};

    for (const [key, value] of formData) {
      formInput[key] = value;
    }

    try {
      const headers = new Headers();

      headers.set("content-type", "application/json");
      headers.set("content-length", `${JSON.stringify(formInput).length}`);

      const response = await fetch("/sites/steam", {
        method: "POST",
        body: JSON.stringify(formInput),
        headers,
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  });
})();
