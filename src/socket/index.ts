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
  Fetch('http://localhost:8080/config', {
    method: 'PUT',
    body: JSON.stringify(config),
  });
