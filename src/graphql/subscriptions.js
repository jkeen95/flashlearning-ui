/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClass = /* GraphQL */ `
  subscription OnCreateClass {
    onCreateClass {
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
export const onUpdateClass = /* GraphQL */ `
  subscription OnUpdateClass {
    onUpdateClass {
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
export const onDeleteClass = /* GraphQL */ `
  subscription OnDeleteClass {
    onDeleteClass {
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
export const onCreateFlashcardSet = /* GraphQL */ `
  subscription OnCreateFlashcardSet {
    onCreateFlashcardSet {
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
export const onUpdateFlashcardSet = /* GraphQL */ `
  subscription OnUpdateFlashcardSet {
    onUpdateFlashcardSet {
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
export const onDeleteFlashcardSet = /* GraphQL */ `
  subscription OnDeleteFlashcardSet {
    onDeleteFlashcardSet {
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
