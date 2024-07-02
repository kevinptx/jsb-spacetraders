import axios from 'axios';

export const TOKEN = process.env.SPACETRADERS_TOKEN;

const api = axios.create({
  baseURL: 'https://api.spacetraders.io/v2',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

export async function getAgent() {
  const response = await api.get('/my/agent');
  return response.data;
}

export async function getStartWaypoint() {
  const { data } = await getAgent();
  const hqWaypoint = data.headquarters;

  const [sector, system] = hqWaypoint.split('-');
  const systemSymbol = `${sector}-${system}`;

  const response = await getWaypoint(systemSymbol, hqWaypoint);
  return response.data;
}

export async function getWaypoint(systemSymbol, waypointSymbol) {
  const response = await api.get(
    `/systems/${systemSymbol}/waypoints/${waypointSymbol}`,
  );
  return response.data;
}

export async function register(callSign) {
  const response = await axios.post(
    'https://api.spacetraders.io/v2/register',
    { symbol: callSign, faction: 'COSMIC' },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
}
