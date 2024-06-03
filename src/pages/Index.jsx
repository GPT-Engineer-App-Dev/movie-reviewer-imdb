import { Container, Text, VStack, Heading, Box, Input, Button, Image, Spinner } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setMovieData(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${searchTerm}&apikey=YOUR_API_KEY`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovieData(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Movie Review Search</Heading>
        <Box width="100%">
          <Input
            placeholder="Enter movie title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button mt={2} colorScheme="teal" onClick={handleSearch} isFullWidth>
            Search
          </Button>
        </Box>
        {loading && <Spinner size="xl" />}
        {error && <Text color="red.500">{error}</Text>}
        {movieData && (
          <Box mt={4} textAlign="center">
            <Heading as="h2" size="lg">{movieData.Title}</Heading>
            <Text>{movieData.Year}</Text>
            <Image src={movieData.Poster} alt={`${movieData.Title} Poster`} mt={4} />
            <Text mt={4}>{movieData.Plot}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;