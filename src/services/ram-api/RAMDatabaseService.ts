import axios from "axios";
import { RAMLocation, RAMResident, RAMResponse } from "./ram-types";

const baseUrl = "https://rickandmortyapi.com/api";

export const fetchLocations = async (
  page?: number
): Promise<RAMResponse<RAMLocation> | undefined> => {
  try {
    const response = await axios.get(baseUrl + "/location", {
      params: { page: page },
    });
    if (response.status === 200) {
      const data = response.data as RAMResponse<RAMLocation>;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

export const fetchResidents = async (
  page?: number
): Promise<RAMResponse<RAMResident> | undefined> => {
  try {
    const response = await axios.get(baseUrl + "/character", {
      params: { page: page },
    });
    if (response.status === 200) {
      const data = response.data as RAMResponse<RAMResident>;
      return data;
    }
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

export const searchLocations = async (
  query: string
): Promise<RAMLocation[]> => {
  try {
    const response = await axios.get(baseUrl + "/location", {
      params: { name: query },
    });
    if (response.status === 200) {
      const data = response.data.results as RAMLocation[];
      return data;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const fetchResidentsFromURLs = async (
  residentURLs: string[]
): Promise<RAMResident[]> => {
  try {
    // I'm kind of tempted to parse ids from urls and get the characters with a single API call instead of this...
    const responses = await Promise.all(
      residentURLs.map((url) => axios.get(url))
    );

    const results = responses
      .filter((response) => response.status === 200)
      .map((response) => response.data as RAMResident);

    return results;
  } catch (error) {
    console.error(error);
  }
  return [];
};
