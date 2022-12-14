import AppRouter from "components/Router";
import {useEffect,useState} from 'react';
import {authService} from 'fbase';

function App() {
  const [init,setInit] = useState(false);
  // const [isLoggedIn,setIsLoggedIn] =useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        // setIsLoggedIn(user);
        setUserObj({
          uid : user.uid,
          displayName : user.displayName,
          updateProfile:(args) => user.updateProfile(args),
        });
      } else {
        // setIsLoggedIn(false);
        setUserObj(false);
      } setInit(true);
    });
  },[]);

  // setInterval(()=> console.log(authService.currentUser),2000);
  const refreshUser =() => {
    const user = authService.currentUser;
    setUserObj({
      uid:user.uid,
      displayName:user.displayName,
      updateProfile:(args) => user.updateProfile(args),
    });
  }

  return   (  
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()}Twitter</footer> */}
    </>
  );
  
}

export default App;
