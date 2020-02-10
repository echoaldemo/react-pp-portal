import { get } from "utils/api";

let userData: any = null;

export default async function getData() {
  try {
    const { data } = await get("/identity/user/profile/");
    userData = data;
    return data;
  } catch (err) {
    console.log(err);
  }
}

export { userData };
