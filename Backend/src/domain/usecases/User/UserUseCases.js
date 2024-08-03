export class GetUserByTokenUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(userDTO) {
        return await this.repository.getUserByToken(userDTO.token); // return userDTO preenchido
    }
}