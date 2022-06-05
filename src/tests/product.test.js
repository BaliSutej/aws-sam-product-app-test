const axios = require('axios');
const data = require('../data/data.json');

describe('Product Service Test ', () => {
    var authToken = "";
    beforeAll( async () => {
        const response = await axios.post("https://ei8pbbl4y0.execute-api.us-east-1.amazonaws.com/test/user/register", data.userRegister);
        expect(response.data.message).toBe("user successfully added");

        const loginresponse = await axios.post("https://ei8pbbl4y0.execute-api.us-east-1.amazonaws.com/test/user/login", data.userLogin);
        expect(loginresponse.status).toBe(200);
        expect(typeof loginresponse.data).toBe("object");
        expect(typeof loginresponse.data.token).toBe("string");
        authToken = loginresponse.data.token;
    });

    test('Add product endpoint test', async () => {
        const response = await axios.post("https://1l6ie35cm4.execute-api.us-east-1.amazonaws.com/test/product", data.product, {
            headers: {
                "authorizationToken": authToken
            }
        });

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe("object");
        expect(response.data.message).toBe("Product successfully added");
    });

    test('get product endpoint test', async () => {
        const response = await axios.get("https://1l6ie35cm4.execute-api.us-east-1.amazonaws.com/test/product?productId=prod1234", {
            headers: {
                "authorizationToken": authToken
            }
        });

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe("object");
        expect(response.data).toEqual(data.product);
    });

    test('update product price endpoint test', async () => {
        const response = await axios.put("https://1l6ie35cm4.execute-api.us-east-1.amazonaws.com/test/product?productId=prod1234",data.updatePrice, {
            headers: {
                "authorizationToken": authToken
            }
        });

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe("object");
        expect(response.data).toEqual(data.updatedProduct);
    });
    
    test('delete product endpoint test', async () => {

        const response = await axios.delete("https://1l6ie35cm4.execute-api.us-east-1.amazonaws.com/test/product?productId=prod1234",{
            headers: {
                "authorizationToken": authToken
            }
        })

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe("object");
        expect(response.data.message).toBe("Product Successfully deleted");

    });

    afterAll(() => {
        console.log("Cleanup  database");
    });
});



