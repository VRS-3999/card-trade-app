import * as React from "react";
import { Layout } from "antd";
import CarContainer from "../carStatus/carStatus";
import CartContainer from "../cartStatus/cartStatus";
import "./Layout.less";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const { Footer } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout className="body">
      <Router>
        <Switch>
          <Route exact path="/" component={CarContainer}/>
          <Route exact path="/cart" component={CartContainer}/>
        </Switch>
        <Footer className="footer">
        <small>
          <div>Studio Sleevesup Assignment</div>
          <div><small>04-MAY-2022</small></div>
          </small>
        </Footer>
      </Router>
    </Layout>
  );
};

export default AppLayout;
