import React, { useState, useEffect } from "react";
import { Container, Text, Button, Tab } from "../../styled";
import { getUser } from "../../utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import history from "../../utils/createHistory";
import IconButtons from "../materialui/IconButtons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signOut } from "../../redux/actions/user";
import WelcomeName from "../pages/profile";
import Logo from "../../assets/images/logo.png";

const Header = (props) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.user);
  const check =
    history.location.pathname === "/host" ||
    history.location.pathname === "/exam";
  useEffect(() => {
    if (getUser()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <Container
      direction="row"
      align="center"
      width="100%"
      justify="space-between"
      background="#47926E"
      height="50px"
    >
      <Container
        width="none"
        flex="0.1"
        direction="row"
        align="center"
        padding="10px"
      >
        <img width="40px" src={Logo} alt="Oexamination" />
        <Text
          family="Purisa"
          size="25px"
          weight="bold"
          color="#F3EA16"
          margin="0 0 0 1vw"
          lineHeight="0px"
        >
          PROCTO
        </Text>
      </Container>
      <Container
        direction="row"
        justify="center"
        align="flex-end"
        height="50px"
        flex="0.8"
      >
        {isLogin && check && (
          <>
            <Tab
              active={history.location.pathname === "/host"}
              onClick={() => history.push("/host")}
            >
              Host
            </Tab>

            <Tab
              active={history.location.pathname === "/exam"}
              onClick={() => history.push("/exam")}
            >
              Exam
            </Tab>
          </>
        )}
      </Container>
      <Container
        direction="row"
        justify="flex-end"
        align="center"
        flex="0.2"
        margin="0px 10px 0px 0px"
      >
        {isLogin ? (
          <>
            <WelcomeName />
            <IconButtons
              onClick={() => {
                dispatch(signOut());
              }}
              tooltipTitle="Log Out"
            >
              <ExitToAppIcon style={{ color: "#eb7d34" }} />
            </IconButtons>
          </>
        ) : (
          <>
            <Button
              height="35px"
              margin="0px 10px 0px 0px"
              width="90px"
              background={
                history.location.pathname === "/signup" ? "#D24C4C" : "#963B3B"
              }
              onClick={() => {
                history.push("/signin");
              }}
            >
              Sign In
            </Button>
            <Button
              height="35px"
              width="90px"
              background={
                history.location.pathname === "/signin" ? "#D24C4C" : "#963B3B"
              }
              onClick={() => {
                history.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </>
        )}
      </Container>
    </Container>
  );
};

export default Header;
