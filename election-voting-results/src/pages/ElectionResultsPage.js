import React, { useEffect, useState } from "react";
import {
  CandidateCard,
  ItemCard,
  ResultsCard,
} from "../components/CardComponents";
import { Grid, Tab, Tabs, Box, Typography, Chip, Button } from "@mui/material";
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
  const [value, setValue] = useState(0);
  const [presidentHeader, setPresidentHeader] = useState("President");
  const [vpHeader, setVpHeader] = useState("Vice President");
  const [pageHeader, setPageHeader] = useState("ELECTION VOTING RESULTS 2022");
  const [tabTitles, setTabTitles] = useState([
    "Cities",
    "Provinces",
    "Regions",
  ]);
  const [resultsByPosition, setResultsByPosition] = useState(
    helper.getAllResults()
  );
  const [reversedResults, setReversedResults] = useState(results);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const reverseStringFromCenter = (str) => {
    const length = str.length;
    if (length <= 1) return str;

    const center = Math.floor(length / 2);
    const beforeCenter = str.substring(0, center);
    const afterCenter = str.substring(center);

    return (
      beforeCenter.split("").reverse().join("") +
      afterCenter.split("").reverse().join("")
    );
  };

  const reverseVoteString = (str) => {
    return str
      .split(",")
      .map((part) => part.split("").reverse().join(""))
      .reverse()
      .join(",");
  };

  const handleReverseClick = () => {
    // Reverse the resultsByPosition data
    const reversedResultsData = { ...resultsByPosition };
    Object.keys(reversedResultsData).forEach((position) => {
      reversedResultsData[position].totalVotes = reversedResultsData[
        position
      ].totalVotes.map((item) => ({
        ...item,
        candidate: reverseStringFromCenter(item.candidate),
        votes: reverseVoteString(item.votes.toString()),
      }));
    });

    // Reverse headers, tab titles, and chips labels
    setResultsByPosition(reversedResultsData);
    setPresidentHeader(reverseStringFromCenter(presidentHeader));
    setVpHeader(reverseStringFromCenter(vpHeader));
    setPageHeader(reverseStringFromCenter(pageHeader));
    setTabTitles(tabTitles.map((title) => reverseStringFromCenter(title)));

    // Reverse the labels of cities, provinces, and regions
    const reversedResultsCopy = {
      cities: reversedResults.cities.map((item) => ({
        ...item,
        name: reverseStringFromCenter(item.name),
      })),
      provinces: reversedResults.provinces.map((item) => ({
        ...item,
        name: reverseStringFromCenter(item.name),
      })),
      regions: reversedResults.regions.map((item) => ({
        ...item,
        name: reverseStringFromCenter(item.name),
      })),
    };

    setReversedResults(reversedResultsCopy);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          right: "2%",
          top: "2%",
          borderRadius: "20px",
          backgroundColor: "#fff",
          color: "#1f3476",
          textTransform: "uppercase",
        }}
        onClick={handleReverseClick}
      >
        <b>Reverse</b>
      </Button>
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
          {pageHeader}
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
          <ResultsCard title={presidentHeader}>
            {resultsByPosition?.President?.totalVotes?.map((item, index) => {
              return <CandidateCard key={index} {...item} />;
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
          <ResultsCard title={vpHeader}>
            {resultsByPosition["Vice President"]?.totalVotes?.map(
              (item, index) => {
                return <CandidateCard key={index} {...item} />;
              }
            )}
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
            {tabTitles.map((title, index) => (
              <Tab
                key={index}
                label={title}
                style={{
                  fontFamily: "Segoe UI",
                  fontSize: "30px",
                  color: "#000",
                  fontWeight: "bold",
                }}
              />
            ))}
            {/* <Tab
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
            /> */}
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
            {reversedResults.cities.map((item, index) => {
              return (
                <Chip
                  key={index}
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
            {reversedResults.provinces.map((item, index) => {
              return (
                <Chip
                  key={index}
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
            {reversedResults.regions.map((item, index) => {
              return (
                <Chip
                  key={index}
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
