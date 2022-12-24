import { proxy } from "valtio";
import { PlayList } from "../../models/play-list";

export default class PlayListService {
  public serviceState = proxy<{
    playList: PlayList | undefined;
    currentPlaying: string | undefined;
    currentAudio: string;
    currentBook: string | undefined;
    currentChapter: string | undefined;
  }>({
    playList: undefined,
    currentPlaying: undefined,
    currentAudio: "",
    currentBook: undefined,
    currentChapter: undefined,
  });

  public async load(src: string) {
    try {
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

      this.serviceState.playList = playList;

      this.selectChapter("foundation_part_001_chapter_001");
    } catch (e) {
      console.log("Something went wrong loading playlist.");
    }
  }

  public selectChapter(id: string) {
    this.serviceState.currentPlaying = id;
    this.serviceState.currentAudio =
      this.serviceState.playList?.chapters.find(
        (chapter) => chapter.id === this.serviceState.currentPlaying
      )?.audio ?? "";

    this.serviceState.currentBook = this.serviceState.playList?.chapters.find(
      (chapter) => chapter.id === this.serviceState.currentPlaying
    )?.book;
    this.serviceState.currentChapter =
      this.serviceState.playList?.chapters.find(
        (chapter) => chapter.id === this.serviceState.currentPlaying
      )?.name;
  }
}
