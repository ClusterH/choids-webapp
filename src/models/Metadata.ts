export interface Trait {
  trait_type: string;
  value: string;
}
export interface Metadata {
  name: string;
  creator: string | null | undefined;
  image: string;
  version: number;
  attributes?: Trait;
}
