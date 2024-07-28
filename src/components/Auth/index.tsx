// async function loginUser(credentials) {
    const loginUser = async (credentials): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'mock-token-12345'
        });
      }, 1000); // Simulate a network delay
    });
  }
  export default loginUser;