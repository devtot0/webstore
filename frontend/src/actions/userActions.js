import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        //content-type has to be specified
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        //getting data from userController passed as payload and saved in local storage
        const { data } = await axios.post('/api/users/login', { email, password }, config);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        //setting the user to local storage
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
};
