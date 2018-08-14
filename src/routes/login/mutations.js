export default `
  mutation LogInMutation($input: LogIn!) {
    logIn(input: $input) {
      firstName
      lastName
      email
      isAdmin
    }
  }
`;
