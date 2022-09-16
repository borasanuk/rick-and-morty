import axios from "axios";
import { RAMLocation, RAMResponse } from "./ram-types";

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
