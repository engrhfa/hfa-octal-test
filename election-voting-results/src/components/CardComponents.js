import { Box, Typography, Divider, Link } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";

const CandidateCard = (props) => {
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
      <Typography m={2} fontWeight="bold" variant="h6" component="h6">
        {props.ranking}
      </Typography>
      <Divider
        style={{ borderWidth: 1 }}
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Box display={"block"} m={2}>
        <Typography fontWeight="bold" variant="h5" component="h5">
          {props.candidate}
        </Typography>
        <Typography variant="h6" component="h6">
          {`${props.votes.toLocaleString()} votes`}
        </Typography>
      </Box>
    </Box>
  );
};

const ItemCard = (props) => {
  return (
    <Box
      style={{
        display: "flex",
        backgroundColor: "#f1f1f1",
      }}
    >
      <Link href="#" 
      style={{
        fontSize:"20px",
        fontWeight: "bold",
        textTransform: "uppercase",
        textDecoration:"none",
        color: "#2b3f7c",
        letterSpacing: "2px"
      }}>
        {/* <LocationCityIcon /> */}
        {props.name}
      </Link>
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

export { CandidateCard, ResultsCard, ItemCard };
