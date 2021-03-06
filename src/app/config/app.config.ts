import { IAppConfig } from './iapp.config';

export const AppConfig: IAppConfig = {
    routes: {
        home: 'home',
        signup: 'signup',
        login: 'login',
        movies: 'movies',
        confirm: 'confirm',
        update_profile: 'profile',
        wildCard: '**'
    },
    navigation_endpoints: {
        home : '/home',
        logout : '/logout',
        login : '/login'
    },
    api_endpoints: {
        confirm_account: '/ibex/api/registeration/confirm',
        oauth_token: '/oauth/token',
        get_user_detail : '/ibex/api/user',
        reset_password: '/ibex/api/profile/edit/password/reset',
        update_password: '/ibex/api/profile/edit/password',
        recover_password: '/ibex/api/profile/edit/password/recover',
        activate_account: '/ibex/api/profile/activate'
    },
    server_type: {
        resource_server: 'resource',
        authorization_server: 'authorization'
    },
    api_server_path: {
         baseApi_AuthServer: 'http://localhost:8081/ibextubeapp/oauth-server',
         baseApiPathResourceServer: 'http://localhost:8082/ibexapp/oauth-resource',
         baseApiPathUIServer: 'http://localhost:4200'
    },
    oauth_info: {
        clientId: 'fooClientIdPassword',
        clientPassword: 'secret'
    },
    message_type : {
        message_info: 'info',
        message_error: 'error',
        message_success: 'success',
        message_warning: 'warning'
    }
}