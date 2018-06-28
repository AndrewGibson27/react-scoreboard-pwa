const typeDefs = `
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

  type TeamWithWinner {
    _id: ID!
    name: String!
    winner: Boolean!
  }

  input GameCreate {
    homeTeam: GameCreateTeam!
    awayTeam: GameCreateTeam!
    location: String!
    homeScore: Int
    awayScore: Int
    period: Int
    isInProgress: Boolean
    isFinal: Boolean
    date: String
  }

  input GameCreateTeam {
    info: ID!
    winner: Boolean
  }

  input GameUpdate {
    _id: ID!
    homeTeam: GameUpdateTeam
    awayTeam: GameUpdateTeam
    location: String
    homeScore: Int
    awayScore: Int
    period: Int
    isInProgress: Boolean
    isFinal: Boolean
    date: String
  }

  input GameUpdateTeam {
    info: ID
    winner: Boolean
  }


  type Team {
    _id: ID!
    name: String!
  }

  input TeamCreate {
    name: String!
  }

  input TeamUpdate {
    _id: ID!
    name: String
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
      input: TeamCreate!
    ): Team!

    updateTeam(
      input: TeamUpdate!
    ): Team!

    createGame(
      input: GameCreate!
    ): Game!

    updateGame(
      input: GameUpdate!
    ): Game!
  }
`;

export default typeDefs;
