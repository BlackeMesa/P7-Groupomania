import React, { useRef, useState } from "react";
import { auth } from "../utils/firebase.config";

const SignUp = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();
  const [displayName, setDisplayName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    try {
      auth.createUserWithEmailAndPassword(registerEmail.current.value, registerPassword.current.value).then(async (userAuth) => {
        await userAuth.user.updateProfile({
          displayName,
        });

        window.location.reload();
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h3>S'inscrire</h3>
        <form onSubmit={(e) => handleRegister(e)}>
          <input type="text" placeholder="Pseudo" required aria-label="Pseudo" onChange={(e) => setDisplayName(e.target.value)} />
          <input type="email" placeholder="Email" required aria-label="Email" ref={registerEmail} />
          <input type="password" placeholder="Mot de passe" aria-label="Mot de Passe" ref={registerPassword} required />
          <input type="submit" value="Valider inscription" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
