export class TemperatureDisplay {
  // Get temperature for where the user is right now
  // Round up to avoid decimal places
  // Show a max of two digits
  // Plus optional leading digit for negative

  async getTemperature() {
    // Fetch

    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m",
    );

    const data = await response.json();
    console.log(data);
  }
}
