const typeDefs = `
  input GameInputTeam {
    info: ID!
    winner: Boolean
  }

  input GameInput {
    homeTeam: GameInputTeam!
    awayTeam: GameInputTeam!
    location: String!
    homeScore: Int
    awayScore: Int
    period: Int
    isInProgress: Boolean
    isFinal: Boolean
    date: String
  }

  type TeamWithWinner {
    _id: ID!
    name: String!
    winner: Boolean!
  }

  type Game {
    _id: ID!
    homeTeam: TeamWithWinner!
    awayTeam: TeamWithWinner!
    homeScore: Int!
    awayScore: Int!
    period: Int!
    isInProgress: Boolean!
    isFinal: Boolean!
    location: String!
    date: String!
  }

  input TeamInput {
    name: String!
  }

  type Team {
    _id: ID!
    name: String!
  }

  type Query {
    allTeams(
      start: Int
      limit: Int
    ): [Team!]!

    allGames(
      start: Int
      limit: Int
    ): [Game!]!
  }

  type Mutation {
    createTeam(
      input: TeamInput!
    ): Team!

    updateTeam(
      input: TeamInput!
      _id: ID!
    ): Team!

    createGame(
      input: GameInput!
    ): Game!

    updateGame(
      input: GameInput!
      _id: ID!
    ): Game!
  }
`;

export default typeDefs;
