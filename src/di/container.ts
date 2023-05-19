import { Container } from "inversify";

const unboundContainer = new Container({ skipBaseClassChecks: true });

export default unboundContainer;