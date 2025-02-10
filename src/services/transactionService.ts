import { selectedFilters } from "@/models/transactions";
import axios from "axios";

const buildTransactionService = () => {
  const url = "/api/transactions";

  const getTransactions = async (filters: selectedFilters) => {
    try {
      const response = await axios.get(url, { params: filters });
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  const getProperties = async () => {
    try {
      const response = await axios.get(`${url}/properties`);
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
  };

  return {
    getTransactions,
    getProperties,
  };
};

export default buildTransactionService;
