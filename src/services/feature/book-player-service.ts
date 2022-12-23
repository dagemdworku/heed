import { proxy } from "valtio";
import { Fragment } from "../../models/book";

export default class BookPlayerService {
  public serviceState = proxy<{
    fragment: Fragment | undefined;
  }>({
    fragment: undefined,
  });

  public async load(src?: string) {
    if (!src) return;

    try {
      const fragment = await fetch(src, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          return data;
        });

      this.serviceState.fragment = fragment;
    } catch (e) {
      console.log("Something went wrong loading book.");
    }
  }
}
