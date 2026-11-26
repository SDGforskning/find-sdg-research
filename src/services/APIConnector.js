class APIConnector {
  constructor() {}

  onResultClick() {
    // optional. Called when a result has been clicked
  }
  onAutocompleteResultClick() {
    // optional. Called when an autocomplete result has been clicked
  }

  async onSearch(requestState, queryConfig) {
    const response = await fetch("/api/es/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestState,
        queryConfig,
      }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok || body == null || body.error) {
      throw new Error("search-failed");
    }
    return body;
  }

  async onAutocomplete(requestState, queryConfig) {
    const response = await fetch("/api/es/autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestState,
        queryConfig,
      }),
    });
    return response.json();
  }
}

export default APIConnector;
