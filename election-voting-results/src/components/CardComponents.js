import { Box, Typography, Divider } from "@mui/material";

const CandidateCard = (props) => {
  console.log(props);
  return (
    <Box
      style={{
        display: "flex",
        backgroundColor: "#f1f1f1",
        height: "100px",
        margin: "20px 0px",
        padding: "10px",
        borderRadius: "25px",
      }}
    >
      <Typography m={2} variant="h6" component="h6">
        {props.ranking}
      </Typography>
      <Divider
        style={{ borderWidth: 1 }}
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Box display={"block"} m={2}>
        <Typography variant="h4" component="h4">
          {props.candidate}
        </Typography>
        <Typography variant="h5" component="h5">
          {props.votes}
        </Typography>
      </Box>
    </Box>
  );
};
const ResultsCard = ({ title, children }) => {
  return (
    <Box
      style={{
        width: "600px",
        margin: "0 !important",
        padding: "0px",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        style={{
          backgroundColor: "#1f3476",
          color: "#fff",
          height: "40px",
          margin: "0px",
          padding: "10px",
        }}
      >
        <h2
          style={{
            padding: "0px",
            margin: "0px",
          }}
        >
          {title}
        </h2>
      </Box>
      {children}
    </Box>
  );
};

export { CandidateCard, ResultsCard };
