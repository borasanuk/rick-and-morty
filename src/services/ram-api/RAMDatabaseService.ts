import axios from "axios";
import { RAMLocation, RAMResponse } from "./ram-types";

const baseUrl = "https://rickandmortyapi.com/api";

export const fetchLocations = async (page?: number): Promise<RAMLocation[]> => {
  try {
    const response = await axios.get(baseUrl + "/location");
    if (response.status === 200) {
      const data = response.data as RAMResponse<RAMLocation>;
      return data.results;
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};
