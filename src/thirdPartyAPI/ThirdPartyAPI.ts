import { RESTDataSource } from 'apollo-datasource-rest'
import { uuid } from 'uuidv4';


class ThirdPartyAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:3000/';
    }

    async getBook(id: string) {
        return this.get(`books/${id}`);
    }

    async getBooks(limit = 10) {
        const data = await this.get('books', {
            per_page: limit,
        });
        return data;
    }

    async addBook(title: string, author: string) {
        return this.post(`books`, {
            id: uuid(),
            title,
            author,
        })
    }
}

export default ThirdPartyAPI