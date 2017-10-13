import * as THREE from "three";
import {BoxGeometry, Mesh} from "three";
import {WrappedEntityDescriptor, WrapperDetails} from "../common/ObjectWrapper";

interface IBoxGeometryProps {
  width: number;
  height: number;
  depth: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      boxGeometry: IThreeElementPropsBase<THREE.BoxGeometry> & IBoxGeometryProps;
    }
  }
}

class BoxGeometryWrapper extends WrapperDetails<IBoxGeometryProps, BoxGeometry> {
  private container: Mesh | null;

  constructor(props: IBoxGeometryProps) {
    super(props);

    this.container = null;

    this.wrapObject(new BoxGeometry(props.width,
      props.height,
      props.depth,
      props.widthSegments,
      props.heightSegments,
      props.depthSegments));
  }

  public addedToParent(instance: BoxGeometry, container: Mesh): void {
    this.container = container;
    /* */
  }

  public willBeRemovedFromParent(instance: BoxGeometry, container: Mesh): void {
    if (this.container === container) {
      this.container = null;
    }
    /* */
  }

  protected recreateInstance(newProps: IBoxGeometryProps): BoxGeometry {
    const boxGeometry = this.wrappedObject;

    if (boxGeometry !== null) {
      const newBoxGeometry = new BoxGeometry(newProps.width,
        newProps.height,
        newProps.depth,
        newProps.widthSegments,
        newProps.heightSegments,
        newProps.depthSegments);

      if (this.container !== null) {
        this.container.geometry = newBoxGeometry;
      }

      return newBoxGeometry;
    }

    // it's not even mounted yet...
    throw new Error("props were modified before boxGeometry could be mounted...\n" +
      "How did this happen?\n" +
      "Please create an issue with details!");
  }
}

class BoxGeometryDescriptor extends WrappedEntityDescriptor<IBoxGeometryProps,
  BoxGeometry,
  Mesh,
  BoxGeometryWrapper> {
  constructor() {
    super(BoxGeometryWrapper, BoxGeometry);

    this.hasRemountProps("width",
      "height",
      "depth",
      "widthSegments",
      "heightSegments");
  }
}

export default new BoxGeometryDescriptor();
