import * as React from "react";
import { useEffect } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import UsersTable from "../components/UsersTable";
import SalesTable from "../components/SalesTable";
import ExpenseTable from "../components/ExpenseTable";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import AddUserForm from "../components/AddUserForm";
import AddSalesForm from "../components/AddSalesForm";
import ExpenseForm from "../components/ExpenseForm";

const NAVIGATION = [
  { kind: "header", title: "Main" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },

  { segment: "users", title: "Users", icon: <PeopleAltIcon /> },

  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      { segment: "sales", title: "Sales", icon: <DescriptionIcon /> },
      { segment: "expenses", title: "Expenses", icon: <MonetizationOnIcon /> },
    ],
  },
  // { segment: "integrations", title: "Integrations", icon: <LayersIcon /> },
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1E1E1E" },
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    text: { primary: "#ffffff", secondary: "#b0bec5" },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
}

const DashboardCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
  },
}));

export default function Dashboard() {
  const router = useDemoRouter("/dashboard");
  const [selectedPage, setSelectedPage] = React.useState("dashboard");

  React.useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    console.log("Selected Page:", selectedPage);
  }, [selectedPage]);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppProvider
        navigation={NAVIGATION}
        router={{
          ...router,
          navigate: (path) => {
            setSelectedPage(path);
            router.navigate(path);
          },
        }}
      >
        {" "}
        <DashboardLayout>
          <PageContainer>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {selectedPage === "/users" ? (
                <UsersTable setSelectedPage={setSelectedPage} />
              ) : selectedPage === "/reports/sales" ? (
                <SalesTable setSelectedPage={setSelectedPage} />
              ) : selectedPage === "/reports/expenses" ? (
                <ExpenseTable setSelectedPage={setSelectedPage} />
              ) : selectedPage === "/addUser" ? (
                <AddUserForm setSelectedPage={setSelectedPage} />
              ) : selectedPage === "/addSales" ? (
                <AddSalesForm setSelectedPage={setSelectedPage} />
              ) : selectedPage === "/addExpense" ? (
                <ExpenseForm setSelectedPage={setSelectedPage} />
              ) : (
                <>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <DashboardCard>
                        <IconButton color="primary">
                          <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <CardContent>
                          <Typography variant="h6">Total Revenue</Typography>
                          <Typography variant="h5">$24,580</Typography>
                        </CardContent>
                      </DashboardCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DashboardCard>
                        <IconButton color="secondary">
                          <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <CardContent>
                          <Typography variant="h6">Total Expense</Typography>
                          <Typography variant="h5">$6,580</Typography>
                        </CardContent>
                      </DashboardCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DashboardCard>
                        <IconButton color="primary">
                          <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <CardContent>
                          <Typography variant="h6">Pending Amount</Typography>
                          <Typography variant="h5">$4,230</Typography>
                        </CardContent>
                      </DashboardCard>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <DashboardCard>
                        <IconButton color="secondary">
                          <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontSize: "18px" }}>
                            Received Amount
                          </Typography>
                          <Typography variant="h5">$10,110</Typography>
                        </CardContent>
                      </DashboardCard>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <DashboardCard>
                        <IconButton color="secondary">
                          <PeopleAltIcon fontSize="large" />
                        </IconButton>
                        <CardContent>
                          <Typography variant="h6">Total Clients</Typography>
                          <Typography variant="h5">14</Typography>
                        </CardContent>
                      </DashboardCard>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
