import Footer from './Footer';
import Header from './Header';
import Routes from '../routes/routes';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBloggerByAliasAsync } from '../features/user/bloggerSlice';
import { getUserByUsernameAsync } from '../features/user/userSlice';

function Layout() {
    const params = useParams();
    const alias = params.alias;
    const dispatch = useDispatch();
    const blogger = useSelector((state) => state.blogger);
    const user = useSelector((state) => state.user);
    const username = JSON.parse(localStorage.getItem('user'))?.account?.username;
    useEffect(() => {
        dispatch(getBloggerByAliasAsync(alias || user.alias));
        // if (account.alias === blogger.alias) {
        username && dispatch(getUserByUsernameAsync({ username: username }));
        //     user.account = userSelector;
        // 	console.log(user)
        // localStorage.setItem('user', JSON.stringify(user));
        // }
    }, [dispatch, alias, blogger.alias, username]);

    return (
        // <HashRouter>
        <div className="App">
            <Header blogger={blogger}></Header>
            <div className="container">
                <div className="main">
                    <Routes blogger={blogger} />
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
        // </HashRouter>
    );
}

export default Layout;
