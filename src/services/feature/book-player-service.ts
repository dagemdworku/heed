import { proxy } from "valtio";
import { Fragment } from "../../models/book";

export default class BookPlayerService {
  public serviceState = proxy<{
    fragment: Fragment | undefined;
  }>({
    fragment: undefined,
  });

  public async load(src: string) {
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
  }
}
