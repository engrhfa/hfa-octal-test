import React from "react";
import {
  CandidateCard,
  ItemCard,
  ResultsCard,
} from "../components/CardComponents";
import { Grid, Tab, Tabs, Box, Typography, Chip } from "@mui/material";
import results from "../results.json";
import * as helper from "../utils/helper";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ElectionResultsPage() {
  const [value, setValue] = React.useState(0);
  let resultsByPosition = helper.getAllResults();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Grid
      container
      direction="row"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        minHeight: "20vh",
        padding: 2,
        pt: 2,
        backgroundColor: "#1f3476",
        color: "#fff",
      }}
    >
      <p
        style={{
          padding: "0px",
          margin: "0px",
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        ELECTION VOTING RESULTS 2022
      </p>
    </Grid>
      <Grid
        container
        direction="row"
        justifyContent={"center"}
        sx={{
          minHeight: "100vh",
          padding: 2,
          pt: 2,
        }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            margin: "0 !important",
          }}
        >
          <ResultsCard title={"President"}>
            {resultsByPosition.President.totalVotes.map((item) => {
              return <CandidateCard {...item} />;
            })}
          </ResultsCard>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <ResultsCard title={"Vice President"}>
            {resultsByPosition["Vice President"].totalVotes.map((item) => {
              return <CandidateCard {...item} />;
            })}
          </ResultsCard>
        </Grid>
      </Grid>
      <Grid>
        <Box
          m={10}
          sx={{ height: "300px", bgcolor: "#f1f1f1", borderRadius: "20px" }}
        >
          <Tabs
            variant="fullWidth"
            aria-label="full width tabs example"
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab
              label="Cities"
              style={{
                fontFamily: "Segoe UI",
                fontSize: "30px",
                color: "#000",
                fontWeight: "bold",
              }}
            />
            <Tab
              label="Provinces"
              style={{
                fontFamily: "Segoe UI",
                fontSize: "30px",
                color: "#000",
                fontWeight: "bold",
              }}
            />
            <Tab
              label="Regions"
              style={{
                fontFamily: "Segoe UI",
                fontSize: "30px",
                color: "#000",
                fontWeight: "bold",
              }}
            />
          </Tabs>
          <TabPanel
            id="cities"
            value={value}
            index={0}
            display={"flex"}
            style={{
              display: "flex !important",
              alignItems: "center !important",
              justifyContent: "center !important",
            }}
          >
            {results.cities.map((item) => {
              return (
                <Chip
                  label={item.name}
                  component="a"
                  href={`/cities/${item.id}`}
                  clickable
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "#2b3f7c",
                    letterSpacing: "2px",
                    height: "40px",
                    margin: "10px",
                    padding: "5px",
                    borderRadius: "40px",
                  }}
                />
              );
            })}
          </TabPanel>
          <TabPanel id="provinces" value={value} index={1}>
            {results.provinces.map((item) => {
              return (
                <Chip
                  label={item.name}
                  component="a"
                  href={`/province/${item.id}`}
                  clickable
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "#2b3f7c",
                    letterSpacing: "2px",
                    height: "40px",
                    margin: "10px",
                    padding: "5px",
                    borderRadius: "40px",
                  }}
                />
              );
            })}
          </TabPanel>
          <TabPanel id="regions" value={value} index={2}>
            {results.regions.map((item) => {
              return (
                <Chip
                  label={item.name}
                  component="a"
                  href={`/region/${item.id}`}
                  clickable
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "#2b3f7c",
                    letterSpacing: "2px",
                    height: "40px",
                    margin: "10px",
                    padding: "5px",
                    borderRadius: "40px",
                  }}
                />
              );
            })}
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
}

export default ElectionResultsPage;
