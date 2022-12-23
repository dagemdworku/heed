import AudioPlayerService from "../services/feature/audio-player-service";
import BookPlayerService from "../services/feature/book-player-service";
import PlayListService from "../services/feature/play-list-service";
import { ServiceLocator, ServiceScope } from "../services/service-locator";

export function setupLocator() {
  ServiceLocator.register(ServiceScope.single, AudioPlayerService.name, (s) => {
    return new AudioPlayerService();
  });

  ServiceLocator.register(ServiceScope.single, BookPlayerService.name, (s) => {
    return new BookPlayerService();
  });

  ServiceLocator.register(ServiceScope.single, PlayListService.name, (s) => {
    return new PlayListService();
  });
}
