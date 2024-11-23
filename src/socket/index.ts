export const socket = new WebSocket('ws://localhost:8080/websocket');

socket.onopen = () => {
  console.log('Connected to the server');
};

socket.onerror = (error) => {
  console.error('Connection error:', error);
};

socket.onclose = () => {
  console.log('Disconnected from server');
};

function Fetch(url: string | URL | globalThis.Request, options?: RequestInit) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(response.json());
        }
      })
      .catch((error) => reject(error));
  });
}

export const sendStartRequest = async () => Fetch('http://localhost:8080/simulation/start', { method: 'POST' });

export const sendStopRequest = async () => Fetch('http://localhost:8080/simulation/stop', { method: 'POST' });
export const sendResumeRequest = async () => Fetch('http://localhost:8080/simulation/resume', { method: 'POST' });

export const sendTerminateRequest = async () =>
  Fetch('http://localhost:8080/simulation/terminate', {
    method: 'POST',
  });

export const setSimulationConfig = async (config: {
  cooksNumber: number;
  cashRegistersNumber: number;
  specializedCooksMode: boolean;
}) =>
  Fetch('http://localhost:8080/simulation/config', {
    method: 'POST',
    body: JSON.stringify(config),
  });
