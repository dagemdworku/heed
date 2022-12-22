export enum ServiceScope {
  factory,
  single,
}

class InstanceFactory<T> {
  creator?: (arg0: ServiceLocator) => T;
  scope?: ServiceScope;
  instance?: T;
}

export class ServiceLocator {
  private static _instances = new Map<string, InstanceFactory<any>>();

  static register<T>(
    scope: ServiceScope,
    name: string,
    creator: (locator: ServiceLocator) => T
  ) {
    const factory = new InstanceFactory();
    factory.creator = creator;
    factory.scope = scope;
    factory.instance = null;

    this._instances.set(name, factory);
  }

  static resolve<T>(name: string): T {
    const instance = this._instances.get(name);
    if (!instance) {
      throw new Error(`register ${name} first!!`);
    }

    const factory = instance as InstanceFactory<T>;
    if (factory.scope === ServiceScope.single) {
      if (factory.instance == null) {
        factory.instance = factory.creator!(this);
      }
      return factory.instance as T;
    }

    return factory.creator!(this) as T;
  }
}
