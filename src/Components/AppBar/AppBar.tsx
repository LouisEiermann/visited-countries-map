import React, { useContext } from "react";
import { Wrapper, Header } from "./style";
import Heading from "../Heading/Heading";
import { ThemeContext } from "../../contexts/themeContext";
import HowToUse from "../HowToUse/HowToUse";
import Button from "../Button/Button";
import { MoonOutline } from "@styled-icons/evaicons-outline/MoonOutline";
import { Sun } from "@styled-icons/boxicons-regular/Sun";
import styles from "./style.module.css";

const appTitle: string = "Visited Countries Map";

const AppBar = () => {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);

  const logout = () => {
    window.location.href = "/logout";
  };

  let buttonText, buttonIcon;

  switch (isDarkTheme) {
    case true:
      buttonText = "Light Mode";
      buttonIcon = Sun;
      break;
    case false:
      buttonText = "Dark Mode";
      buttonIcon = MoonOutline;
      break;
  }

  return (
    <Wrapper>
      <Header>
        <HowToUse title={appTitle} />
        <Heading title={appTitle} />
        <button name="mode" onClick={logout} className={styles.button}>
          Logout
        </button>
        <Button
          name="mode"
          icon={buttonIcon}
          padding="5px 10px"
          onClick={toggleTheme}
          posAbsolute={true}
        >
          {buttonText}
        </Button>
      </Header>
    </Wrapper>
  );
};

export default AppBar;
