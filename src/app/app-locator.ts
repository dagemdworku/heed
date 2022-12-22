import AudioPlayerService from "../services/feature/audio-player-service";
import { ServiceLocator, ServiceScope } from "../services/service-locator";

export function setupLocator() {
  ServiceLocator.register(ServiceScope.single, AudioPlayerService.name, (s) => {
    return new AudioPlayerService();
  });
}
