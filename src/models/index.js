// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Class, FlashcardSet } = initSchema(schema);

export {
  Class,
  FlashcardSet
};