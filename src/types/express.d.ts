declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
      tokenVersion: number;
    }
  }
}

export default {};
