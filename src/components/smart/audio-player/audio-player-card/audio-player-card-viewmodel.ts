import AudioPlayerService, {
  AudioPlayerServiceState,
} from "../../../../services/feature/audio-player-service";
import PlayListService, {
  PlayListServiceState,
} from "../../../../services/feature/play-list-service";
import { ServiceLocator } from "../../../../services/service-locator";

export class AudioPlayerCardViewModel {
  audioPlayerService: AudioPlayerService;
  playListService: PlayListService;

  audioPlayerServiceState: AudioPlayerServiceState;
  playListServiceState: PlayListServiceState;

  constructor() {
    this.audioPlayerService = ServiceLocator.resolve(AudioPlayerService.name);
    this.playListService = ServiceLocator.resolve(PlayListService.name);

    this.audioPlayerServiceState = this.audioPlayerService.serviceState;
    this.playListServiceState = this.playListService.serviceState;
  }
}
