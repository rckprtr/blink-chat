import axios from "axios";

const SNS_BASE_URL = "https://sns-api.bonfida.com/";

export type SNSDomainResult = {
  [key: string]: string[];
};

export type SNSFavDomainResult = {
  [key: string]: string;
};

export async function getDomains(
  addresses: string[],
): Promise<SNSDomainResult> {
  const USER_DOMAINS = "v2/user/domains/";

  try {
    const response = await axios.get(
      `${SNS_BASE_URL}${USER_DOMAINS}${addresses.join(",")}`,
    );
    return response.data as SNSDomainResult;
  } catch (error) {
    console.error("Error fetching domains:", error);
    throw error;
  }
}

export async function getFavDomain(
  addresses: string[],
): Promise<SNSFavDomainResult> {
  const USER_DOMAINS = "v2/user/fav-domains/";

  try {
    const response = await axios.get(
      `${SNS_BASE_URL}${USER_DOMAINS}${addresses.join(",")}`,
    );
    return response.data as SNSFavDomainResult;
  } catch (error) {
    console.error("Error fetching domains:", error);
    throw error;
  }
}

export async function getAddressDomain(
  address: string,
): Promise<string | null> {
  let favDomain = await getFavDomain([address]);

  if (favDomain[address]) {
    return favDomain[address] + ".sol";
  }

  let domains = await getDomains([address]);
  if(domains[address] && domains[address].length > 0){
    return domains[address][0] + ".sol";
  }

  return null;
}
