import { BrowserRouter, Route } from "react-router-dom";
import Main from "../../src/screens/main";
const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Main />
      </Route>
    </BrowserRouter>
  );
};

export default Router;
