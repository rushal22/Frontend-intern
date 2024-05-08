import axios from 'axios'

function baseApi ({apiDetails, path = {}, query = {}, body={} , headers={}}){
    try{
        Object.entries(path).map(data => {
            console.log(data);
            apiDetails.url= (apiDetails.url).replace(`:${data[0]}`, data[1]);
        })
        const instance = axios.create({
            baseURL: "http://127.0.0.1:8000/api/",
            timeout: 5000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          
              ...headers
          }
          });
          instance.interceptors.request.use(request => {
            const accessToken = localStorage.getItem('Bearer');
            if(accessToken){
                request.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return request
          }, error => {
            return Promise.reject(error)
          }
        )
        
        instance.interceptors.response.use(
            response => {
            const token = response.data.access_token;
            localStorage.setItem('Bearer' , token);
            return response;
        },
            async error => {
              return Promise.reject(error)
            }
          );
          const res = instance({
              url: apiDetails.url,
              method: apiDetails.method,
              data: body,
              params:query
            })
            return res
        } catch (err) {
          throw err;
        }
      }

    export default baseApi
