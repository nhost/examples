import nhost from "nhost-js-sdk";

const config = {
  base_url: process.env.REACT_APP_BACKEND_ENDPOINT,
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
