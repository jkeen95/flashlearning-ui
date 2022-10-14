/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClass = /* GraphQL */ `
  mutation CreateClass(
    $input: CreateClassInput!
    $condition: ModelClassConditionInput
  ) {
    createClass(input: $input, condition: $condition) {
      id
      name
      description
      FlashcardSets {
        items {
          id
          name
          description
          visibility
          titles
          definitions
          owner
          classID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateClass = /* GraphQL */ `
  mutation UpdateClass(
    $input: UpdateClassInput!
    $condition: ModelClassConditionInput
  ) {
    updateClass(input: $input, condition: $condition) {
      id
      name
      description
      FlashcardSets {
        items {
          id
          name
          description
          visibility
          titles
          definitions
          owner
          classID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteClass = /* GraphQL */ `
  mutation DeleteClass(
    $input: DeleteClassInput!
    $condition: ModelClassConditionInput
  ) {
    deleteClass(input: $input, condition: $condition) {
      id
      name
      description
      FlashcardSets {
        items {
          id
          name
          description
          visibility
          titles
          definitions
          owner
          classID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createFlashcardSet = /* GraphQL */ `
  mutation CreateFlashcardSet(
    $input: CreateFlashcardSetInput!
    $condition: ModelFlashcardSetConditionInput
  ) {
    createFlashcardSet(input: $input, condition: $condition) {
      id
      name
      description
      visibility
      titles
      definitions
      owner
      classID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateFlashcardSet = /* GraphQL */ `
  mutation UpdateFlashcardSet(
    $input: UpdateFlashcardSetInput!
    $condition: ModelFlashcardSetConditionInput
  ) {
    updateFlashcardSet(input: $input, condition: $condition) {
      id
      name
      description
      visibility
      titles
      definitions
      owner
      classID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteFlashcardSet = /* GraphQL */ `
  mutation DeleteFlashcardSet(
    $input: DeleteFlashcardSetInput!
    $condition: ModelFlashcardSetConditionInput
  ) {
    deleteFlashcardSet(input: $input, condition: $condition) {
      id
      name
      description
      visibility
      titles
      definitions
      owner
      classID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
