import React from "react";
import styles from "./styles/commonCss";
import AppLayout from "common/layout/Layout";
import "./App.less";

const App: React.FC = () => {
  return (
      <div style={styles.fitToScreen}>
        <AppLayout />
      </div>
  );
};

export default App;
