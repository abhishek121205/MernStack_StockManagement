const backendUrl = "http://localhost:8050"

export const SummaryApi = {

    //user routers
    registerUser: {
        url: `${backendUrl}/user/signUp`,
        method: "POST"
    },
    loginUser: {
        url: `${backendUrl}/user/login`,
        method: "POST"
    },
    getCurrentUser: {  //credentials include
        url: `${backendUrl}/user/getCurrentUser`,
        method: "GET"
    },
    logoutUser: {  //credentials include
        url: `${backendUrl}/user/logout`,
        method: "GET"
    },

    // product routers
    getAllProduct: {
        url: `${backendUrl}/products/getAllProduct`,
        method: "GET"
    },
    addProduct: {
        url: `${backendUrl}/products/addProduct`,
        method: "POST"
    },
    deleteProduct: {
        url: `${backendUrl}/products/deleteProduct`,
        method: "DELETE"
    },
    updateProduct: {
        url: `${backendUrl}/products/updateProduct`,
        method: "PATCH"
    },
    getStock: {
        url: `${backendUrl}/products/getStock`,
        method: "GET"
    },

    // order routers
    makeOrder: {
        url: `${backendUrl}/order/makeOrder`,
        method: "POST"
    },
    getAllOrder: {
        url: `${backendUrl}/order/getAllOrder`,
        method: "GET"
    }
}