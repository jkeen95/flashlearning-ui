/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClass = /* GraphQL */ `
  query GetClass($id: ID!) {
    getClass(id: $id) {
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
export const listClasses = /* GraphQL */ `
  query ListClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClasses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncClasses = /* GraphQL */ `
  query SyncClasses(
    $filter: ModelClassFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncClasses(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getFlashcardSet = /* GraphQL */ `
  query GetFlashcardSet($id: ID!) {
    getFlashcardSet(id: $id) {
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
export const listFlashcardSets = /* GraphQL */ `
  query ListFlashcardSets(
    $filter: ModelFlashcardSetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlashcardSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncFlashcardSets = /* GraphQL */ `
  query SyncFlashcardSets(
    $filter: ModelFlashcardSetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFlashcardSets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
