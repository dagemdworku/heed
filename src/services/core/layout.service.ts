import { proxy } from "valtio";

export type LayoutServiceState = {
  showSideBar: boolean;
  showNavBar: boolean;
  showChaptersDialog: boolean;
};

export default class LayoutService {
  public serviceState = proxy<LayoutServiceState>({
    showSideBar: false,
    showNavBar: false,
    showChaptersDialog: false,
  });

  // Layout Controllers

  public setShowSideBar(value: boolean) {
    this.serviceState.showSideBar = value;
  }
  public setShowNavBar(value: boolean) {
    this.serviceState.showNavBar = value;
  }
  public setShowChaptersDialog(value: boolean) {
    this.serviceState.showChaptersDialog = value;
  }
}
