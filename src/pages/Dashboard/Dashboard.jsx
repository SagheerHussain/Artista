import * as React from "react";
import logoSrc from "/Images/logo.png"
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
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
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import AddUserForm from "../../components/Add forms/AddUserForm";
import AddSalesForm from "../../components/Add forms/AddSalesForm";
import ExpenseForm from "../../components/Add forms/ExpenseForm";
import { JoinFullSharp } from "@mui/icons-material";
import UsersTable from "../../pages/users/UsersTable";
import SalesTable from "../../pages/sales/SalesTable";
import ExpenseTable from "../../pages/expenses/ExpenseTable";
import SalariesTable from "../../pages/salaries/SalariesTable";
import AddSalaryForm from "../../components/Add forms/AddSalaryForm";
import {
  getRevenue,
  getTotalExpance,
  getTotalRecievedAmount,
  getPendingAmount,
  getClients,
} from "../../../services/analyticsService";

const NAVIGATION = [
  { kind: "header", title: "Main" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },

  // { segment: "users", title: "Users", icon: <PeopleAltIcon /> },

  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      { segment: "sales", title: "Sales", icon: <DescriptionIcon /> },
      // { segment: "expenses", title: "Expenses", icon: <MonetizationOnIcon /> },
      // { segment: "salaries", title: "Salaries", icon: <PaymentsIcon /> },
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
  // Get Token From Storage
  const token = JSON.parse(localStorage.getItem("token"));

  // State Variabels
  const [exchangeRates, setExchangeRates] = useState({
    PKR: null,
    EUR: null,
    GBP: null,
    USD: null,
    AED: null,
  });
  const [totalRevenue, setTotalRevenue] = useState(1);
  const [totalExpance, setTotalExpance] = useState(0);
  const [totalRecievedAmount, setTotalRecievedAmount] = useState(1);
  const [pendingAmount, setPendingAmount] = useState(1);
  const [clients, setClients] = useState(1);

  // useEffect(() => {
  //   const fetchDollarRate = async () => {
  //     try {
  //       const response =
  //         await fetch();
  //         // "https://v6.exchangerate-api.com/v6/9f8daea350a3e0335db1697e/latest/PKR"
  //       const data = await response.json();

  //       const usdToPkr = 1 / data.conversion_rates.USD;
  //       const eurToPkr = 1 / data.conversion_rates.EUR;
  //       const gbpToPkr = 1 / data.conversion_rates.GBP;
  //       const aedToPkr = 1 / data.conversion_rates.AED;

  //       console.log("Live Exchange Rates:", {
  //         usdToPkr,
  //         eurToPkr,
  //         gbpToPkr,
  //         aedToPkr,
  //       });

  //       setExchangeRates({
  //         PKR: usdToPkr.toFixed(2),
  //         EUR: eurToPkr.toFixed(2),
  //         GBP: gbpToPkr.toFixed(2),
  //         USD: usdToPkr.toFixed(2),
  //         AED: aedToPkr.toFixed(2),
  //       });
  //     } catch (error) {
  //       console.error("Error fetching exchange rates:", error);
  //     }
  //   };

  //   fetchDollarRate();
  // }, []);

  const router = useDemoRouter("/dashboard");
  const [selectedPage, setSelectedPage] = React.useState("dashboard");

  React.useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    console.log("Selected Page:", selectedPage);
  }, [selectedPage]);

  // Analytics
  const fetchAnalytics = async () => {
    try {
      const revenue = await getRevenue(token);
      const recievedAmount = await getTotalRecievedAmount(token);
      const pendingAmount = await getPendingAmount(token);
      const clients = await getClients(token);
      // const expance = await getTotalExpance(token);
      setTotalRevenue(revenue.totalAmount);
      setTotalRecievedAmount(recievedAmount.totalReceivedAmount);
      setPendingAmount(pendingAmount.totalAmount);
      setClients(clients.totalClients);
      // setTotalExpance(expance.totalAmount);
      console.log("analytics", revenue, recievedAmount, pendingAmount, clients);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppProvider
        branding={{
          logo: <img src={logoSrc} alt="Artista Digitals" />,
          homeUrl: "/",
        }}
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
              ) : selectedPage === "/reports/salaries" ? (
                <SalariesTable setSelectedPage={setSelectedPage} />
              ) : selectedPage === "/addSalary" ? (
                <AddSalaryForm setSelectedPage={setSelectedPage} />
              ) : (
                <>
                  {/* Dashboard Live Currency Exhange Rates Cards */}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <DashboardCard>
                      <IconButton color="secondary">
                        {/* https://nucleoapp.com/svg-flag-icons */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 32 32"
                        >
                          <rect
                            x="1"
                            y="4"
                            width="30"
                            height="24"
                            rx="4"
                            ry="4"
                            fill="#173e1b"
                          ></rect>
                          <path
                            d="M10,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4h5V4Z"
                            fill="#fff"
                          ></path>
                          <path
                            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                            opacity=".15"
                          ></path>
                          <path
                            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                            fill="#fff"
                            opacity=".2"
                          ></path>
                          <path
                            d="M26.268,19.09c-2.692,2.393-6.815,2.151-9.209-.542-2.393-2.692-2.151-6.815,.542-9.209,.113-.1,.229-.196,.346-.287-2.87,.917-4.948,3.605-4.948,6.779,0,3.93,3.186,7.116,7.116,7.116,2.878,0,5.357-1.709,6.478-4.168-.104,.106-.213,.21-.326,.311Z"
                            fill="#fff"
                          ></path>
                          <path
                            fill="#fff"
                            d="M22.984 13.282L23.153 14.997 24.024 13.51 25.708 13.879 24.563 12.591 25.434 11.104 23.855 11.795 22.71 10.507 22.88 12.222 21.301 12.913 22.984 13.282z"
                          ></path>
                        </svg>
                      </IconButton>
                      <CardContent>
                        <Typography variant="h6">USD to PKR</Typography>
                        <Typography variant="h5">
                          {exchangeRates.PKR
                            ? ` ${exchangeRates.PKR}`
                            : "Loading..."}
                        </Typography>
                      </CardContent>
                    </DashboardCard>

                    <DashboardCard>
                      <IconButton color="secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 32 32"
                        >
                          <rect
                            x="1"
                            y="4"
                            width="30"
                            height="24"
                            rx="4"
                            ry="4"
                            fill="#112f95"
                          ></rect>
                          <path
                            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                            opacity=".15"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M16 8.167L15.745 8.951 14.921 8.951 15.588 9.435 15.333 10.219 16 9.735 16.667 10.219 16.412 9.435 17.079 8.951 16.255 8.951 16 8.167z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M16.255 22.565L16 21.781 15.745 22.565 14.921 22.565 15.588 23.049 15.333 23.833 16 23.349 16.667 23.833 16.412 23.049 17.079 22.565 16.255 22.565z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M9.193 16.542L9.86 17.026 9.605 16.242 10.272 15.758 9.448 15.758 9.193 14.974 8.938 15.758 8.114 15.758 8.781 16.242 8.526 17.026 9.193 16.542z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M12.596 9.079L12.342 9.863 11.517 9.863 12.184 10.347 11.93 11.131 12.596 10.647 13.263 11.131 13.009 10.347 13.675 9.863 12.851 9.863 12.596 9.079z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M10.105 11.57L9.85 12.354 9.026 12.354 9.693 12.839 9.438 13.623 10.105 13.138 10.772 13.623 10.517 12.839 11.184 12.354 10.36 12.354 10.105 11.57z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M10.36 19.161L10.105 18.377 9.85 19.161 9.026 19.161 9.693 19.646 9.438 20.43 10.105 19.945 10.772 20.43 10.517 19.646 11.184 19.161 10.36 19.161z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M12.851 21.653L12.596 20.869 12.342 21.653 11.517 21.653 12.184 22.137 11.93 22.921 12.596 22.437 13.263 22.921 13.009 22.137 13.675 21.653 12.851 21.653z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M23.886 15.758L23.062 15.758 22.807 14.974 22.552 15.758 21.728 15.758 22.395 16.242 22.14 17.026 22.807 16.542 23.474 17.026 23.219 16.242 23.886 15.758z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M19.404 9.079L19.149 9.863 18.325 9.863 18.991 10.347 18.737 11.131 19.404 10.647 20.07 11.131 19.816 10.347 20.483 9.863 19.658 9.863 19.404 9.079z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M21.483 12.839L21.228 13.623 21.895 13.138 22.562 13.623 22.307 12.839 22.974 12.354 22.15 12.354 21.895 11.57 21.64 12.354 20.816 12.354 21.483 12.839z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M22.15 19.161L21.895 18.377 21.64 19.161 20.816 19.161 21.483 19.646 21.228 20.43 21.895 19.945 22.562 20.43 22.307 19.646 22.974 19.161 22.15 19.161z"
                          ></path>
                          <path
                            fill="#f6cd46"
                            d="M19.658 21.653L19.404 20.869 19.149 21.653 18.325 21.653 18.991 22.137 18.737 22.921 19.404 22.437 20.07 22.921 19.816 22.137 20.483 21.653 19.658 21.653z"
                          ></path>
                          <path
                            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                            fill="#fff"
                            opacity=".2"
                          ></path>
                        </svg>
                      </IconButton>
                      <CardContent>
                        <Typography variant="h6">EUR to PKR</Typography>
                        <Typography variant="h5">
                          {exchangeRates.EUR
                            ? ` ${exchangeRates.EUR}`
                            : "Loading..."}
                        </Typography>
                      </CardContent>
                    </DashboardCard>

                    <DashboardCard>
                      <IconButton color="secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 32 32"
                        >
                          <rect
                            x="1"
                            y="4"
                            width="30"
                            height="24"
                            rx="4"
                            ry="4"
                            fill="#071b65"
                          ></rect>
                          <path
                            d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
                            fill="#fff"
                          ></path>
                          <path
                            d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z"
                            fill="#b92932"
                          ></path>
                          <path
                            d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
                            fill="#b92932"
                          ></path>
                          <path
                            d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
                            fill="#fff"
                          ></path>
                          <rect
                            x="13"
                            y="4"
                            width="6"
                            height="24"
                            fill="#fff"
                          ></rect>
                          <rect
                            x="1"
                            y="13"
                            width="30"
                            height="6"
                            fill="#fff"
                          ></rect>
                          <rect
                            x="14"
                            y="4"
                            width="4"
                            height="24"
                            fill="#b92932"
                          ></rect>
                          <rect
                            x="14"
                            y="1"
                            width="4"
                            height="30"
                            transform="translate(32) rotate(90)"
                            fill="#b92932"
                          ></rect>
                          <path
                            d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
                            fill="#b92932"
                          ></path>
                          <path
                            d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
                            fill="#b92932"
                          ></path>
                          <path
                            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                            opacity=".15"
                          ></path>
                          <path
                            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                            fill="#fff"
                            opacity=".2"
                          ></path>
                        </svg>
                      </IconButton>
                      <CardContent>
                        <Typography variant="h6">GBP to PKR</Typography>
                        <Typography variant="h5">
                          {exchangeRates.GBP
                            ? `${exchangeRates.GBP}`
                            : "Loading..."}
                        </Typography>
                      </CardContent>
                    </DashboardCard>

                    <DashboardCard>
                      <IconButton color="secondary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 32 32"
                        >
                          <path
                            d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
                            fill="#ea3323"
                          ></path>
                          <path d="M10,20v8H27c2.209,0,4-1.791,4-4v-4H10Z"></path>
                          <path fill="#fff" d="M10 11H31V21H10z"></path>
                          <path
                            d="M27,4H10V12H31v-4c0-2.209-1.791-4-4-4Z"
                            fill="#317234"
                          ></path>
                          <path
                            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                            opacity=".15"
                          ></path>
                          <path
                            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                            fill="#fff"
                            opacity=".2"
                          ></path>
                        </svg>
                      </IconButton>
                      <CardContent>
                        <Typography variant="h6">AED to PKR</Typography>
                        <Typography variant="h5">
                          {exchangeRates.AED
                            ? ` ${exchangeRates.AED}`
                            : "Loading..."}
                        </Typography>
                      </CardContent>
                    </DashboardCard>
                  </Grid>

                  {/* Total Amount Generated */}
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <DashboardCard>
                        <IconButton color="primary">
                          <MonetizationOnIcon fontSize="large" />
                        </IconButton>
                        <CardContent>
                          <Typography variant="h6">Total Revenue</Typography>
                          <Typography variant="h5">${totalRevenue}</Typography>
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
                          <Typography variant="h5">${totalExpance}</Typography>
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
                          <Typography variant="h5">${pendingAmount}</Typography>
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
                          <Typography variant="h5">
                            ${totalRecievedAmount}
                          </Typography>
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
                          <Typography variant="h5">{clients}</Typography>
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
