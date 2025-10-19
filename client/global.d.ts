declare module "*.graphql" {
  import { DocumentNode } from "graphql";
  const doc: DocumentNode;
  export default doc;
}
