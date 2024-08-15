import React from "react";
import {
  CandidateCard,
  ItemCard,
  ResultsCard,
} from "../components/CardComponents";
import { Grid, Tab, Tabs, Box, Typography, Chip } from "@mui/material";
import * as helper from "../utils/helper";
import { useParams } from "react-router-dom";
import data from "../results.json";

const SectorsPage = (props) => {
  const { id } = useParams();
  let name;
  let category;
  const fullPath = window.location.pathname;
  const pathSegments = fullPath.split("/");
  const categoryPath = pathSegments[1];

  let results = helper.getAllResults();

  switch (categoryPath) {
    case "cities":
      name = data.cities.find((city) => city.id == id).name;
      category = "perCity";
      break;
    case "province":
      name = data.provinces.find((city) => city.id == id).name;
      category = "perProvince";
      break;
    case "region":
      name = data.regions.find((city) => city.id == id).name;
      category = "perRegion";
      break;
    default:
      break;
  }

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
          {name}
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
            {results.President[category][name].map((item) => {
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
            {results["Vice President"][category][name].map((item) => {
              return <CandidateCard {...item} />;
            })}
          </ResultsCard>
        </Grid>
      </Grid>
    </>
  );
};

export default SectorsPage;
