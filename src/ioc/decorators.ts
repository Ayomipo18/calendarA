import container from "./container";
import getDecorators from "inversify-inject-decorators";

const { lazyInject } = getDecorators(container);

export default lazyInject;