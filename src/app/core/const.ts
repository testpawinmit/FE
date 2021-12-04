import { environment } from '../../environments/environment'
export class Const {


}

export enum API_CONST {
    API_ROOT_URL = 'http://123.231.9.43:2008/hris/web',
    API_TEST_URL = 'http://localhost:3000',
    API_SECREAT = '@a34#AW',

    // constant for logi api // this will be dynamically generated related to the user
    APP_TYPE_CODE = 'APP-1',
    MACHINE = '192.168.1.1',

    // Refresh Access Token
    PATH_REFRESH_TOKEN = 'requestingAccessToken',

    //Login API
    PATH_LOGIN_API = 'authenticate',

    //Sapple API for testings   
    SAMPLE_API = 'https://reqres.in/api/users',

    //Get All Employees
    PATH_GET_ALL_EMPLOYEES = 'allEmployee',

    //Get All User Roles
    PATH_GET_ALL_USER_ROLES = 'allUserRole',

    //Get All users
    PATH_GET_ALL_USERS = 'allSystemUser',

    //Create new USer
    PATH_CREATE_NEW_USER = 'creatingSystemUser',

    //Inactivate a user
    PATH_INACTIVE_USER = 'inactivatingSystemUser',

    //Activate System User
    PATH_ACTIVE_USER = 'activatingSystemUser',

    // Request a new Password - forget Password
    PATH_FORGET_PASSWORD = 'handlingForgotPassword',

    //Update System User
    PATH_SYSUSER_UPDATE = 'updatingSystemUser',

    // Get a single system user by id
    PATH_GET_ONE_USER = 'singleSystemUser'


}
''
export enum GENERAL_CONSTS {

    APP_NAME = 'HRIS'

}