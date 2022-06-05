const axios = require('axios');
const data = require("../data/data.json"); 

describe('User Service Test ', () => {
    
    test('User register endpoint test', async () => {
        const response = await axios.post("https://ei8pbbl4y0.execute-api.us-east-1.amazonaws.com/test/user/register", data.userRegister);
        expect(response.data.message).toBe("user successfully added");
    });

    test('Valid user login test using user endpoint', async () => {
        const response = await axios.post("https://ei8pbbl4y0.execute-api.us-east-1.amazonaws.com/test/user/login", data.userLogin);

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe("object");
        expect(typeof response.data.token).toBe("string");
    });

    test('Invalid user login test using user endpoint', async () => {
        try {
            const response = await axios.post("https://ei8pbbl4y0.execute-api.us-east-1.amazonaws.com/test/user/login", data.invalidUserCredentials);
        } catch (error) {
            const response = error.response;
            expect(response.status).toBe(400);
            expect(typeof response.data).toBe("object");
            expect(response.data.error).toBe("Invalid Username or Password");

        }
    });

    test('delete user test using user endpoint', async () => {
        const response = await axios.post("https://ei8pbbl4y0.execute-api.us-east-1.amazonaws.com/test/user/delete", data.userLogin);

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe("object");
        expect(response.data.message).toBe("User Successfully deleted");
    });

    afterAll(() => {
        console.log("Cleanup database");
    });
});



