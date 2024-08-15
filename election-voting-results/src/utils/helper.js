import results from "../results.json";

const getAllResults = () => {
  // Create mappings for cities, provinces, regions, and major islands
  const cityMap = {};
  const provinceMap = {};
  const regionMap = {};
  const islandMap = {};

  // Populate the mappings
  results.cities.forEach((city) => {
    cityMap[city.id] = {
      name: city.name,
      province_id: city.province_id,
      region_id: city.region_id,
      major_island_id: city.major_island_id,
    };
  });

  results.provinces.forEach((province) => {
    provinceMap[province.id] = {
      name: province.name,
      region_id: province.region_id,
      major_island_id: province.major_island_id,
    };
  });

  results.regions.forEach((region) => {
    regionMap[region.id] = {
      name: region.name,
      major_island_id: region.major_island_id,
    };
  });

  results.major_islands.forEach((island) => {
    islandMap[island.id] = island.name;
  });

  // Debugging logs for mappings
  console.log("City Map:", cityMap);
  console.log("Province Map:", provinceMap);
  console.log("Region Map:", regionMap);
  console.log("Island Map:", islandMap);

  // To store results by position
  const resultsByPosition = {};

  // Initialize positions
  const positions = {
    1: "President",
    2: "Vice President",
  };

  // Process the election results
  results.election_results.forEach((cityResult) => {
    console.log("Processing cityResult:", cityResult);

    const city = cityMap[cityResult.city_id];
    const province = provinceMap[cityResult.province_id];
    const region = regionMap[cityResult.region_id];
    const island = islandMap[cityResult.major_island_id];

    console.log("City:", city);
    console.log("Province:", province);
    console.log("Region:", region);
    console.log("Island:", island);

    cityResult.results.forEach((result) => {
      const position = positions[result.position_id];
      const candidate = result.candidate;
      const votes = result.votes;

      if (!resultsByPosition[position]) {
        resultsByPosition[position] = {
          totalVotes: {},
          perCity: {},
          perRegion: {},
          perIsland: {},
          perProvince: {},
        };
      }

      // Update total votes per candidate globally
      if (!resultsByPosition[position].totalVotes[candidate]) {
        resultsByPosition[position].totalVotes[candidate] = {
          candidate,
          votes: 0,
        };
      }
      resultsByPosition[position].totalVotes[candidate].votes += votes;

      // Initialize per-city results
      if (city) {
        if (!resultsByPosition[position].perCity[city.name]) {
          resultsByPosition[position].perCity[city.name] = [];
        }

        // Update total votes per candidate per city
        const cityEntry = resultsByPosition[position].perCity[city.name];
        const cityCandidateEntry = cityEntry.find(
          (entry) => entry.candidate === candidate
        );
        if (!cityCandidateEntry) {
          cityEntry.push({ candidate, votes });
        } else {
          cityCandidateEntry.votes += votes;
        }
      } else {
        console.error(`City with ID ${cityResult.city_id} not found.`);
      }

      // Initialize per-province results
      if (province) {
        if (!resultsByPosition[position].perProvince[province.name]) {
          resultsByPosition[position].perProvince[province.name] = [];
        }

        // Update total votes per candidate per province
        const provinceEntry =
          resultsByPosition[position].perProvince[province.name];
        const provinceCandidateEntry = provinceEntry.find(
          (entry) => entry.candidate === candidate
        );
        if (!provinceCandidateEntry) {
          provinceEntry.push({ candidate, votes });
        } else {
          provinceCandidateEntry.votes += votes;
        }
      } else {
        console.error(`Province with ID ${cityResult.province_id} not found.`);
      }

      // Initialize per-region results
      if (region) {
        if (!resultsByPosition[position].perRegion[region.name]) {
          resultsByPosition[position].perRegion[region.name] = [];
        }

        // Update total votes per candidate per region
        const regionEntry = resultsByPosition[position].perRegion[region.name];
        const regionCandidateEntry = regionEntry.find(
          (entry) => entry.candidate === candidate
        );
        if (!regionCandidateEntry) {
          regionEntry.push({ candidate, votes });
        } else {
          regionCandidateEntry.votes += votes;
        }
      } else {
        console.error(`Region with ID ${cityResult.region_id} not found.`);
      }

      // Initialize per-island results
      if (island) {
        if (!resultsByPosition[position].perIsland[island]) {
          resultsByPosition[position].perIsland[island] = [];
        }

        // Update total votes per candidate per major island
        const islandEntry = resultsByPosition[position].perIsland[island];
        const islandCandidateEntry = islandEntry.find(
          (entry) => entry.candidate === candidate
        );
        if (!islandCandidateEntry) {
          islandEntry.push({ candidate, votes });
        } else {
          islandCandidateEntry.votes += votes;
        }
      } else {
        console.error(
          `Island with ID ${cityResult.major_island_id} not found.`
        );
      }
    });
  });

  // Sort the results in descending order of votes and add rankings
  for (const position in resultsByPosition) {
    // Sort and rank total votes per candidate
    const totalVotes = Object.values(resultsByPosition[position].totalVotes);
    totalVotes.sort((a, b) => b.votes - a.votes);
    totalVotes.forEach((entry, index) => {
      entry.ranking = formatOrdinalNumber(index + 1);
    });
    resultsByPosition[position].totalVotes = totalVotes;

    // Sort and rank votes per city
    for (const city in resultsByPosition[position].perCity) {
      resultsByPosition[position].perCity[city].sort(
        (a, b) => b.votes - a.votes
      );
      resultsByPosition[position].perCity[city].forEach((entry, index) => {
        entry.ranking = formatOrdinalNumber(index + 1);
      });
    }

    // Sort and rank votes per province
    for (const province in resultsByPosition[position].perProvince) {
      resultsByPosition[position].perProvince[province].sort(
        (a, b) => b.votes - a.votes
      );
      resultsByPosition[position].perProvince[province].forEach(
        (entry, index) => {
          entry.ranking = formatOrdinalNumber(index + 1);
        }
      );
    }

    // Sort and rank votes per region
    for (const region in resultsByPosition[position].perRegion) {
      resultsByPosition[position].perRegion[region].sort(
        (a, b) => b.votes - a.votes
      );
      resultsByPosition[position].perRegion[region].forEach((entry, index) => {
        entry.ranking = formatOrdinalNumber(index + 1);
      });
    }

    // Sort and rank votes per major island
    for (const island in resultsByPosition[position].perIsland) {
      resultsByPosition[position].perIsland[island].sort(
        (a, b) => b.votes - a.votes
      );
      resultsByPosition[position].perIsland[island].forEach((entry, index) => {
        entry.ranking = formatOrdinalNumber(index + 1);
      });
    }
  }

  // Function to format ordinal numbers
  function formatOrdinalNumber(n) {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  }

  console.log("Results by Position:", resultsByPosition);

  return resultsByPosition;
};

const getAllResultsByCity = () => {
  const allResults = getAllResults();

  return allResults;
};

const formatOrdinalNumber = (n) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export { getAllResults, formatOrdinalNumber, getAllResultsByCity };
