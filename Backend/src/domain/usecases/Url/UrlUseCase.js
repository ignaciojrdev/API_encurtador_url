import { v4 as uuidv4 } from 'uuid';

export class CreateShortUrlUseCase {
    constructor() {}

    async execute(originalUrl) {
        const longUUID = uuidv4();
        const shortUrl = longUUID.slice(0, 6);
        return shortUrl;
    }
}

export class CreateIdShortUrlUseCase {
    constructor() {}

    async execute() {
        const id = uuidv4();
        return id
    }
}

export class SaveShortUrlUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(urlDTO) {
        //this.repository.save(urlDTO) e salvar no banco
    }
}

export class CreateDateUrlUseCase {
    constructor() {}

    async execute() {
        //parei aqui
    }
}