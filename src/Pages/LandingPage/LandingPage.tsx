import SignIn from "./SignIn";
import SignUp from "./SignUp";

const landingPage = () => {
  return (
    <section className="landing-page">
      <SignIn />
      <SignUp />
    </section>
  );
};

export default landingPage;
