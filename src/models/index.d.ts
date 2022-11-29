import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type ClassMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FlashcardSetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SharedSetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Class {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly FlashcardSets?: (FlashcardSet | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Class, ClassMetaData>);
  static copyOf(source: Class, mutator: (draft: MutableModel<Class, ClassMetaData>) => MutableModel<Class, ClassMetaData> | void): Class;
}

export declare class FlashcardSet {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly visibility: string;
  readonly titles?: string[] | null;
  readonly definitions?: string[] | null;
  readonly owner: string;
  readonly classID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FlashcardSet, FlashcardSetMetaData>);
  static copyOf(source: FlashcardSet, mutator: (draft: MutableModel<FlashcardSet, FlashcardSetMetaData>) => MutableModel<FlashcardSet, FlashcardSetMetaData> | void): FlashcardSet;
}

export declare class SharedSet {
  readonly id: string;
  readonly setId: string;
  readonly username: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SharedSet, SharedSetMetaData>);
  static copyOf(source: SharedSet, mutator: (draft: MutableModel<SharedSet, SharedSetMetaData>) => MutableModel<SharedSet, SharedSetMetaData> | void): SharedSet;
}