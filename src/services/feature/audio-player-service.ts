import { MutableRefObject } from "react";
import {
  HTMLMediaControls,
  HTMLMediaState,
} from "react-use/lib/factory/createHTMLMediaHook";
import { proxy } from "valtio";

export default class AudioPlayerService {
  private _state?: HTMLMediaState;
  private _controls?: HTMLMediaControls;

  public initialize(state: HTMLMediaState, controls: HTMLMediaControls) {
    this._state = state;
    this._controls = controls;

    this.serviceState.state = state;
  }

  public serviceState = proxy<{
    state: HTMLMediaState | undefined;
  }>({
    state: undefined,
  });

  // Media Controllers

  public play() {
    this._controls?.play();
  }

  public pause() {
    this._controls?.pause();
  }

  public seek(value: number) {
    this._controls?.seek(value);
  }

  public seekSlider(value: number) {
    const duration = this._state?.duration ?? 0.0;
    this._controls?.seek(Math.round(duration * value));
  }

  // Audio Controllers

  public setVolume(value: number) {
    this._controls?.volume(value);
  }

  public toggleMute() {
    this._state?.muted ? this._controls?.unmute() : this._controls?.mute();
  }
}
