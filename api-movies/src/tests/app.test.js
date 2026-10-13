const request = require("supertest")
const app = require("../app")
const Netizen = require("../models/Netizen")
describe("Test createNetizen", () => {
    it("Devrait créer un nouveau internaute avec succès", async () => {
        // Données à envoyer
        const data = {
            "email": "brucewillis9@gmail.com",
            "firstName": "Bruce",
            "lastName": "Willis",
            "password": "testtestest",
            "birthYear": 1954
        }

        // Mock
        jest.spyOn(Netizen, 'create').mockResolvedValue({
            email: "brucewillis9@gmail.com",
            firstName: "Bruce",
            lastName: "Willis",
            password: "testtestest",
            birthYear: 1954
        })

        // Réponses
        const response = await request(app)
        .post("/api-movies/netizens")
        .send(data)



        // Vérifications
        expect(response.statusCode).toBe(201);
        expect(response.statusCode).not.toBe(400);
        expect(response.statusCode).not.toBe(409);
        expect(response.statusCode).not.toBe(500);

        jest.restoreAllMocks();
    }, 10000)
})