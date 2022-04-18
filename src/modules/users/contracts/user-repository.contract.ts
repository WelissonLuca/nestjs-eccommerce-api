export interface UserRepositoryContracts {
  findOneByEmail(email: string): Promise<any>;
  create(user: any): Promise<any>;
}
