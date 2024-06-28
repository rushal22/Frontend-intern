export const userEnd = {
    "login" : {
        'url' : '/login',
        'method' : 'POST'
    },
    "signup" : {
        'url' : '/register',
        'method': 'POST'
    },
    "forgetpassword" : {
        'url' : '/password/forget',
        'method' : 'POST'
    },
    "reset" : {
        'url' : "/resetpassword/:token",
        'method' : 'POST'
    },
    "profile": {
        'url' : '/profile',
        'method' : "GET"
    },
    "editprofile" : {
        'url' : '/editprofile',
        'method' : "POST"
    },
    "adminManagement" : {
        'url' : '/users',
        'method' : 'GET'
    },
    "editAdminManagement" : {
        'url' : "/users/:id",
        'method' : 'PUT'
    },
    "userSearch" : {
        'url' : "/users/search",
        'method' : "GET"
    }
}
export const productEnd = {
    "allProduct" : {
        "url" : '/product',
        'method' : 'GET'
    },
    "adminAllProduct" : {
        "url" : '/admin/products',
        'method' : 'GET'
    },
    "addProduct" : {
        "url" : '/product',
        'method' : "POST"
    },
    "singleProduct" : {
        "url" : '/product/:id',
        "method" : 'GET'
    },
    "searchProduct" : {
        "url" : '/search',
        "method": 'GET'
    },
    "updateProduct" : {
        "url" : '/product/:id',
        "method" : "PUT"
    },
    "deleteProduct" : {
        "url" : "/product/:id",
        "method" : "DELETE"
    },
}
export const category = {
    "categoryList" : {
        "url" : "/categories",
        "method" : "GET"
    },
    "subCategoryItem" : {
        "url" : "/categories/:category",
        "method" : "GET"
    }
}
export const cartEnd = {
    'addCart' : {
        "url" : '/cart/add',
        "method" : 'POST'
    },
    'viewCart' : {
        "url" : '/cart',
        "method" : 'GET'
    },
    'deleteCart' : {
       "url" : '/cart/remove',
       "method" : 'POST'
    },
    'updateCart' : {
        "url" : '/cart/updateCart',
        "method" : "PUT"
    },
    'itemCount' : {
        "url" : '/cart/item-count',
        'method' : 'GET'
    }
}
export const orderEnd = {
    'placeOrder' : {
        "url" : '/order',
        "method": 'POST'
    },
    'viewOrder' : {
        "url" : '/orders',
        "method" : "GET"
    },
    'updateOrderStatus' : {
        "url" : '/order/:id',
        "method" : "PUT"
    },
    "cancelOrder" : {
        "url" : '/order/:id/cancel',
        "method" : 'POST'
    },
    "adminOrder" : {
        "url" : '/admin/orders',
        "method" : 'GET'
    }
}