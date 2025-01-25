import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks.ts";
import { selectUser } from "../../../features/users/userSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";
import Container from "@mui/material/Container";

const Link = styled(NavLink)({
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "color 0.3s",
  "&:hover": {
    textDecoration: "underline",
  },
});

const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <StyledAppBar position="sticky" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">FLea market</Link>
          </Typography>
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default AppToolbar;
