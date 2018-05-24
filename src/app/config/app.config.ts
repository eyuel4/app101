import { IAppConfig } from './iapp.config';

export const AppConfig: IAppConfig = {
    routes: {
        home: 'home',
        signup: 'signup',
        login: 'login',
        movies: 'movies',
        confirm: 'confirm'
    },
    router_endpoints: {


    },
    api_endpoints: {
        confirm_account: '/ibex/api/registeration/confirm',
        oauth_token: '/oauth/token'
    },
    server_type: {
        resource_server: 'resource',
        authorization_server: 'authorization'
    },
    api_server_path: {
         baseApi_AuthServer: 'http://localhost:8081/ibextubeapp/oauth-server',
         baseApiPathResourceServer: 'http://localhost:8082/ibexapp/oauth-resource',
         baseApiPathUIServer: 'http://localhost:4200'
    }
}