// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Class, FlashcardSet, SharedSet } = initSchema(schema);

export {
  Class,
  FlashcardSet,
  SharedSet
};