import React from "react";
import {
  CandidateCard,
  ItemCard,
  ResultsCard,
} from "../components/CardComponents";
import { Grid, Tab, Tabs, Box, Typography, Chip } from "@mui/material";
import results from "../results.json";

const SectorsPage = (props) => {
  return (
    <>
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
            {props.Presidential.totalVotes.map((item) => {
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
            {props["Vice President"].totalVotes.map((item) => {
              return <CandidateCard {...item} />;
            })}
          </ResultsCard>
        </Grid>
      </Grid>
    </>
  );
};

export default SectorsPage;
