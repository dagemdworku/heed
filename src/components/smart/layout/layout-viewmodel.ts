import { DeepReadonly } from "ts-essentials";
import { useSnapshot } from "valtio";
import LayoutService, {
  LayoutServiceState,
} from "../../../services/core/layout.service";
import { ServiceLocator } from "../../../services/service-locator";

export class LayoutViewModel {
  layoutService: LayoutService;

  layoutServiceState: LayoutServiceState;

  constructor() {
    this.layoutService = ServiceLocator.resolve(LayoutService.name);
    this.layoutServiceState = this.layoutService.serviceState;
  }

  setShowSideBar(value: boolean) {
    this.layoutService.setShowSideBar(value);
  }
}
