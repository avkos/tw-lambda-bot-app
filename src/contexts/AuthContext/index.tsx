import React, {useContext} from 'react';
import Auth from '../../utils/amplify';

export const authContextInitialValue = {
    userToken: '',
    user: {},
    isAuthenticated: false,
    pending: true,
    pendingUser: true,
    setContext: () => {
    },
    signIn: () => {
    },
    signOut: () => {
    },
};

const AuthContext = React.createContext<any>(authContextInitialValue);

export function useAuth() {
    return useContext(AuthContext);
}

export class AuthContextProvider extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.state = {
            ...authContextInitialValue,
            setContext: (data: any) => {
                this.setState({...this.state, ...data});
            },
            signIn: this.signIn,
            signOut: this.signOut,
        };
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then(async () => {
                const user = await Auth.currentAuthenticatedUser();
                this.setState({
                    isAuthenticated: true,
                    pending: false,
                    user: user.attributes,
                    accessToken: user.getSignInUserSession().getAccessToken()
                });
            })
            .catch(() => {
                this.setState({isAuthenticated: false, pending: false});
            });
    }

    signIn = async (login: string, password: string) => {
        return Auth.signIn(login, password).then((res) => {
            const {
                attributes,
                signInUserSession: {accessToken},
            } = res;
            this.setState({isAuthenticated: true, accessToken, user: attributes});
        });
    };

    signOut = () => {
        Auth.signOut()
            .then(() => {
                this.setState({isAuthenticated: false, user: {}});
            })
            .catch(console.error);
    };

    render() {
        return (
            <AuthContext.Provider value={this.state}>{this.props.children}</AuthContext.Provider>
        )
    }
}
