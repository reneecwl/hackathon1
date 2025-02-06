class CakesApi {
    constructor(apiKey="f0df7aa62dmsh6aa47e9f0a933d0p17f561jsn1d8fb1aa9a6d") {
        this.baseUrl = "https://the-birthday-cake-db.p.rapidapi.com/";
        this.apiKey = apiKey;
        this.options = {
            method: "GET",
            url: this.baseUrl,
            headers: {
                "x-rapidapi-key": this.apiKey,
                "x-rapidapi-host": this.baseUrl.slice(8)
            }
        }
    }

    async getAllCakes() {
        try {
            let result = {}
            const response = await axios.request(this.options);
            this.allCakes = response.data
            response.data.forEach(cake => {
                if (cake.difficulty in result) {
                    result[cake.difficulty].push(cake);
                } else {
                    result[cake.difficulty] = [cake];
                }
            });
            this.allCakesSorted = result;
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    async getCake(id) {
        try {
            const response = await axios.request({...this.options, url: this.baseUrl+id});
            return response.data;
            
        } catch (error) {
            console.error(error)
        }
    }

    async getHardCakes() {

        if(!this.allCakesSorted) {
            await this.getAllCakes()
        } 
        
        return (this.allCakesSorted["A challenge"].toSorted(() => Math.random() - Math.random())).splice(0, 3);
    }

    async getMediumCakes() {
        if(!this.allCakesSorted) {
            await this.getAllCakes()
        } 

        return (this.allCakesSorted["Medium"].toSorted(() => Math.random() - Math.random())).splice(0, 3);
    }

    async getEasyCakes() {
        if(!this.allCakesSorted) {
            await this.getAllCakes()
        } 

        return (this.allCakesSorted["Easy"].toSorted(() => Math.random() - Math.random())).splice(0, 3);
    }

    async getRandCakes() {
        if(!this.allCakes) {
           await this.getAllCakes() 
        }

        return (this.allCakes.toSorted(() => Math.random() - Math.random())).splice(0, 3);
    }
}
