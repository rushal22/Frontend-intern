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
    }
}
export const productEnd = {
    "allProduct" : {
        "url" : '/product',
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
    }
}