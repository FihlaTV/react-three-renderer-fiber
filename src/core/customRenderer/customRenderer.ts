import {IPropMap} from "../renderer/fiberRenderer/prepareUpdate";

export type ICustomReactRenderer<TRootContainer> = any;

export interface INativeElement<TProps, T, TParent, TChild, TRoot, TRenderer extends ICustomReactRenderer<any>> {
  createInstance(props: TProps, rootContainerInstance: TRoot): T;

  applyInitialPropUpdates(instance: T, props: TProps): void;

  willBeRemovedFromParent(instance: T, parent: TParent): void;

  appendInitialChild(instance: T, child: TChild): void;

  appendChild(instance: T, child: TChild): void;

  removeChild(instance: T, child: TChild): void;

  appendToContainer(instance: T, container: TParent): void;

  commitUpdate(instance: any,
               updatePayload: any[],
               oldProps: IPropMap,
               newProps: IPropMap): void;
}