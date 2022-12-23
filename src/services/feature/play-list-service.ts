import { proxy } from "valtio";
import { PlayList } from "../../models/play-list";

export default class PlayListService {
  public serviceState = proxy<{
    playList: PlayList | undefined;
    currentPlaying: string | undefined;
  }>({
    playList: undefined,
    currentPlaying: undefined,
  });

  public async load(src: string) {
    const playList = await fetch(src, {
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

    this.serviceState.currentPlaying = "001";
    this.serviceState.playList = playList;
  }

  public selectChapter(id: string) {
    this.serviceState.currentPlaying = id;
  }
}
