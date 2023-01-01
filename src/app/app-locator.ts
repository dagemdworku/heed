import { AudioPlayerCardViewModel } from "../components/smart/audio-player/audio-player-card/audio-player-card-viewmodel";
import { LayoutViewModel } from "../components/smart/layout/layout-viewmodel";
import LayoutService from "../services/core/layout.service";
import AudioPlayerService from "../services/feature/audio-player-service";
import BookPlayerService from "../services/feature/book-player-service";
import PlayListService from "../services/feature/play-list-service";
import { ServiceLocator, ServiceScope } from "../services/service-locator";

export function setupLocator() {
  // Services

  ServiceLocator.register(ServiceScope.single, LayoutService.name, (s) => {
    return new LayoutService();
  });

  ServiceLocator.register(ServiceScope.single, AudioPlayerService.name, (s) => {
    return new AudioPlayerService();
  });

  ServiceLocator.register(ServiceScope.single, BookPlayerService.name, (s) => {
    return new BookPlayerService();
  });

  ServiceLocator.register(ServiceScope.single, PlayListService.name, (s) => {
    return new PlayListService();
  });

  // View Models

  ServiceLocator.register(ServiceScope.factory, LayoutViewModel.name, (s) => {
    return new LayoutViewModel();
  });
  ServiceLocator.register(
    ServiceScope.factory,
    AudioPlayerCardViewModel.name,
    (s) => {
      return new AudioPlayerCardViewModel();
    }
  );
}
