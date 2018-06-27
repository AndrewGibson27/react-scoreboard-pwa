const typeDefs = `
  type Team {
    _id: ID!
    name: String!
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
      name: String!
    ): Team!

    createGame(
      homeTeam: ID!
      awayTeam: ID!
      location: String!
      homeTeamWon: Boolean
      awayTeamWon: Boolean
      homeScore: Int
      awayScore: Int
      period: Int
      isInProgress: Boolean
      isFinal: Boolean
      date: String
    ): Game!
  }
`;

export default typeDefs;
